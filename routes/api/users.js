const express = require('express');
const router = express.Router();
const tables = require('../../db/tables');

/* GET users. */
router.get('/', (req, res) => {
  tables.Users().then((users) => {
    res.json(users);
  }).catch((error) => {
    console.error(error);
  });
});


module.exports = router;
