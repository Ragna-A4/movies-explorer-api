const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const User = require('../models/user');
const BadRequest = require('../errors/400_badrequest');
const Unauthorized = require('../errors/401_unauthorized');
const NotFound = require('../errors/404_notfound');
const Conflict = require('../errors/409_conflict');

const { NODE_ENV, JWT_SECRET } = process.env;

function getUserInfo(req, res, next) {
  return User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFound());
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest());
      }
      return next(err);
    });
}

function createUser(req, res, next) {
  const {
    name, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict());
      } else if (err.name === 'ValidationError') {
        next(new BadRequest());
      } else {
        next(err);
      }
    });
}

function updateUserInfo(req, res, next) {
  const { name, email } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFound());
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest());
      } else {
        next(err);
      }
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(() => new Unauthorized())
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new Unauthorized());
          }
          const jwt = JWT.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret');
          res.cookie('jwt', jwt, {
            expiresIn: '7d',
            httpOnly: true,
            sameSite: true,
          });

          return res.status(200).send({ data: user.toJSON() });
        });
    })
    .catch(next);
}

function logout(_req, res) {
  if (res.cookie) {
    res.clearCookie('jwt');
    res.send({ message: 'Вы вышли из аккаунта' });
  }
}

module.exports = {
  getUserInfo,
  createUser,
  updateUserInfo,
  login,
  logout,
};
