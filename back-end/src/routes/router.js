const {Router} = require('express');
const router = new Router();
const authRouter = require('./auth/auth');
const cryptoRouter = require('./crypto/crypto');
const lessonRouter = require('./lesson/lesson');
const newsRouter = require('./news/news');
const userRouter = require('./user/user');

router.use('/auth', authRouter);
router.use('/api', cryptoRouter);
router.use('/lesson', lessonRouter);
router.use('/api', newsRouter);
router.use('/user', userRouter);

module.exports = router;
