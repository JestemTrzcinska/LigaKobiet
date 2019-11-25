const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Game = require('../../models/Game');

// @route     POST api/game
// @desc      Add game
// @access    Public
router.post(
  '/',
  [
    check('teamHome', 'Podanie drużyny jest wymagane.')
      .not()
      .isEmpty(),
    check('teamAway', 'Podanie drużyny jest wymagane.')
      .not()
      .isEmpty(),
    // check('date', 'Podanie daty meczu jest wymagane'),
    check('league', 'Podanie ligi jest wymagane.')
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
        console.log('Taka drużyna nie istnieje:', teamHome);
        return res
          .status(400)
          .json({ msg: 'Taki klub nie istnieje w bazie danych.' });
      }

      // See if teamAway exists
      const teamAwayFromDB = await Club.findOne({
        name: teamAway
      });
      if (!teamAwayFromDB) {
        console.log('Taka drużyna nie istnieje:', teamAway);
        return res
          .status(400)
          .json({ msg: 'Taki klub nie istnieje w bazie danych.' });
      }

      // See if the Game already exists
      const gameDB = await Game.findOne({
        teamHome: teamHomeFromDB.id,
        teamAway: teamAwayFromDB.id,
        date: date
      });
      console.log(gameDB);

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

      // Build gameFields objext
      const gameFields = {};

      gameFields.teamHome = teamHomeFromDB;
      gameFields.teamAway = teamAwayFromDB;
      gameFields.league = leagueFromDB;
      if (localization) gameFields.localization = localization;
      gameFields.date = date;

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

          if (!goals[i].shotBy)
            return res.status(400).json({
              msg: 'Podanie informacji kto strzelił jest obowiązkowe.'
            });

          // See if player exists
          const playerFromRequest = goals[i].shotBy;
          const playerFromDB = await Player.findOne({
            firstName: playerFromRequest
          });
          if (!playerFromDB)
            return res
              .status(400)
              .json({ msg: 'Taka zawodniczka nie istnieje w bazie danych.' });

          goalsPreparedForGameFields.shotBy = playerFromDB.id;

          if (goals[i].isOwn == true || goals[i].isOwn == false)
            goalsPreparedForGameFields.isOwn = goals[i].isOwn;

          gameFields.goals.push(goalsPreparedForGameFields);
        }
      }

      // Create
      const game = new Game(gameFields);

      await game.save();
      res.json(game);

      // res.send('Club added');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

// @route     GET api/game
// @desc      Test route
// @access    Public
router.get('/', async (req, res) => {
  try {
    const game = await Game.find(req.game);
    console.log(game);
    if (!game) {
      console.log(game);
      return res.status(400).json({ msg: 'Nie ma meczu' });
    } else {
      console.log(game);
    }
    res.json(game);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
