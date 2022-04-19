/* eslint-disable max-len */
const axios = require('axios');
const path = require('path');
const Article = require('../models/Article');
require('dotenv').config({
  silent: true, path: path.join(__dirname, '../.env'),
}); // Stores custom environmental variables

async function updateNews() {
  const SEARCH_TERM = 'cryptocurrency';
  const SORT_BY = 'publishedAt';
  const LANGUAGE = 'en';
  const PAGE_SIZE = 100; // 100 is the maximum number of articles that can be requested at once
  const DOMAINS = [
    'coindesk.com',
    'cointelegraph.com',
    'forbes.com',
    'newsbtc.com',
    'bitcoinmagazine.com',
    'cryptoslate.com',
    'bitcoinist.com',
    'apnews.com',
    'economist.com',
    'npr.org',
    'u.today',
    'cryptocynews.com',
    'dailyhodl.com',
    'cryptopolitan.com',
  ]; // Array of reputable general and crypto news sources

  let from; // Oldest published date
  const to = (new Date()).toISOString(); // current time in ISO 8601 date string

  const latest = await Article.findOne({}, {}, {sort: {publishDate: -1}}); // Get article published the latest currently stored in DB

  if (latest) { // If an article is found, i.e. if DB is not empty
    const padded = new Date(latest.publishDate);
    padded.setSeconds(padded.getSeconds() + 1); // Add 1 second to avoid duplicates - i.e. exclude the article found in DB
    from = padded.toISOString(); // ISO 8601 date string
  }

  try {
    const response = await axios.get(
        `${process.env.NEWS_API_URL}?apiKey=${process.env.NEWS_API_KEY}` +
          `&q=${SEARCH_TERM}` +
          `&language=${LANGUAGE}` +
          `&sortBy=${SORT_BY}` +

          `&pageSize=${PAGE_SIZE}` +
          `&domains=${DOMAINS.join(',')}` +
          `&from=${from}&to=${to}`,
    );

    const articles = response.data.articles;

    if (articles.length === 0) {
      console.log('No new articles found');
    } else {
      articles.forEach((article, index) => {
        const saved = new Article({
          title: article.title,
          summary: article.description,
          source: article.source.name,
          url: article.url,
          imageUrl: article.urlToImage,
          publishDate: article.publishedAt,
        }); // New Article object
        try {
          if (index < articles.length - 1) {
            saved.save(); // Save to DB
          } else {
            saved.save(); // Save last article and disconnect
            console.log(`Uploaded ${articles.length} article(s) to DB`);
          }
        } catch (err) {
          console.log('MongoDB error');
          console.log(err);
        }
      });
    }
  } catch (err) {
    console.log('News API error');
    console.log(err);
  }
}

module.exports = {
  updateNews: updateNews,
};
