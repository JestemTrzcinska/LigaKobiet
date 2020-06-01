const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    reqired: true,
  },
  lastName: {
    type: String,
    reqired: true,
  },
  email: {
    type: String,
    reqired: true,
    unique: true,
  },
  password: {
    type: String,
    reqired: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isStaff: {
    type: Boolean,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
