class Unauthorized extends Error {
  constructor(err) {
    super(err);
    this.message = 'Необходима авторизация';
    this.statusCode = 401;
  }
}

module.exports = Unauthorized;
