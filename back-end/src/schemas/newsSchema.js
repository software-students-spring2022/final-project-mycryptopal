const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema({
    articleName: String;
    articleImage: Object;
    articleLink: Object;
    articleBlub: String;

});

const News = db.model('News', schema);

module.exports = News;