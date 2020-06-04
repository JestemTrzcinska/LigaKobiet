const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator');

const Club = require('../../models/Club');

// @route     POST api/club
// @desc      Add club
// @access    Public
router.post(
  '/',
  [
    check('name', 'Nazwa klubu jest wymagana.').not().isEmpty(),
    check('league', 'Podanie ligi jest wymagane.').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // bad request
    }

    let { name, league, logo } = req.body;

    const leagueFromDB = await League.findOne({
      name: league,
    });
    if (!leagueFromDB) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Taka liga nie istnieje w bazie danych.' }] });
    }

    // Get clubs gravatar
    logo
      ? logo
      : (logo = gravatar.url({
          s: '200', // size
          r: 'pg', // reading; cant be naked people
          d: 'mm', // default; user icon when he doesnt have one
        }));

    try {
      let club = await Club.findOne({
        name,
      });

      if (club) {
        // Update
        const club2 = await Club.findOneAndUpdate(
          { _id: club._id },
          { $set: { name, league: leagueFromDB.id, logo } },
          { new: true }
        );

        return res.json(club2);
      }

      // Create

      club = new Club({
        name,
        league: leagueFromDB,
        logo,
      });

      await club.save();
      res.json(club);

      // res.send('Club added');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

//  await Club.find(req.club) ?

// @route     GET api/club
// @desc      Get clubs
// @access    Public
router.get('/', async (req, res) => {
  try {
    const club = await Club.find().populate('league');
    if (!club) {
      return res
        .status(404)
        .json({
          errors: [{ msg: 'Nie ma ani jednego klubu w bazie danych.' }],
        });
    }
    res.json(club);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/club/:clubID
// @desc      Get club by ID
// @access    Public
router.get('/:clubID', async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.clubID }).populate(
      'league'
    );
    if (!club) {
      return res
        .status(404)
        .json({
          errors: [{ msg: 'Nie ma ani jednego klubu w bazie danych.' }],
        });
    }
    res.json(club);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
