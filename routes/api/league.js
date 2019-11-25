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
    check('name', 'Nazwa jest wymagana.')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // bad request
    }

    const { name } = req.body;

    try {
      // See if the League exists
      let league = await League.findOne({ name });
      if (league) {
        return res.status(400).json({
          errors: [{ msg: 'Taka liga już istnieje.' }]
        });
      }

      // Create
      league = new League({ name });
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
    const league = await League.find(req.League);
    res.json(league);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
