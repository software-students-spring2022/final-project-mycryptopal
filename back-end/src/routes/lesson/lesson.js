const {Router} = require('express');
const router = new Router({mergeParams: true});
const path = require('path');
require('dotenv').config({
  silent: true, path: path.join(__dirname, '../..', '.env'),
}); // Stores custom environmental variables
const lessons = require('../../data/lessons.json');
const mongoose = require('mongoose');
const Lesson = require('../../models/Lesson');

router.get('/', async (req, res) => {
  const lessons = await Lesson.find({});
  res.send(lessons);
});

router.get('/count', async (req, res) => {
  const lessonCount = await Lesson.countDocuments();
  res.send({count: lessonCount});
});

router.get('/id/:lessonID', (req, res) => {
  const lessonID = parseInt(req.params.lessonID);
  if (!lessonID || lessonID > Object.keys(lessons).length) {
    res.status(404);
    res.send({});
  } else {
    res.send(lessons[lessonID]);
  }
});

module.exports = router;
