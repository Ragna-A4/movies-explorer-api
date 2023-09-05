class BadRequest extends Error {
  constructor(err) {
    super(err);
    this.message = 'Переданы некорректные данные';
    this.statusCode = 400;
  }
}

module.exports = BadRequest;
