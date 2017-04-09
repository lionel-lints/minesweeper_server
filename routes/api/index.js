const express = require('express');
const users = require('./users.js');
const games = require('./games.js');

const router = express.Router();

router.use('/', users);

/* Get highScores for display */
router.get('/highscores', (req, res, next) => {
});

module.exports = router;
