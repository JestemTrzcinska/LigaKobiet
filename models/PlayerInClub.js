const mongoose = require('mongoose');

const PlayerInClubSchema = new mongoose.Schema({
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date
  },
  current: {
    type: Boolean,
    default: true
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'club'
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'player'
  }
});

module.exports = PlayerInClub = mongoose.model(
  'playerInClub',
  PlayerInClubSchema
);
