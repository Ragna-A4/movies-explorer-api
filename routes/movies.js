const moviesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { validateUrl } = require('../utils/regular');

const isValidId = celebrate({
  params: Joi.object().keys({
    movie_id: Joi.string().length(24).hex().required(),
  }),
});

moviesRouter.get('/', getMovies);

moviesRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      description: Joi.string().required(),
      country: Joi.string().required(),
      director: Joi.string().required(),
      year: Joi.string().required().min(4).max(4),
      duration: Joi.number().required(),
      image: Joi.string().required().regex(validateUrl),
      thumbnail: Joi.string().required().regex(validateUrl),
      trailerLink: Joi.string().required().regex(validateUrl),
      movieId: Joi.number().required(),
    }),
  }),
  createMovie,
);

moviesRouter.delete('/:movie_id', isValidId, deleteMovie);

module.exports = moviesRouter;
