
const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs");
const url = require("node:url");
const querystring = require("node:querystring");
const Request = require("./req.js");
const Response = require("./res.js");
const Route = require("./route.js");
const Middleware = require("./middleware.js");

const bodyParser = require('./middleware/body-parser');
const cors = require('./middleware/cors');
const compression = require('./middleware/compression');
const rateLimit = require('./middleware/rate-limit');
const validator = require('./middleware/validator');
const cookieParser = require('./middleware/cookie-parser');
const multipart = require('./middleware/multipart');

class Rectify {
  constructor() {
    this.routes = [];
    this.middlewares = [];
    this.errorHandler = null;
    this.notFoundHandler = null;
    this.server = null;
    this.staticDir = null;
    this.templateDir = null;
  }

  static bodyParser = bodyParser;
  static cors = cors;
  static compression = compression;
  static rateLimit = rateLimit;
  static validator = validator;
  static cookieParser = cookieParser;
  static multipart = multipart;

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

  useStatic(directory) {
    this.staticDir = directory;
    this.use(async (req, res, next) => {
      if (req.method === 'GET') {
        const parsedUrl = url.parse(req.url);
        const filePath = path.join(directory, parsedUrl.pathname);
        try {
          const stat = await fs.promises.stat(filePath);
          if (stat.isFile()) {
            const contentType = this.getContentType(filePath);
            res.setHeader('Content-Type', contentType);
            const stream = fs.createReadStream(filePath);
            stream.pipe(res.res);
            return;
          }
        } catch (err) {}
      }
      next();
    });
  }

  useTemplates(directory) {
    this.templateDir = directory;
  }

  getContentType(filePath) {
    const ext = path.extname(filePath);
    const types = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.gif': 'image/gif'
    };
    return types[ext] || 'application/octet-stream';
  }

  async handleRequest(req, res) {
    const request = new Request(req);
    const response = new Response(res);

    const parsedUrl = url.parse(request.url, true);
    request.query = parsedUrl.query;

    const route = this.findRoute(request);
    if (route) {
      request.params = route.extractParams(parsedUrl.pathname);
      if (request.method === "POST") await request.parseBody();
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
    const parsedUrl = url.parse(request.url);
    for (const route of this.routes) {
      if (route.method === request.method && route.matches(parsedUrl.pathname)) {
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
        this.handleMiddlewares(req, res, index + 1)
      );
    } else {
      this.handleRequest(req, res);
    }
  }

  listen(port, callback) {
    if (!this.server) {
      this.server = http.createServer((req, res) =>
        this.handleMiddlewares(req, res, 0)
      );
    }
    this.server.listen(port, "0.0.0.0", callback);
  }

  close() {
    if (this.server) {
      this.server.close();
    }
  }
}

module.exports = Rectify;
