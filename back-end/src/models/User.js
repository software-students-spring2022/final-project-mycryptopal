const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: Number,
  access: Number,
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  assets: Object,
  lessonProgress: Array,
  avatar: String,
}, {
  minimize: false
});

const User = mongoose.model('User', userSchema);

module.exports = User;
