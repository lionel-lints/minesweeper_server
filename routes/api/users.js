const express = require('express');
const games = require('./games');
const tables = require('../../db/tables');

const router = express.Router();

/* GET users. MUST BE REMOVED BEFORE GOING LIVE*/
router.get('/', (req, res) => {
  tables.Users().then((users) => {
    res.json(users);
  }).catch((error) => {
    res.status(500).json({
      status: 'users not retrieved from db',
      error,
    });
  });
});

/* GET a user. */
router.get('/:id', (req, res, next) => {
  tables.Users().where({ id: req.params.id }).then((user) => {
    res.json(user);
  }).catch((error) => {
    res.status(500).json({
      status: 'user not retrieved from db',
      error,
    });
  });
});

/* UPDATE a user. */
router.put('/:id', (req, res, next) => {
});

/* Delete a user. */
router.delete('/:id', (req, res, next) => {
  if (res.locals.user.id === req.params.id){
    tables.Users().where('id', req.user.id).del().then((user) =>{
      res.sendStatus(204);
    }).catch((error) => {
      res.status(500).json({
        status: 'user not removed from db',
        error,
      });
    });
  } else {
    res.status(401).json({ message: 'UnAuthorized' });
  }
});

/* Add the games resource for a user. */
router.use('/:user_id/games', games);

module.exports = router;
