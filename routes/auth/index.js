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

function loggedIn(token, callback) {
  console.log("ensure the user is the user");
}

function checkTokenSetUser(req, res, next) {
  const token = getTokenFromHeader(req);

  if (token) {
    verifyJWT(token)
      .then(user => {
        req.user = user;
        next();
      });
  } else {
    next();
  }
}

module.exports = {
  router,
  loggedIn,
  checkTokenSetUser
};
