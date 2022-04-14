/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  userMessage: String,
});

const Contact = db.model('Contact', schema);

module.exports = Contact;
