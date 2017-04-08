const express = require('express');

const auth = require('./auth/index.js');
const api = require('./api/index.js');
const authHelper = require('./auth/helper.js');

const router = express.Router();

/* Add user if loggedIn */
router.use(authHelper.checkTokenSetUser);

/* GET example json. */
router.get('/', (req, res, next) => {
  res.json({ title: 'Mine SWEEP!' });
});

router.use('/auth', auth);
router.use('/api/v1', authHelper.loggedIn, api);

module.exports = router;
