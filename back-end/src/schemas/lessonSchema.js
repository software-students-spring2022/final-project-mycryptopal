const mongoose = require('mongoose');
const lessonSchema = new mongoose.Schema({
    title: String;
    lesson: String; //might be text field
    question: String; //unsure if we put stuff that isnt user input
    answer: String;
    lessonProgress: Array;
});

const Lesson = db.model('Lesson', schema);

module.exports = Lesson;