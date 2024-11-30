class Middleware {
  constructor(handler) {
    this.handler = handler;
  }

  async handle(req, res, next) {
    await this.handler(req, res, next);
  }
}

module.exports = Middleware;