const express = require('express');
const users = require('./users.js');
const games = require('./games.js');

const router = express.Router();

router.use('/', users);

module.exports = router;
