const express = require('express');
const users = require('./users.js');
const games = require('./games.js');
const tables = require('../../db/tables');

const router = express.Router();

router.use('/users', users);

/* Get highScores for display */
router.get('/highscores', (req, res, next) => {
  tables.Users()
  .join('games', 'users.id', '=', 'games.user_id')
  .orderBy('completion_speed', 'asc')
  .where({ successfully_completed: true })
  .limit(10)
  .then((games) => {
    games = games.map(game => { 
      return {
        first_name: game.first_name,
        completion_speed: game.completion_speed,
      }
    });
    res.json(games);
  })
  .catch((error) => {
    res.status(500).json({
      status: 'games not retrieved from db',
      error,
    });
  });
});

module.exports = router;
