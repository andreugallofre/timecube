const router = require('express').Router();
const controllers = require('./controllers.js');
const C = new controllers()

const passport = require('passport')

// AUTH

router.get('/', (req, res) => {res.json({data: 'ok', version: '1.0.0'})})
router.post('/user/login', C.UserLogin);
router.post('/user/register', C.UserRegister)

router.post('/cube/register',passport.authenticate('jwt', {  session: false }),C.CubeRegister);

router.post(
    '/cube/cares',
    passport.authenticate('jwt', { session: false }),
    C.posaTasques
    )

router.put(
    '/cube/cara',
    passport.authenticate('jwt', { session: false }),
    C.assignaTasca
)

module.exports = router;
