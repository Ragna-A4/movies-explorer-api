class Conflict extends Error {
  constructor(err) {
    super(err);
    this.message = 'Такой пользователь уже существует';
    this.statusCode = 409;
  }
}

module.exports = Conflict;
