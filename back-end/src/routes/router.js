const {Router} = require('express');
const router = new Router();
const newsRouter = require('./news/news');
const cryptoRouter = require('./crypto/crypto');
const userRouter = require('./user/user');
const lessonRouter = require('./lesson/lesson');
const authRouter = require('./Auth/Auth');

router.use('/api', newsRouter);
router.use('/api', cryptoRouter);
router.use('/user', userRouter);
router.use('/lesson', lessonRouter);
router.use('/login', authRouter);

module.exports = router;
