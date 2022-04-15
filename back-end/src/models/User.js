const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: Number,
  access: Number,
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  assets: Array,
  lessonProgress: Array,
  avatar: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
