const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  teamHome: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'club'
  },
  teamAway: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'club'
  },
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'league'
  },
  localization: {
    type: String
  },
  date: {
    type: Date
  },
  goals: [
    {
      amount: {
        type: Number,
        min: 0,
        required: true
      },
      goalForTeamHome: {
        type: Boolean,
        default: true,
        required: true
      },
      shotBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'player',
        required: true
      },
      isOwn: {
        type: Boolean,
        default: false
      },
      required: false
    }
  ]
});

// komentarze, komentarze do komentarzy

module.exports = Game = mongoose.model('game', GameSchema);
