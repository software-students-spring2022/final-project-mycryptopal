const {Router} = require('express');
const router = new Router({mergeParams: true});
const axios = require('axios');
const path = require('path');
require('dotenv').config({
  silent: true, path: path.join('../..', '.env'),
}); // Stores custom environmental variables

router.get('/news', (req, res) => {
  const SEARCH_TERM = 'cryptocurrency';
  const SORT_BY = 'publishedAt';
  const LANGUAGE = 'en';
  const LIMIT = parseInt(req.query.limit);
  const PAGE_SIZE = LIMIT ? LIMIT : 20;
  axios
      .get(
          `${process.env.NEWS_API_URL}?apiKey=${process.env.NEWS_API_KEY}` +
            `&q=${SEARCH_TERM}` +
            `&language=${LANGUAGE}` +
            `&sortBy=${SORT_BY}` +
            `&pageSize=${PAGE_SIZE}`
      )
      .then((apiResponse) => res.json(apiResponse.data))
      .catch((err) => {
        res.status(400);
        res.json({articles: []});
      });
});

module.exports = router;
