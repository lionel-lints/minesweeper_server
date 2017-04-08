const jwt = require('jsonwebtoken');

function getTokenFromHeader(req) {
  const token = req.get('Authorization');
  if (token) {
    const tokenSplit = token.split(' ');
    return tokenSplit.length > 0 ? tokenSplit[1] : tokenSplit[0];
  } else return false;
}

function verifyJWT(token) {
  return new Promise((resolve) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) return resolve();
      resolve(decoded);
    });
  });
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

function loggedIn(req, res, next) {
  if(req.user && !isNaN(Number(req.user.id))) next();
  else {
    res.status(401);
    res.json({message: 'UnAuthorized'});
  }
}

module.exports = {
  loggedIn,
  checkTokenSetUser
};
