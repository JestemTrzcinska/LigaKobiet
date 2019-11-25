const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { validationResult } = require('express-validator');

const Profile = require('../../models/Profile');

// @route     GET api/profile/me
// @desc      Get current users profile
// @access    Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['first_name', 'last_name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Ten użytkownik nie ma profilu' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/profile
// @desc      Create or Update user profile
// @access    Private
router.post('/', [auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { points, favClub, contact, localization, about } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (points) profileFields.points = points;
  if (contact) profileFields.contact = contact;
  if (localization) profileFields.localization = localization;
  if (about) profileFields.about = about;

  if (favClub) {
    const clubFromRequest = favClub;
    const clubFromDB = await Club.findOne({
      name: clubFromRequest
    });
    if (!clubFromDB) {
      return res
        .status(400)
        .json({ msg: 'Taka liga nie istnieje w bazie danych.' });
    }
    profileFields.favClub = favClub;
  }

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    // Create
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

module.exports = router;
