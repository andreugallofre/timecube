const router = require('express').Router();
const controllers = require('./controllers.js');
var C = new controllers()

// AUTH

router.post('login', C.login);

module.exports = router;