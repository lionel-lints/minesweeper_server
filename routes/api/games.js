const express = require('express');
const moment = require('moment');
const tables = require('../../db/tables');

const router = express.Router({ mergeParams: true });

/* GET all user's games. */
router.get('/', (req, res) => {
  if (res.locals.user.sub === Number(req.params.user_id)) {
    tables.Games().where({ user_id: req.params.user_id })
    .then((games) => {
      res.json(games);
    })
    .catch((error) => {
      res.status(500).json({
        status: 'games not retrieved from db',
        error,
      });
    });
  } else {
    res.status(401).json({ message: 'UnAuthorized' });
  }
});

/* DELETE all user's games. */
router.delete('/', (req, res, next) => {
  if (res.locals.user.sub === Number(req.params.user_id)) {
    tables.Games().where('id', req.user.id).del()
    .then((response) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      res.status(500).json({
        status: 'user not removed from db',
        error,
      });
    });
  } else {
    res.status(401).json({ message: 'UnAuthorized' });
  }
});

/* POST a new game. */
router.post('/', (req, res, next) => {
  if (res.locals.user.sub === Number(req.params.user_id)) {
    tables.Games().insert({
      created_at: moment(),
      updated_at: moment(),
      user_id: req.user.id,
      completion_speed: req.body.speed,
      current_game: req.body.current_game,
      successfully_completed: req.body.won,
    }).returning('*')
    .then((newGame) => {
      res.status(200).json({
        status: 'success',
        newGame,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 'game not added to db',
        error,
      });
    });
  } else {
    res.status(401).json({ message: 'UnAuthorized' });
  }
});

/* DELETE a game. */
router.delete('/:id', (req, res, next) => {
  if (res.locals.user.sub === Number(req.params.user_id)) {
    tables.Games().where('id', req.params.id).del()
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      res.status(500).json({
        status: 'game not removed from db',
        error,
      });
    });
  } else {
    res.status(401).json({ message: 'UnAuthorized' });
  }
});

module.exports = router;
