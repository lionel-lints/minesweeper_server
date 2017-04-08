const express = require('express');

const auth = require('./auth/index.js');
const api = require('./api/index.js');

const router = express.Router();

/* GET example json. */
router.get('/', (req, res, next) => {
  res.json({ title: 'Mine SWEEP!' });
});

router.use('/auth', auth.router);
router.use('/api/v1', api);

module.exports = router;
