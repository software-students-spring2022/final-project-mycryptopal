const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema({
    articleName: String;
    articleImage: Object;
    articleLink: Object; //hope this is right for a link
    articleBlub: String; //might be text field

});

const News = db.model('News', schema);

module.exports = News;