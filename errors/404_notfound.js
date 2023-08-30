class NotFound extends Error {
  constructor(err) {
    super(err);
    this.message = 'Запрашиваемая информация не найдена';
    this.statusCode = 404;
  }
}

module.exports = NotFound;
