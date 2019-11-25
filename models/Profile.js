const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  points: {
    type: Number,
    default: 0
  },
  favClub: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'club'
  },
  contact: {
    type: String
  },
  localization: {
    type: String
  },
  about: {
    type: String
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
