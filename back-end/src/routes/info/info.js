const {Router} = require('express');
const router = new Router({mergeParams: true});
const path = require('path');
require('dotenv').config({
  silent: true, path: path.join(__dirname, '../..', '.env'),
}); // Stores custom environmental variables
const FAQ = require('../../models/FAQ');

router.get('/faq', async (req, res) => {
  try {
    const faqs = await FAQ.find({});
    res.json({success: true, faqs: faqs});
  } catch (err) {
    res.status(500).json({success: false, error: 'Server error'});
  }
});

module.exports = router;
