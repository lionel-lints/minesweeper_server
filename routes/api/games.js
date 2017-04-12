const express = require('express');
const tables = require('../../db/tables');

const router = express.Router({ mergeParams: true });

/* GET all user's games. */
router.get('/', (req, res) => {
  if (res.locals.user.id === req.params.user_id) {
    tables.Games().where({ user_id: req.params.user_id }).then((games) => {
      res.json(games);
    }).catch((error) => {
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
  if (res.locals.user.id === req.params.user_id) {
    tables.Games().where('id', req.user.id).del().then((response) => {
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
});

/* DELETE a game. */
router.delete('/:id', (req, res, next) => {
});

module.exports = router;
