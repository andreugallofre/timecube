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

// Error Handling
app.use(function nextError(err, req, res, next) {

  if (err.isBoom) {
    if (err.isServer) {
      // log the error...
      // probably you don't want to log unauthorized access
      // or do you?
      // We use winston package

      err.output.payload.message = err.message;
      err.output.payload.file = err.stack.split('\n', 2)[1]
      logger.error(err.output.payload);
      Sentry.captureException(err);

      console.error(err.output.message, err.ourput.payload, err.stack);

      return res.status(err.output.statusCode).json({
        data: null,
        error: "Error intern del servidor"
      })

    }

    return res.status(err.output.statusCode).json({
      data: null,
      error: err.output.payload.message
    }).end();

  } else {

    console.error(err);

    return res.status(500).json({
      data: null,
      error: "Error intern del servidor"
    });

  }


});


var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

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

// Connect to database through mongoose
const dbname = 'davidguapo'
mongoose.connect('mongodb://localhost:27017/' + dbname);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Use passport
app.use(passport.initialize());

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Tots els endpoints de la api a /api
app.use('api/', routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
