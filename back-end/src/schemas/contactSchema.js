const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    name: String;
    email: String;
    message: String; //unsure if textfield or String
});

const Contact = db.model('Contact', schema);

module.exports = Contact;