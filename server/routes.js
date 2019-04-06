const router = require('express').Router();
const controllers = require('./controllers.js');
var C = new controllers()

// AUTH

router.get('/', (req, res) => {res.json({data: 'ok', version: '1.0.0'})})
router.post('/login', C.login);
router.post('/register', C.register)

module.exports = router;