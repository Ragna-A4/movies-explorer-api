const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  // имя пользователя; обязательное поле-строка от 2 до 30 символов
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  // почта пользователя; обязательное уникальное поле; должно валидироваться как e-mail
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
    },
  },
  // **хеш пароля; бязательное поле-строка
  password: {
    type: String,
    required: true,
    select: false,
  },
});
// поведение по умолчанию, чтобы база данных не возвращала пароль
userSchema.methods.toJSON = function deleteUserPassword() {
  const user = this.toObject();
  delete user.password;

  return user;
};

module.exports = mongoose.model('user', userSchema);
