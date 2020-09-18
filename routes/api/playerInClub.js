const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const { check, validationResult } = require('express-validator');

const PlayerInClub = require('../../models/PlayerInClub');

// @route     POST api/playerInClub
// @desc      Add playerInClub
// @access    Public
router.post(
  '/',
  [
    check('from', 'Podanie daty początkowej jest wymagane.').not().isEmpty(),
    check('club', 'Podanie nazwy ligi jest wymagane.').not().isEmpty(),
    check('player', 'Podanie danych zawodnika jest wymagane.').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // bad request
    }

    const { from, to, current, club, player } = req.body;

    // See if club is it db
    const clubDB = await Club.findOne({
      name: club,
    });
    if (!clubDB) {
      return res.status(400).json({
        errors: [{ msg: 'Taki klub nie istnieje w bazie danych.' }],
      });
    }

    const separate = player.split(' ');

    // See if player is it db
    const playerFirstNameReq = separate[0];
    const playerLastNameReq = separate[1];
    // const playerNameReq = separate[2];

    const playerDB = await Player.findOne({
      firstName: playerFirstNameReq,
      lastName: playerLastNameReq,
      // name: playerNameReq,
    });
    if (!playerDB) {
      return res.status(400).json({
        errors: [{ msg: 'Taka zawodniczka nie istnieje w bazie danych.' }],
      });
    }

    // Build playerInClubFields object
    const PICFields = {};

    PICFields.from = from;
    if (to) PICFields.to = to;
    if (current == true || current == false) PICFields.current = current;
    PICFields.club = clubDB;
    PICFields.player = playerDB;

    try {
      let playerInClub = await PlayerInClub.findOne({
        from,
        club: clubDB.id,
        player: playerDB.id,
      })
        .populate('club')
        .populate('player');

      if (playerInClub) {
        // Update
        playerInClub = await PlayerInClub.findOneAndUpdate(
          {
            _id: playerInClub._id,
          },
          { $set: PICFields },
          { new: true }
        )
          .populate('club')
          .populate('player');

        return res.json(playerInClub);
      }

      // Create
      playerInClub = new PlayerInClub(PICFields);
      await playerInClub.save();
      res.json(playerInClub);

      // res.send('Season added');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

// @route     GET api/playerInClub
// @desc      Get playerInClub(s)
// @access    Public
router.get('/', async (req, res) => {
  try {
    const playerInClub = await PlayerInClub.find()
      .populate('club')
      .populate('player');
    if (!playerInClub) {
      return res.status(404).json({
        errors: [
          {
            msg:
              'Nie ma ani jednej przynależności zawodniczki z klubem w bazie danych.',
          },
        ],
      });
    }
    res.json(playerInClub);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/playerInClub/:playerInClub
// @desc      Get playerInClub by ID
// @access    Public
router.get('/:playerInClubID', async (req, res) => {
  try {
    const playerInClub = await PlayerInClub.findOne({
      _id: req.params.playerInClubID,
    })
      .populate('player')
      .populate('club');
    if (!playerInClub) {
      return res.status(404).json({
        errors: [
          {
            msg:
              'Nie ma ani jednej przynależności zawodniczki z klubem w bazie danych.',
          },
        ],
      });
    }
    res.json(playerInClub);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api//player/:playerID
// @desc      Get playerInClub by playerID
// @access    Public
router.get('/player/:playerID', async (req, res) => {
  try {
    const playerInClub = await PlayerInClub.findOne({
      player: req.params.playerID,
    })
      .populate('player')
      .populate('club');
    if (!playerInClub) {
      return res.status(404).json({
        errors: [
          {
            msg: `Zawodniczka ${player.firstName} ${player.lastName} nie ma powiązania z klubem.`,
          },
        ],
      });
    }
    res.json(playerInClub);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// najlepiej opisane w odcinku 21

// // @route     DELETE api/playerInClub
// // @desc      Delete playerInClub
// // @access    Public

// router.delete('/', auth, async (req, res) => {
//   try {
//     // remove game
//     await PlayerInClub.findOneAndRemove({
//       _id: req.body.id
//     });
//     const user = await User.findOne({ _id: req.user.id });

//     res.json({
//       msg: `Przynależność zawodniczki została usunięta przez: ${user.first_name} ${user.last_name} ${user.email}`
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

module.exports = router;
