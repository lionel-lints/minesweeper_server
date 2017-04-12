const moment = require('moment');
const jwt = require('jsonwebtoken');

require('dotenv').load();

const decodeToken = (token, callback) => {
  const payload = jwt.verify(token, process.env.TOKEN_SECRET);
  const now = moment().unix();
  /* Check if the token has expired */
  if (now > payload.exp) callback('Token has expired.');
  else callback(null, payload);
};

const encodeToken = (user) => {
  const playload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user.id,
  };
  return jwt.sign(playload, process.env.TOKEN_SECRET);
};

module.exports = {
  decodeToken,
  encodeToken,
};
