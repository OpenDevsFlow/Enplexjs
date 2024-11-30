const http = require("node:http");
const Request = require("./req.js");
const Response = require("./res.js");
const Route = require("./route.js");
const Middleware = require("./middleware.js");

class Rectify {
  constructor() {
    this.routes = [];
    this.middlewares = [];
    this.errorHandler = null;
    this.notFoundHandler = null;
    this.server = null;
  }

  route(method, path, handler) {
    this.routes.push(new Route(method, path, handler));
  }

  use(middleware) {
    this.middlewares.push(new Middleware(middleware));
  }

  useErrorHandler(handler) {
    this.errorHandler = handler;
  }

  useNotFoundHandler(handler) {
    this.notFoundHandler = handler;
  }

  async handleRequest(req, res) {
    const request = new Request(req);
    const response = new Response(res);

    const route = this.findRoute(request);
    if (route) {
      request.params = route.extractParams(request.url);
      try {
        await route.handler(request, response);
      } catch (error) {
        this.handleError(error, request, response);
      }
    } else {
      this.handleNotFound(request, response);
    }
  }

  findRoute(request) {
    for (const route of this.routes) {
      if (route.method === request.method && route.matches(request.url)) {
        return route;
      }
    }
    return null;
  }

  handleError(error, request, response) {
    if (this.errorHandler) {
      this.errorHandler(error, request, response);
    } else {
      console.error(error);
      response.setStatus(500);
      response.send('Internal Server Error');
    }
  }

  handleNotFound(request, response) {
    if (this.notFoundHandler) {
      this.notFoundHandler(request, response);
    } else {
      response.setStatus(404);
      response.send('Not Found');
    }
  }

  async handleMiddlewares(req, res, index) {
    if (index < this.middlewares.length) {
      await this.middlewares[index].handle(req, res, () =>
        this.handleMiddlewares(req, res, index + 1),
      );
    } else {
      this.handleRequest(req, res);
    }
  }

  listen(port, callback) {
    if (!this.server) {
      this.server = http.createServer((req, res) =>
        this.handleMiddlewares(req, res, 0),
      );
    }
    this.server.listen(port, callback);
  }

  close() {
    if (this.server) {
      this.server.close();
    }
  }
}

module.exports = Rectify;