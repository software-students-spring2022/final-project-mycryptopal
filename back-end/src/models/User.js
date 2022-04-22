const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: {type: Number, required: true},
  access: {type: Number, default: 1},
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  firstName: String,
  lastName: String,
  assets: {type: Object, default: {}},
  lessonProgress: Array,
  avatar: String,
}, {
  minimize: false,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
