const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const tables = require('../../db/tables');
const moment = require('moment');

require('dotenv').load();

const getTokenFromHeader = (req) => {
  const token = req.get('Authorization');
  if (token) {
    const tokenSplit = token.split(' ');
    return tokenSplit.length > 0 ? tokenSplit[1] : tokenSplit[0];
  }
  return false;
};

const verifyJWT = (token) => {
  return new Promise((resolve) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) return resolve();
      return resolve(decoded);
    });
  });
};

/* Adds user to req object if token is verified */
const checkTokenSetUser = (req, res, next) => {
  const token = getTokenFromHeader(req);
  if (token) {
    verifyJWT(token)
      .then((user) => {
        req.user = user;
        res.locals.user = user;
        next();
      });
  } else {
    next();
  }
};

/* Allows access if user has been added to the req & res.locals objects */
const loggedIn = (req, res, next) => {
  if (req.user && req.user === res.locals.user && !isNaN(Number(req.user.sub))) {
    next();
  } else {
    res.status(401);
    res.json({ message: 'UnAuthorized' });
  }
};

/* Compares the client subbed pass with the DB hashed pass */
const comparePass = (clientRawPass, dbHashedPass) => {
  const bool = bcrypt.compareSync(clientRawPass, dbHashedPass);
  if (!bool) throw new Error('incorrect password or email');
  else return true;
};

const createUser = (req) => {
  const salt = bcrypt.genSaltSync(11);
  const hashedPass = bcrypt.hashSync(req.body.hashed_password, salt);
  return tables.Users().insert({
    created_at: moment(),
    updated_at: moment(),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    hashed_password: hashedPass,
    email: req.body.email,
  }).returning('*');
};

module.exports = {
  checkTokenSetUser,
  comparePass,
  createUser,
  loggedIn,
};
