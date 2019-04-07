const User = require('./models/user');
const boom = require('boom');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')
const _ = require('lodash');
const Usr = require('./models/user');
const Cb = require('./models/cube');
const Tk = require('./models/task');
const P  = require('./models/period')

class Controllers {
    UserLogin(req, res, next) {
        const q = User.findOne({ email: req.body.email });
        q.exec(function searchUser(err, usr) {
            if (err) next(boom.badImplementation(err));
            if (usr) {

                bcrypt.compare(req.body.password, usr.password, function (err, ok) {
                    if (ok) {
                        var token = jwt.sign({name: usr.name, _id: usr._id}, 'AndreuGuapo', { expiresIn: 1444800 });

                        console.log(`Inici de sessió usuari: ${usr.email}`);
                        return res.json({ data: token });

                    } else {
                        console.log("Wrong password for user");
                        return res.json({ data: null, error: "Bad email or password" });
                    }
                });


            } else {
                console.log("ErrorLogin: User does not exist, input: " + req.body.email);
                return res.json({ data: null, error: "Bad email or password" });

            }
        });

    }

    UserRegister(req, res, next) {
        console.log(req.body);
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err) return next(boom.badImplementation("Error en hashejar pw"));
            var u = new User({
                email: req.body.email,
                name: req.body.name,
                password: hash,
                surname: req.body.surname
            });
            u.save((err) => {
                if(err) return next(boom.badImplementation(err));

                // We send token too because we need automatic login
                var token = jwt.sign({ name: u.name, _id: u._id }, 'AndreuGuapo', { expiresIn: 1444800 });
                return res.json({
                    error: null,
                    data: token
                })
            })
        });
    }

    CubeRegister(req,res,next) {
        Cb.findOne({"code":req.body.code}, (err, doc) => {
            if (err) return next(boom.badImplentation(err));
            if (doc.propietari === null) {
                doc.propietari = req.user._id;
                doc.save(err => {
                    if (err) return next(boom.badImplementation(err));
                    return res.json({
                        error: null,
                        data: true
                    });
                });
            }
            else {
                return next(boom.badRequest("Ja té propietari"));
            }
        });
    }
    posaTasques(req, res, next) {
        var novesCares = req.body;
        Cb.findOne({propietari: req.user._id}, function(err, cube) {
            if (err) return next(boom.badImplementation(err));

            var docs = [];
            cube.cares = [];
            _.forEach(novesCares, (o) => {
                var t = new Tk({
                    name: o.nomTaska,
                    desc: o.descTaska,
                    cube: cube._id
                });

                docs.push(t);
                cube.cares.push({
                    num: o.numCara,
                    task: t
                });

            });

            Tk.create(docs, (err) => {
                if(err) return next(boom.badImplementation(err));
                cube.save(err => {
                    if (err) return next(boom.badImplementation(err));

                    return res.json({
                        data: true,
                        error: null
                    });
                })
            })
        })
    }

    assignaTasca(req, res, next) {
        var { numCara, nomTaska, descTaska } = req.body;
        console.log(numCara);
        Cb.findOne({propietari: req.user._id}, function(err, cube) {
            if(err) return next(boom.badImplementation(err));

            var t = new Tk({
                name: nomTaska,
                desc: descTaska,
                cube: cube._id
            })

            t.save(err => {
                if (err) return next(boom.badImplementation(err));
                Cb.updateOne({_id: cube._id}, {
                    $set: {
                        "cares.$[c].task": t._id
                    }
                },
                { arrayFilters: [{"c.num": numCara}] },
                (err) => {
                    if (err) return next(boom.badImplementation(err));
                    return res.json({
                        data: true,
                        error: null
                    })
                })
            })
        })
    }

    getTasquesActives(req, res, next) {
        Cb.findOne({propietari: req.user._id})
        .populate('cares.task')
        .select('cares')
        .exec(function(err, cube) {
            if (err) return next(boom.badImplementation(err));

            return res.json({error: null, data: cube})
        })
    }

    getTasques(req, res, next) {
        Cb.findOne({ propietari: req.user._id })
            .exec(function (err, cube) {
                if (err) return next(boom.badImplementation(err));

                Tk.find({cube: cube._id}, (err, docs) => {
                    if (err) return next(boom.badImplementation(err));
                    return res.json({
                        error: null,
                        data: docs
                    })
                })
            })
    }

    getTasquesActivesAmbPeriodes(req, res, next) {
        Cb.findOne({ propietari: req.user._id })
        .exec((err, c) => {
            if (err) return next(boom.badImplementation(err));
            var ids = _.map(c.cares, "task");

            Tk.aggregate([
                {
                    $match: {
                        _id: {$in: ids}
                    }
                },
                {
                    $lookup: {
                        from: 'periods',
                        localField: '_id',
                        foreignField: 'task',
                        as: "periodes"
                    }
                }
            ])
            .exec((err, docs) => {
                if (err) return next(boom.badImplementation(err));
                return res.json({
                    error: false,
                    data: docs
                })
            })
        })
    }

    getTasquesAmbPeriodes(req, res, next) {
        Cb.findOne({ propietari: req.user._id })
            .exec((err, c) => {
                if (err) return next(boom.badImplementation(err));
                Tk.aggregate([
                    {
                        $match: {
                            cube: c._id
                        }
                    },
                    {
                        $lookup: {
                            from: 'periods',
                            localField: '_id',
                            foreignField: 'task',
                            as: "periodes"
                        }
                    }
                ])
                    .exec((err, docs) => {
                        if (err) return next(boom.badImplementation(err));
                        return res.json({
                            error: false,
                            data: docs
                        })
                    })
            })
    }


        // buscar task amb mateixa cara i inacabada
        // else, crear tasca
        canvi_de_cara(req, res, next) {
          var anterior  = req.body.anterior;
          var actual    = req.body.actual;

            console.log("NOVA REQUEST CANVI");
          console.log(req.body);

          Cb.findOne({ code: req.body.code}, (err,cube) => {
            if (err) return next(boom.badImplementation(err));

            if (!req.body.anterior || req.body.anterior == 0) {
                if (actual == 0) return res.json({data: true});
              let id_task_act = _.find(cube.cares, { 'num': actual });

              console.log(id_task_act);
                var p = new P({
                  "inici": Date.now(),
                  "acabada": false,
                  "task": id_task_act.task
                });
                p.save(err => {
                  if (err) return next(boom.badImplementation(err));
                  return res.json({
                      data: true,
                      error: ""
                  })
                });
            } else {
                //ACABAR
                let id_task_ant = _.find(cube.cares, { 'num': anterior }).task;
                P.findOne({ task: id_task_ant, acabada: false }, (err,doc) => {
                if (doc) {
                    doc.acabada = true;
                    doc.fi = Date.now();
                }
                else return  next(boom.badRequest("No hi ha periode anterior"))
                doc.save(err => {
                    if (err) return next(boom.badImplementation(err));
                    //NOVA
                    if(actual == 0) {
                        return res.json({ data: true });
                    } else {
                        let id_task_act = _.find(cube.cares, { 'num': actual }).task;
                        var p = new P({
                        "inici": Date.now(),
                        "acabada": false,
                        "task": id_task_act
                        });
                        p.save(err => {
                            if (err) return next(boom.badImplementation(err));
                            return res.json({
                                data: true,
                                error: ""
                            })
                        });
                    }
                });
                });
            }
          });
        }

        tieeempo(req, res, next) {
          var idxdxd = req.body.id;
          Tk.task_time(idxdxd, (err, result) => {
            if (err)
              return next(boom.badImplementation(err));
            return res.json({
              "data": {
                "gora": "eta",
                "terra": "lliure",
                "temps": result
              }
            });
          });
        }
}
module.exports = Controllers;
