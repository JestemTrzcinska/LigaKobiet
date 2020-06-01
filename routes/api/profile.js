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
      user: req.user.id,
    })
      .populate('user', [
        'firstName',
        'lastName',
        'avatar',
        'isStaff',
        'points',
      ])
      .populate('favClub');

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
    const clubFromDB = await Club.findOne({
      name: favClub,
    });
    if (!clubFromDB) {
      return res
        .status(400)
        .json({ msg: 'Klub o takiej nazwie nie istnieje w bazie danych.' });
    }
    profileFields.favClub = clubFromDB.id;
  }

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    console.log(req.user.id);

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

// @route     Get api/profile
// @desc      Get all profile
// @access    Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find()
      .populate('user', [
        'firstName',
        'lastName',
        'avatar',
        'isStaff',
        'points',
      ])
      .populate('favClub');
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     Get api/profile/user/:user_id
// @desc      Get profile by user ID
// @access    Public

router.get('/user/:userID', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userID,
    })
      .populate('user', [
        'firstName',
        'lastName',
        'avatar',
        'isStaff',
        'points',
      ])
      .populate('favClub');

    if (!profile)
      return res
        .status(400)
        .json({ msg: 'Profil nie znaleziony w bazie danych' });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res
        .status(400)
        .json({ msg: 'Profilu nie znaleziono w bazie danych' });
    }
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/profile
// @desc      Delete profile, user & posts
// @access    Private

router.delete('/', auth, async (req, res) => {
  try {
    // TODO - remove users posts

    // remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     PUT api/profile/experience
// @desc      Add profile experience
// @access    Private

module.exports = router;
