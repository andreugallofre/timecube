const express = require('express')
const app = express();
const bodyParser = require('body-parser');

const port = 8080;
const routes = require('./routes.js');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");

const User = require('./models/user.js');

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'AndreuGuapo';
jwtOptions.passReqToCallback = true;

var strategy = new JwtStrategy(jwtOptions, function(req, jwt_payload, next) {
  // console.log('payload received', jwt_payload);
  // comporovem que l'id usuari esta a la base de dades

  const q = User.findById(jwt_payload._id);
  q.exec(function passportCheck(err, user) {
    if (user) {
      req.user = user.toObject({getters: true});
      next(null, user);
    } else {
      next(boom.unauthorized("PassportStrategy can't find user id"));
    }
  });
});
passport.use(strategy);


// Tots els endpoints de la api a /api
app.use('api/', routes);
app.use(bodyParser.urlencoded({ extended: true  }))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
