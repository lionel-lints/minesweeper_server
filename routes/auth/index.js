const express = require('express');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const bouncer = require('express-bouncer')(500, 900000);

const tables = require('../../db/tables');
const { encodeToken } = require('./local');
const { createUser, comparePass } = require('./helper');

const router = express.Router();

/* Add bouncer error response when too many requests have been made (brute-force protection)*/
bouncer.blocked = (req, res, next, remaining) => {
  res.status(429).json({
    status: `Too many requests have been made, please wait ${remaining / 1000} seconds`,
  });
};

router.use('/register', (req, res, next) => {
  return createUser(req)
  .then(user => encodeToken(user[0]))
  .then((token) => {
    res.status(200).json({
      status: 'success',
      token,
    });
  })
  .catch((err) => {
    /* If user has already been created, informitive error */
    res.status(500).json({
      status: err.code === '23505' ? 'user already exists' : 'error',
    });
  });
});

router.use('/login', bouncer.block, (req, res, next) => {
  return tables.Users().where({ email: req.body.email }).first()
  .then((response) => {
    comparePass(req.body.hashed_password, response.hashed_password);
    return response;
  })
  .then(response => encodeToken(response))
  .then((token) => {
    /* On successful login, reset the bouncer & set the token */
    bouncer.reset(req);
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({
      status: 'success',
      token,
    });
  })
  .catch((err) => {
    res.status(500).json({
      status: 'error',
    });
  });
});

router.use('/logout', (req, res, next) => {
  res.clearCookie('token');
  res.json({ title: 'You have logged out!' });
});

module.exports = router;
