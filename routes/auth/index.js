const express = require('express');
const router = express.Router();

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
