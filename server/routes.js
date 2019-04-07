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

router.get(
    '/cube/activeTasks',
    passport.authenticate('jwt', { session: false }),
    C.getTasquesActives
)

router.get(
    '/cube/allTasks',
    passport.authenticate('jwt', { session: false }),
    C.getTasques
)

router.get(
    '/cube/activeTasksPeriods',
    passport.authenticate('jwt', { session: false }),
    C.getTasquesActivesAmbPeriodes
)

router.get(
    '/cube/allTasksPeriods',
    passport.authenticate('jwt', { session: false }),
    C.getTasquesAmbPeriodes
)
router.post('/cube/canvi', C.canvi_de_cara);
router.post('/cube/hora',C.tieeempo);

router.get(
    '/cube/activeTasksPeriodsSuma',
    passport.authenticate('jwt', { session: false }),
    C.getTasquesActivesAmbPeriodesSuma
)

router.get(
    '/cube/allTasksPeriodsSuma',
    passport.authenticate('jwt', { session: false }),
    C.getTasquesAmbPeriodesSuma
)


module.exports = router;
