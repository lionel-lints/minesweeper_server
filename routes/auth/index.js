const express = require('express');
const router = express.Router();
const {encodeToken, decodeToken} = require('./local');

router.use('/register', (req, res, next) => {
  res.json({ title: 'test register!' });
});

router.use('/login', (req, res, next) => {
  res.json({ title: 'test login!' });
});

router.use('/logout', (req, res, next) => {
  res.json({ title: 'test logout!' });
});

module.exports = router;
