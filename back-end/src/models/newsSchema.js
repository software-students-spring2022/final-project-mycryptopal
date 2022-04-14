const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema({
    title: String;
    summary: String;
    source: String;
    url: String;
    imageUrl: String;

});

const News = db.model('News', schema);

module.exports = News;