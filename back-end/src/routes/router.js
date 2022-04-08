const {Router} = require('express');
const router = new Router();
const newsRouter = require('./news/news');
const cryptoRouter = require('./crypto/crypto');
const userRouter = require('./user/user');
const lessonRouter = require('./lesson/lesson');

router.use('/api', newsRouter);
router.use('/api', cryptoRouter);
router.use('/user', userRouter);
router.use('/lesson', lessonRouter);

module.exports = router;
