const mongoose = require('mongoose');

const LeagueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = League = mongoose.model('league', LeagueSchema);
