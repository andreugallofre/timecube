const router = require('express').Router();
const C = require('./controllers.js');

// AUTH

router.post('login', C.login);

