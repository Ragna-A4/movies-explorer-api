class Forbidden extends Error {
  constructor(err) {
    super(err);
    this.message = 'Недостаточно прав для выбранного действия';
    this.statusCode = 403;
  }
}

module.exports = Forbidden;
