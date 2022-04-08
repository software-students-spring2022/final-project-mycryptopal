const {Router} = require('express');
const router = new Router({mergeParams: true});
const path = require('path');
require('dotenv').config({
  silent: true, path: path.join('../..', '.env'),
}); // Stores custom environmental variables
const lessons = require('../../../LessonData/lessons.json'); // Probably needs to move this file somewhere else

router.get('/:lessonID', (req, res) => {
  const lessonID = req.params.lessonID;
  if (lessonID === 'all') {
    res.send(lessons); // Probably bad practice
  } else if (!parseInt(lessonID)) {
    res.status(400);
    res.send({});
  } else {
    res.send(lessons[lessonID]);
  }
});

module.exports = router;
