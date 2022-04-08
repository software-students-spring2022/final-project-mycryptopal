const {Router} = require('express');
const router = new Router({mergeParams: true});
const path = require('path');
require('dotenv').config({
  silent: true, path: path.join('../..', '.env'),
}); // Stores custom environmental variables

router.get('/:lessonID', (req, res) => {
  // we are working on adding lesson routes, need to separate app.get calls
  // into their own files first.
  // this will tomorrow morning contain an import into lessons.js
  // import lessons from ./Lessons/Lessons
  const lessonID = req.params.lessonID;
  res.send(`Sample lesson ${lessonID}`);
  // use number var to grab lessonid and iterate through lessons const
});

module.exports = router;
