const mongoose = require('mongoose');

const SeasonSchema = new mongoose.Schema({
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
  },
  leagues: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'league'
    }
  ]
});

module.exports = Season = mongoose.model('season', SeasonSchema);
