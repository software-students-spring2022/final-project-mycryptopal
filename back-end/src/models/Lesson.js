const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  id: Number,
  title: String,
  content: String,
  questions: Array,
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
