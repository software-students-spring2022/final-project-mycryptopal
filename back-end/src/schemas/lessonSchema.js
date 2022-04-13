const mongoose = require('mongoose');
const lessonSchema = new mongoose.Schema({
    title: String;
    lesson: String; 
    question: String;
    answer: String;
    lessonProgress: Array;
});

const Lesson = db.model('Lesson', schema);

module.exports = Lesson;