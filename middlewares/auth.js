const jwt = require('jsonwebtoken');

const Unauthorized = require('../errors/401_unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

function checkAuthentication(req, _res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new Unauthorized());
  }
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret');
  } catch (err) {
    return next(new Unauthorized());
  }

  req.user = payload;

  return next();
}

module.exports = { checkAuthentication };
