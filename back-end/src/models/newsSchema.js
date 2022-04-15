/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema({
  title: String,
  summary: String,
  source: String,
  url: String,
  imageUrl: String,

});

const News = mongoose.model('News', schema);

module.exports = News;
