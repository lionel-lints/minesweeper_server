const express = require('express');

const auth = require('./auth/index');
const api = require('./api/index');
const { checkTokenSetUser, loggedIn } = require('./auth/helper');

const router = express.Router();

/* Add user to req if loggedIn */
router.use(checkTokenSetUser);

/* Login, logout, & register routes */
router.use('/auth', auth);

/* Ensure user is logged in before providing access to api */
router.use('/api/v1', loggedIn, api);

module.exports = router;
