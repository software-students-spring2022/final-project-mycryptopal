const {Router} = require('express');
const router = new Router({mergeParams: true});
const path = require('path');
require('dotenv').config({
  silent: true, path: path.join(__dirname, '../..', '.env'),
}); // Stores custom environmental variables
const FAQ = require('../../models/FAQ');
const Message = require('../../models/Message');

router.get('/faq', async (req, res) => {
  try {
    const faqs = await FAQ.find({});
    res.json({success: true, faqs: faqs});
  } catch (err) {
    res.status(500).json({success: false, error: 'Server error'});
  }
});

router.post('/contact', async (req, res) => {
  try {
    const message = new Message({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      user_id: req.body.user_id,
    });
    await message.save();
    res.json({success: true});
  } catch (err) {
    res.status(500).json({success: false, error: 'Server error'});
  }
});

module.exports = router;
