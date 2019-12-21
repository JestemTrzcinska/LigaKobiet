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
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  birth: {
    type: Date
  }
});

module.exports = Player = mongoose.model('player', PlayerSchema);
