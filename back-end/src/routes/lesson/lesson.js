const {Router} = require('express');
const router = new Router({mergeParams: true});
const path = require('path');
require('dotenv').config({
  silent: true, path: path.join(__dirname, '../..', '.env'),
}); // Stores custom environmental variables
const Lesson = require('../../models/Lesson');

router.get('/count', async (req, res) => {
  try {
    const lessonCount = await Lesson.countDocuments();
    res.send({success: true, count: lessonCount});
  } catch (err) {
    res.status(500).json({success: false, error: 'Server error'});
  }
});

router.get('/id/:lessonId', async (req, res) => {
  const lessonId = parseInt(req.params.lessonId);

  if (!lessonId) {
    res.status(400);
    res.json({success: false, error: 'Invalid lesson ID'});
  }

  const lesson = await Lesson.findOne({id: lessonId}, {_id: 0});

  if (!lesson) {
    res.status(404);
    res.json({success: false, error: 'Lesson not found'});
  } else {
    res.json(lesson);
  }
});

module.exports = router;
