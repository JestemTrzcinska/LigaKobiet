const mongoose = require('mongoose');

const LeagueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  from: {
    type: Date,
    default: Date.now,
    required: true
  },
  to: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = League = mongoose.model('league', LeagueSchema);
