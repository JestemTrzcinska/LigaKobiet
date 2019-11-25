const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator');

const Player = require('../../models/Player');

// @route     POST api/player
// @desc      Add player
// @access    Public
router.post(
  '/',
  [
    check('firstName', 'Imię zawodniczki jest wymagane.')
      .not()
      .isEmpty(),
    check('lastName', 'Nazwisko zawodniczki jest wymagane.')
      .not()
      .isEmpty()
    // check('inClub', 'Podanie klubu zawodniczki jest wymagane.').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // bad request
    }

    const { firstName, lastName, inClub } = req.body;

    //const {firstName, lastName, avatar, from, to, current, club} = req.body;

    try {
      // See if the Player exists !!!!!!!!!!!!!!!!!!!!!!!!!!! dwie o takich samych danych
      let player = await Player.findOne({ firstName, lastName, inClub });
      if (player) {
        return res.status(400).json({
          errors: [{ msg: 'Taka zawodniczka jest już w bazie.' }]
        });
      }

      // // See if Club exists
      const clubFromRequest = inClub.club; //////////////////////
      const clubFromDB = await Club.findOne({
        name: clubFromRequest
      });
      if (!clubFromDB) {
        return res
          .status(400)
          .json({ msg: 'Taki klub nie istnieje w bazie danych.' });
      }

      // Get users gravatar
      const avatar = gravatar.url({
        s: '200', // size
        r: 'pg', // reading; cant be naked people
        d: 'mm' // default; user icon when he doesnt have one
      });

      // Bulid playerFields object
      const playerFields = {};
      playerFields.firstName = firstName;
      playerFields.lastName = lastName;
      playerFields.avatar = avatar;

      // playerFields.inClub = {};
      // playerFields.inClub.from = inClub.from;
      // playerFields.inClub.to = inClub.to;
      // playerFields.inClub.current = inClub.current;
      // playerFields.inClub.club = clubFromDB;

      // Create
      player = new Player(playerFields);
      await player.save();
      res.json(player);
      // res.send('Player added/updated');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

// @route     GET api/player
// @desc      Get players
// @access    Public
router.get('/', async (req, res) => {
  try {
    const player = await Player.find(req.player);
    res.json(player);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
