const express = require('express');
const tables = require('../../db/tables');

const router = express.Router({ mergeParams: true });

/* GET all user's games. */
router.get('/', (req, res) => {
  tables.Games().where({ user_id: req.params.user_id }).then((games) => {
    res.json(games);
  }).catch((error) => {
    res.status(500).json({
      status: 'games not retrieved from db',
      error,
    });
  });
});

/* Delete all user's games. */
router.delete('/', (req, res, next) => {

});

/* POST a new game. */
router.post('/', (req, res, next) => {
});

/* Delete a game. */
router.delete('/:id', (req, res, next) => {
});

module.exports = router;
