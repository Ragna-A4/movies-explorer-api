const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  // название фильма на русском языке; обязательное поле-строка
  nameRU: {
    type: String,
    required: true,
  },
  // название фильма на английском языке; обязательное поле-строка
  nameEN: {
    type: String,
    required: true,
  },
  // описание фильма; обязательное поле-строка
  description: {
    type: String,
    required: true,
  },
  // страна создания фильма; обязательное поле-строка
  country: {
    type: String,
    required: true,
  },
  // режиссёр фильма; бязательное поле-строка
  director: {
    type: String,
    required: true,
  },
  // год выпуска фильма; обязательное поле-строка
  year: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 4,
  },
  // длительность фильма; бязательное поле-число
  duration: {
    type: Number,
    required: true,
  },
  // ссылка на постер к фильму; обязательное поле-строка; URL-адрес
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
    },
  },
  // миниатюрное изображение постера к фильму; обязательное поле-строка; URL-адрес
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
    },
  },
  // ссылка на трейлер фильма; обязательное поле-строка; URL-адрес
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
    },
  },
  // id фильма, содержится в ответе сервиса MoviesExplorer; обязательное поле в формате number
  movieId: {
    type: Number,
    required: true,
  },
  // _id пользователя, который сохранил фильм; обязательное поле
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
