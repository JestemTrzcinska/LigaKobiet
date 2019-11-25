const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const Season = require('../../models/Season');

// @route     POST api/season
// @desc      Add season
// @access    Public
router.post(
  '/',
  [
    check('name', 'Nazwa sezonu jest wymagana.')
      .not()
      .isEmpty(),
    // check('from', 'Podanie daty początkowej jest wymagane.')
    //   .not()
    //   .isEmpty(),
    // check('to', 'Podanie daty kończącej jest wymagane.')
    //   .not()
    //   .isEmpty(),
    check('leagues', 'Podanie lig jest wymagane.')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // bad request
    }

    const { name, from, to, leagues } = req.body;

    try {
      // See if the Season already exists
      let seasonFromDB = await Season.findOne({ name });
      if (seasonFromDB) {
        return res.status(400).json({
          errors: [{ msg: 'Taki sezon już istnieje w bazie.' }]
        });
      }

      // See if puted leagues are in db
      const leaguesFromDB = await League.find({
        name: { $in: leagues }
      }).exec();
      ///////////////////////////////////////////////////// dodać by pokazywał, które ligi się nie zgadzają ///////////////////

      const season = new Season({
        name,
        from,
        to,
        leagues: leaguesFromDB
        // [ { _id: 5dd9a7d49cf4789cf0ca6329, name: 'pierwszy', __v: 0 },
        // { _id: 5dd9c04768d79686e07df286, name: 'druga', __v: 0 } ]
      });

      await season.save();
      res.json(season);
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
