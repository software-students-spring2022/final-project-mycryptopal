const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    name: String;
    email: String;
    message: String; 
});

const Contact = db.model('Contact', schema);

module.exports = Contact;