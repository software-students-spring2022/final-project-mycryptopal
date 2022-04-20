const {Router} = require('express');
const router = new Router({mergeParams: true});
const Article = require('../../models/Article');
const path = require('path');
require('dotenv').config({
  silent: true, path: path.join(__dirname, '../..', '.env'),
}); // Stores custom environmental variables

router.get('/news/feed', async (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!limit || limit <= 0) {
    res.status(400).json({success: false, error: 'Invalid limit'});
  } else {
    try {
      const articles = await Article.find(
          {}, {_id: 0, __v: 0}, {sort: {publishDate: -1}, limit: limit});
      res.json({success: true, articles: articles});
    } catch (err) {
      console.log(err);
      res.status(500).json({success: false, error: 'Server error'});
    }
  }
});

module.exports = router;
