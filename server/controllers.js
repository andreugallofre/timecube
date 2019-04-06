const User = require('./models/user');
const boom = require('boom');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')
const _ = require('lodash');
const Usr = require('./models/user');
const Cb = require('./models/cube');
const Tk = require('./models/task');

class Controllers {
    login(req, res, next) {
        const q = User.findOne({ email: req.body.email });
        q.exec(function searchUser(err, usr) {
            if (err) next(boom.badImplementation(err));
            if (usr) {

                bcrypt.compare(req.body.password, usr.password, function (err, ok) {
                    if (ok) {
                        var token = jwt.sign({name: usr.name}, 'AndreuGuapo', { expiresIn: 1444800 });

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

    register(req, res, next) {
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
                return res.json({
                    error: null,
                    data: true
                })
            })
        });
    }

    posaTasques(req, res, next) {
        var novesCares = req.body;
        Cb.findOne({propietari: req.user._id}, function(err, cube) {
            if (err) return next(boom.badImplementation(err));
            
            var docs = [];
            _.forEach(novesCares, (o) => {
                var t = new Tk({
                    name: o.nomTaska,
                    desc: o.descTaska,
                    cube: cube
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

}
module.exports = Controllers;