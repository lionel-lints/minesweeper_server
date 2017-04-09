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
  } else return false;
}

const verifyJWT = (token) => {
  return new Promise((resolve) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) return resolve();
      resolve(decoded);
    });
  });
}

const checkTokenSetUser = (req, res, next) => {
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

const loggedIn = (req, res, next) => {
  if(req.user && !isNaN(Number(req.user.sub))){
    next();
  } else {
    res.status(401);
    res.json({message: 'UnAuthorized'});
  }
}

const comparePass = (clientPass, dbPass) => {
  const bool = bcrypt.compareSync(clientPass, dbPass);
  if (!bool) throw new Error('incorrect password or email');
  else return true;
}

const createUser = (req) => {
  const salt = bcrypt.genSaltSync(11);
  const hashed_pass = bcrypt.hashSync(req.body.hashed_password, salt);
  return tables.Users().insert({
    'created_at': moment(), 
    'updated_at': moment(), 
    'first_name': req.body.first_name,
    'last_name': req.body.last_name,
    'hashed_password': hashed_pass,
    'email': req.body.email,
  }).returning('*');
}

module.exports = {
  checkTokenSetUser,
  comparePass,
  createUser,
  loggedIn,
};
