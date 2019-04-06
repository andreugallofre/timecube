const User = require('./models/user');
const boom = require('boom');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')
const _ = require('lodash');
const Usr = require('./models/user');
const Cb = require('./models/cube');

class Controllers {
    UserLogin(req, res, next) {
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
                return res.json({
                    error: null,
                    data: true
                })
            })
        });
    }

    CubeRegister(req,res,next) {
        Cube.findOne({"code":req.body.code}, (err, doc) => {
            if (err) return next(boom.badImplentation(err));
            if (doc.propietari === undefined) {
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
                return res.json({
                    error: "Ja està adjudicat"
                })
            }
        });
    }
    posaTasques(req, res, next) {
        var novesCares = req.body;

        var docs = [];
        _.forEach(novesCares, (o) => {

        })
    }


}
module.exports = Controllers;
