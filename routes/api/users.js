const express = require('express');
const moment = require('moment');
const games = require('./games');
const tables = require('../../db/tables');

const router = express.Router();

/* GET a user. */
router.get('/:id', (req, res, next) => {
  if (res.locals.user.sub === Number(req.params.id)) {
    tables.Users().where({ id: req.params.id }).then((user) => {
      res.json(user);
    }).catch((error) => {
      res.status(500).json({
        status: 'user not retrieved from db',
        error,
      });
    });
  } else {
    res.status(401).json({ message: 'UnAuthorized' });
  }
});

/* UPDATE a user. */
router.put('/:id', (req, res, next) => {
  if (res.locals.user.sub === Number(req.params.id)) {
    const updatedUser = {};
    const returnArray = ['id', 'updated_at'];
    const keyArray = Object.keys(req.body).filter(key => key !== 'id');

    /* Itterate through the keys, add them to the new object and array */
    keyArray.forEach((key) => {
      updatedUser[key] = req.body[key];
      returnArray.push(key);
    });

    /* Disallow updates of the id field */
    if (req.body.id !== Number(req.user.id)) {
      res.status(422).json({ error: 'You cannot update the id field.' });
    }

    updatedUser.updated_at = moment();
    tables.Users().returning(returnArray).where('id', req.user.id).update(updatedUser)
    .then((returnedUser) => {
      res.json(returnedUser);
    })
    .catch((error) => {
      res.status(500).json({
        status: 'user not updated',
        error,
      });
    });
  } else {
    res.status(401).json({ message: 'UnAuthorized' });
  }
});

/* DELETE a user. */
router.delete('/:id', (req, res, next) => {
  if (res.locals.user.sub === Number(req.params.id)) {
    tables.Users().where('id', req.user.id).del().then((user) => {
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

/* Add the games resource for a user. */
router.use('/:user_id/games', games);

module.exports = router;
