const {Router} = require('express');
const router = new Router({mergeParams: true});
const path = require('path');
require('dotenv').config({
  silent: true, path: path.join(__dirname, '../..', '.env'),
}); // Stores custom environmental variables
const lessons = require('../../data/lessons.json');

router.get('/', (req, res) => {
  res.send(lessons);
});

router.get('/:lessonID', (req, res) => {
  const lessonID = parseInt(req.params.lessonID);
  if (!lessonID || lessonID > Object.keys(lessons).length) {
    res.status(404);
    res.send({});
  } else {
    res.send(lessons[lessonID]);
  }
});

module.exports = router;
