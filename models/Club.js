const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'league' // reference
  },
  logo: {
    type: String
  }
});

module.exports = Club = mongoose.model('club', ClubSchema);
