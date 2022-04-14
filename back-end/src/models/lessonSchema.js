/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const lessonSchema = new mongoose.Schema({
  lessonId: String,
  title: String,
  content: String,
  questions: Array,
});

const Lesson = db.model('Lesson', schema);

module.exports = Lesson;
