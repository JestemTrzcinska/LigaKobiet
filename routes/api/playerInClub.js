const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const InClub = require('../../models/PlayerInClub');

// @route     POST api/playerInClub
// @desc      Add playerInClub
// @access    Public
router.post(
  '/',
  [
    check('from', 'Podanie daty początkowej jest wymagane.')
      .not()
      .isEmpty(),
    check('club', 'Podanie nazwy ligi jest wymagane.')
      .not()
      .isEmpty(),
    check('player', 'Podanie zawodnika jest wymagane.')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // bad request
    }

    const { from, to, current, club, player } = req.body;

    try {
      // See if the InClub already exists
      // See if club is it db
      const clubDB = await Club.find({
        name: club
      });
      if (!clubDB) {
        return res
          .status(400)
          .json({ msg: 'Taki klub nie istnieje w bazie danych.' });
      }

      // See if player is it db
      const playerDB = await Player.find({
        name: player
      });
      if (!playerDB) {
        return res
          .status(400)
          .json({ msg: 'Taka zawodniczka nie istnieje w bazie danych.' });
      }

      let PICdb = await PlayerInClub.findOne({ from, clubDB, playerDB });
      if (PICdb) {
        return res.status(400).json({
          errors: [{ msg: 'Taki powiązanie istnieje już w bazie.' }]
        });
      }

      console.log(clubDB);
      console.log(playerDB);

      const playerInClub = new PlayerInClub({
        from,
        to,
        current,
        club: clubDB.id,
        player: playerDB.id
      });

      await playerInClub.save();
      res.json(playerInClub);
      // res.send('Season added');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

// @route     GET api/season
// @desc      Get seasons
// @access    Public
router.get('/', async (req, res) => {
  try {
    const season = await Season.find(req.season);
    res.json(season);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
