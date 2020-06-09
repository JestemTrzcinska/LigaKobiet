const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const League = require('../../models/League');

// @route     POST api/league
// @desc      Add league
// @access    Public
router.post(
  '/',
  [
    check('name', 'Nazwa jest wymagana.').not().isEmpty(),
    check('from', 'Podanie daty jest wymagane.').not().isEmpty(),
    check('to', 'Podanie daty jest wymagane.').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // bad request
    }

    const { name, from, to } = req.body;

    // See if the League exists
    let leagueFromDB = await League.findOne({ name, from, to });
    if (leagueFromDB) {
      return res.status(400).json({
        errors: [{ msg: 'Taka liga już istnieje.' }],
      });
    }
    try {
      let league = await League.findOne({ name });

      if (league) {
        // Update
        const league2 = await League.findOneAndUpdate(
          { _id: league._id },
          { $set: { name, from, to } },
          { new: true }
        );

        return res.json(league2);
      }

      // Create
      league = new League({
        name,
        from,
        to,
      });

      await league.save();
      res.json(league);

      // res.send('League added');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

// @route     GET api/league
// @desc      Get leagues
// @access    Public
///////////////////////////////////////////////// nie działa //////////////
router.get('/', async (req, res) => {
  try {
    const league = await League.find();
    if (!league) {
      return res.status(404).json({
        errors: [
          {
            msg: 'Nie ma ani jednej ligi w bazie danych.',
          },
        ],
      });
    }
    res.json(league);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/league/:leagueID
// @desc      Get league by ID
// @access    Public
router.get('/:leagueID', async (req, res) => {
  try {
    const league = await League.findOne({ _id: req.params.leagueID });
    if (!league) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'Nie ma ani jednej ligi w bazie danych.' }] });
    }
    res.json(league);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

// NOTATKI REACT MONGO

// const { name, from, to, leagues } = req.body;
// try {
//   // See if the Season already exists
//   let seasonFromDB = await Season.findOne({ name });
//   if (seasonFromDB) {
//     return res.status(400).json({
//       errors: [{ msg: 'Taki sezon już istnieje w bazie.' }]
//     });
//   }

//   // See if puted leagues are in db
//   const leaguesFromDB = await League.find({
//     name: { $in: leagues }
//   }).exec();
//   ///////////////////////////////////////////////////// dodać by pokazywał, które ligi się nie zgadzają ///////////////////

//   const season = new Season({
//     name,
//     from,
//     to,
//     leagues: leaguesFromDB
//   });
