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
    check('firstName', 'Imię zawodniczki jest wymagane.').not().isEmpty(),
    check('lastName', 'Nazwisko zawodniczki jest wymagane.').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // bad request
    }

    let { firstName, lastName, name, avatar, birth } = req.body;

    try {
      // // See if Player exists
      firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

      lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

      if (name) name = name.charAt(0).toUpperCase() + name.slice(1);
      else name = firstName + ' ' + lastName;

      const playerDB = await Player.findOne({
        firstName,
        lastName,
        name,
        birth,
      });
      if (playerDB) {
        return res.status(400).json({
          msg: `Taka zawodnika już istnieje w bazie danych. Jeżeli chodzi o inną niż ta w bazie - spróbuj ponowanie uzupełniając poprawną datę urodzenia`,
        });
      }

      // Get users gravatar
      avatar = gravatar.url({
        s: '200', // size
        r: 'pg', // reading; cant be naked people
        d: 'mm', // default; user icon when he doesnt have one
      });

      const player = new Player({
        firstName,
        lastName,
        name,
        avatar,
        birth,
      });

      await player.save();
      res.json(player);

      // res.send('Player added');
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
    if (!player) {
      return res
        .status(404)
        .json({ msg: 'Nie ma ani jednej zawodniczki w bazie danych.' });
    }
    res.json(player);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

// // build inClub object for player
// const playerFields = {};
// playerFields.firstName = firstName;
// playerFields.lastName = lastName;
// playerFields.avatar = avatar;

// playerFields.inClub = [];

// for (i = 0; i < inClub.length; i++) {
//   let playerFieldsCLUB = {};

//   if (inClub[i].from) playerFieldsCLUB.from = inClub[i].from;
//   else
//     return res
//       .status(400)
//       .json({ msg: 'Podanie daty początkowej jest obowiązkowe.' });

//   if (inClub[i].current == true) {
//     playerFieldsCLUB.current = inClub[i].current;
//   } else {
//     if (inClub[i].to) playerFieldsCLUB.to = inClub[i].to;
//     else
//       return res
//         .status(400)
//         .json({ msg: 'Podanie daty końcowej jest obowiązkowe.' });
//   }

//   if (!inClub[i].club)
//     return res.status(400).json({
//       msg: 'Podanie nazwy klubu jest obowiązkowe.'
//     });

//   // // See if Club exists
//   const clubFromRequest = inClub[i].club;
//   const clubFromDB = await Club.findOne({
//     name: clubFromRequest
//   });
//   if (!clubFromDB) {
//     return res
//       .status(400)
//       .json({ msg: 'Taki klub nie istnieje w bazie danych.' });
//   }
//   playerFieldsCLUB.club = clubFromDB.id;

//   playerFields.inClub.push(playerFieldsCLUB);
// }

// // Create
// player = new Player(playerFields);
// await player.save();
// res.json(player);
