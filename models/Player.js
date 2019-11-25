const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    reqired: true
  },
  lastName: {
    type: String,
    reqired: true
  },
  avatar: {
    type: String
  },
  inClub: [
    {
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date,
        required: true
      },
      current: {
        type: Boolean,
        default: true
      },
      club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'club'
      }
    }
  ]
});

module.exports = Player = mongoose.model('player', PlayerSchema);
