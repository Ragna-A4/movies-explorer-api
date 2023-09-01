const Movie = require('../models/movie');
const BadRequest = require('../errors/400_badrequest');
const Forbidden = require('../errors/403_forbidden');
const NotFound = require('../errors/404_notfound');

function getMovies(req, res, next) {
  return Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
}

function createMovie(req, res, next) {
  return Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest());
      } else {
        next(err);
      }
    });
}

function deleteMovie(req, res, next) {
  return Movie.findById(req.params.movie_id)
    .then((movie) => {
      if (!movie) {
        return next(new NotFound());
      }
      if (!movie.owner.equals(req.user._id)) {
        return next(new Forbidden());
      }
      return Movie.deleteOne(movie._id)
        .then(() => res.status(200).send({ message: 'Фильм удален' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest());
      }
      return next(err);
    });
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
