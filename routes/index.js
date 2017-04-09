const express = require('express');

const auth = require('./auth/index');
const api = require('./api/index');
const authHelper = require('./auth/helper');

const router = express.Router();

/* Add user if loggedIn */
router.use(authHelper.checkTokenSetUser);

/* Login, logout, & register routes */
router.use('/auth', auth);

/* Ensure user is logged in before providing access */
router.use('/api/v1', authHelper.loggedIn, api);

module.exports = router;
