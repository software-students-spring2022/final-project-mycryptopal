const {Router} = require('express');
const passport = require('passport');
const router = new Router();
const authRouter = require('./auth/auth');
const cryptoRouter = require('./crypto/crypto');
const lessonRouter = require('./lesson/lesson');
const newsRouter = require('./news/news');
const userRouter = require('./user/user');
const infoRouter = require('./info/info');

router.use('/auth', authRouter);
router.use('/api', cryptoRouter);
router.use('/lesson', lessonRouter);
router.use('/api', newsRouter);
router.use('/user', passport.authenticate('jwt', {session: false}), userRouter);
router.use('/info', infoRouter);

module.exports = router;
