const express = require('express');
const router = express.Router();

const games = require('./games');
const tables = require('../../db/tables');

/* GET users. */
router.get('/', (req, res) => {
  tables.Users().then((users) => {
    res.json(users);
  }).catch((error) => {
    console.error(error);
  });
});

/* GET a user. */
router.get('/:id', (req, res, next) => {
});

/* POST a new user. */
router.post('/', (req, res, next) => {
});

/* UPDATE a user. */
router.put('/:id', (req, res, next) => {
});

/* Delete a user. */
router.delete('/:id', (req, res, next) => {
});

/* Add the games resource for a user. */
router.use('/:user_id/games', games);

module.exports = router;
