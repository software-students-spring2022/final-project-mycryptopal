const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
  title: String,
  summary: String,
  source: String,
  url: String,
  imageUrl: String,
  publishDate: String,
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
