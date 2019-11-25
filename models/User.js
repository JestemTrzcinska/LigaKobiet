const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    reqired: true
  },
  last_name: {
    type: String,
    reqired: true
  },
  email: {
    type: String,
    reqired: true,
    unique: true
  },
  password: {
    type: String,
    reqired: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);
