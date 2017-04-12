const express = require('express');
const router = express.Router({mergeParams: true});

const tables = require('../../db/tables');

/* GET all user's games. */
router.get('/', (req, res) => {
  tables.Games().where({ user_id: req.params.user_id }).then((games) => {
    res.json(games);
  }).catch((error) => {
    console.error(error);
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
