const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
var moment = require('moment');
moment().format();

const Game = require('../../models/Game');

// @route     POST api/game
// @desc      Add game
// @access    Public
router.post(
  '/',
  [
    check('teamHome', 'Podanie nazwy drużyny gospodarzy jest wymagane.')
      .not()
      .isEmpty(),
    check('teamAway', 'Podanie nazwy drużyny gości jest wymagane.')
      .not()
      .isEmpty(),
    check('league', 'Podanie nazwy ligi jest wymagane.')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // bad request
    }

    const { teamHome, teamAway, league, localization, date, goals } = req.body;

    try {
      // See if teamHome exists
      const teamHomeFromDB = await Club.findOne({
        name: teamHome
      });
      if (!teamHomeFromDB) {
        return res
          .status(400)
          .json({ msg: `Taki klub ${teamHome} nie istnieje w bazie danych.` });
      }

      // See if teamAway exists
      const teamAwayFromDB = await Club.findOne({
        name: teamAway
      });
      if (!teamAwayFromDB) {
        return res
          .status(400)
          .json({ msg: `Taki klub ${teamAway} nie istnieje w bazie danych.` });
      }

      // See if the Game already exists
      const gameDB = await Game.findOne({
        teamHome: teamHomeFromDB.id,
        teamAway: teamAwayFromDB.id,
        localization,
        date: date
      });

      if (gameDB) {
        return res.status(400).json({
          errors: [{ msg: 'Taki mecz jest już w bazie.' }]
        });
      }

      // See if league exists
      const leagueFromRequest = league;
      const leagueFromDB = await League.findOne({
        name: leagueFromRequest
      });
      if (!leagueFromDB) {
        return res
          .status(400)
          .json({ msg: 'Taka liga nie istnieje w bazie danych.' });
      }

      // Build gameFields object
      const gameFields = {};

      gameFields.teamHome = teamHomeFromDB;
      gameFields.teamAway = teamAwayFromDB;
      gameFields.league = leagueFromDB;
      if (localization) gameFields.localization = localization;

      // Check if game is in time that league is
      if (moment(date) > leagueFromDB.from && moment(date) < leagueFromDB.to) {
        gameFields.date = date;
      } else {
        return res.status(400).json({
          msg: `Prosze o podanie prawidłowej daty meczu. Musi się zawierać między ${moment(
            leagueFromDB.from
          ).format('DD-MM-YYYY')} a ${moment(leagueFromDB.to).format(
            'DD-MM-YYYY'
          )}`
        });
      }

      if (goals) {
        gameFields.goals = [];
        for (i = 0; i < goals.length; i++) {
          let goalsPreparedForGameFields = {};

          // amount
          if (goals[i].amount)
            goalsPreparedForGameFields.amount = goals[i].amount;
          else {
            return res
              .status(400)
              .json({ msg: 'Podanie ilości goli jest obowiązkowe.' });
          }

          // goal for who t.b.c.
          if (
            goals[i].goalForTeamHome == true ||
            goals[i].goalForTeamHome == false
          )
            goalsPreparedForGameFields.goalForTeamHome =
              goals[i].goalForTeamHome;
          else
            return res
              .status(400)
              .json({ msg: 'Podanie tej informacji jest obowiązkowe..' });

          // shotBy
          if (!goals[i].shotBy)
            return res.status(400).json({
              msg: 'Podanie informacji kto strzelił jest obowiązkowe.'
            });

          // See if player in teamHome or teamAway exists
          const playerFirstNameReq = goals[i].shotBy[0].firstName;
          const playerLastNameReq = goals[i].shotBy[1].lastName;
          const playerFromDB = await Player.findOne({
            firstName: playerFirstNameReq,
            lastName: playerLastNameReq
          });
          if (!playerFromDB)
            return res
              .status(400)
              .json({ msg: 'Taka zawodniczka nie istnieje w bazie danych.' });

          let playerInClubEqualPlayerThatShoot;

          if (goals[i].goalForTeamHome == true) {
            playerInClubEqualPlayerThatShoot = await PlayerInClub.findOne({
              player: playerFromDB,
              club: teamHomeFromDB
            });
          }

          if (goals[i].goalForTeamHome == false) {
            playerInClubEqualPlayerThatShoot = await PlayerInClub.findOne({
              player: playerFromDB,
              club: teamAwayFromDB
            });
          }

          if (!playerInClubEqualPlayerThatShoot)
            return res.status(400).json({
              msg: `Zawodniczka o nazwisku: ${playerFromDB.lastName} nie bierze udziału w tym meczu lub nie strzeliła dla swojej drużyny. Jeżeli był to samobój zaznacz poniżej "Samobój".`
            });

          goalsPreparedForGameFields.shotBy = playerFromDB;

          // is Own?
          if (goals[i].isOwn == true || goals[i].isOwn == false)
            goalsPreparedForGameFields.isOwn = goals[i].isOwn;

          gameFields.goals.push(goalsPreparedForGameFields);
        }
      }

      // Create
      const game = new Game(gameFields);

      await game.save();
      res.json(game);

      // res.send('Game added');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

// @route     GET api/game
// @desc      Get games
// @access    Public
router.get('/', async (req, res) => {
  try {
    const game = await Game.find(req.game);
    if (!game) {
      return res
        .status(400)
        .json({ msg: 'Nie ma ani jednego meczu w bazie danych.' });
    }
    res.json(game);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// // @route     DELETE api/game
// // @desc      Delete game
// // @access    Public

// router.delete('/', auth, async (req, res) => {
//   try {
//     // remove game
//     await Game.findOneAndRemove({
//       _id: req.body.id
//     });
//     const user = await User.findOne({ _id: req.user.id });

//     res.json({
//       msg: `Mecz został usunięty przez: ${user.first_name} ${user.last_name} ${user.email}`
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

module.exports = router;
