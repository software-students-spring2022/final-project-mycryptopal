const {Router} = require('express');
const router = new Router({mergeParams: true});
const path = require('path');
require('dotenv').config({
  silent: true, path: path.join(__dirname, '../..', '.env'),
}); // Stores custom environmental variables
const Lesson = require('../../models/Lesson');

router.get('/count', async (req, res) => {
  const lessonCount = await Lesson.countDocuments();
  res.send({count: lessonCount});
});

router.get('/id/:lessonId', async (req, res) => {
  const lessonId = parseInt(req.params.lessonId);

  const lesson = await Lesson.findOne({id: lessonId});

  if(!lesson) {
    res.status(404);
    res.json({ success: false, error: 'Lesson not found' });
  }
  else {
    res.json(lesson);
  }
});

module.exports = router;
