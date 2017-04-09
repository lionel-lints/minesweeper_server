const express = require('express');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const tables = require('../../db/tables');
const { encodeToken, decodeToken } = require('./local');
const { createUser, loggedIn, checkTokenSetUser } = require('./helper');

const router = express.Router();

router.use('/register', (req, res, next) => {
  /* Check email isn't used */

  return createUser(req).then((user) => { 
    return encodeToken(user[0]); 
  }).then((token) => {
    res.status(200).json({
      status: 'success',
      token: token
    });
  }).catch((err) => {
    res.status(500).json({
      status: 'error'
    });
  });
});

router.use('/login', (req, res, next) => {
  return tables.Users().where({ email: req.body.email }).first()
    .then((response) => {
      let realz = decodeToken(req.body.hashed_password, (err, payload) => { return payload });
    }).then((payload)=>{
      let result = comparePass(req.body.hashed_password, response.hashed_password);
    return result === true ? response : result;
  })
  .then((response) => { return encodeToken(response); })
  .then((token) => {
    res.status(200).json({
      status: 'success',
      token: token
    });
  })
  .catch((err) => {
    res.status(500).json({
      status: 'error'
    });
  });
});

router.use('/logout', (req, res, next) => {
  res.json({ title: 'test logout!' });
});

module.exports = router;
