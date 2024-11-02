const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { createServer } = require('http');
const helmet = require('helmet');

/**
 * @class Rectify
 * @description Class to build web servers.
 */
class Rectify {
  constructor() {
    this.routes = { GET: {}, POST: {}, PUT: {}, DELETE: {} };
    this.middlewares = [];
    this.errorHandlers = [];
    this.notFoundHandler = null;
    this.server = null;
  }

  /**
   * Defines a route handler for a specific HTTP method and path.
   * @param {string} method - The HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE').
   * @param {string} path - The URL path pattern.
   * @param {function} handler - The handler function to be called when the route is matched.
   */
  route(method, path, handler) {
    this.routes[method][path] = handler;
  }

  /**
   * Adds a middleware function to the middleware pipeline.
   * @param {function} middleware - The middleware function.
   */
  use(middleware) {
    this.middlewares.push(middleware);
  }

  /**
   * Adds an error handler function to the error handling pipeline.
   * @param {function} handler - The error handler function.
   */
  useErrorHandler(handler) {
    this.errorHandlers.push(handler);
  }

  /**
   * Sets a not found handler function.
   * @param {function} handler - The not found handler function.
   */
  useNotFoundHandler(handler) {
    this.notFoundHandler = handler;
  }

  /**
   * Handles an incoming HTTP request.
   * @param {http.IncomingMessage} req - The incoming HTTP request.
   * @param {http.ServerResponse} res - The outgoing HTTP response.
   */
  async handleRequest(req, res) {
    helmet()(req, res, () => {
      const { method, url } = req;
      const handler = this.findRouteHandler(method, url, req);

      if (handler) {
        try {
          await handler(req, res);
        } catch (error) {
          this.handleError(error, req, res);
        }
      } else {
        this.handleNotFound(req, res);
      }
    });
  }

  /**
   * Finds the appropriate route handler for a given HTTP method and URL.
   * @param {string} method - The HTTP method.
   * @param {string} url - The URL path.
   * @param {http.IncomingMessage} req - The incoming HTTP request.
   * @returns {function|null} - The route handler function, or null if not found.
   */
  findRouteHandler(method, url, req) {
    const routes = this.routes[method] || {};
    for (const path in routes) {
      const re = new RegExp(`^${path.replace(/:[^\s/]+/g, '([^/]+)')}$`);
      const match = url.match(re);
      if (match) {
        req.params = this.extractParams(path, match);
        return routes[path];
      }
    }
    return null;
  }

  /**
   * Extracts parameters from a URL path pattern and a matched URL.
   * @param {string} path - The URL path pattern.
   * @param {Array<string>} match - The matched URL parts.
   * @returns {Object} - An object containing extracted parameters.
   */
  extractParams(path, match) {
    const params = {};
    const keys = (path.match(/:[^\s/]+/g) || []).map(param => param.substring(1));
    keys.forEach((key, index) => { params[key] = match[index + 1]; });
    return params;
  }

  /**
   * Serves static files from a specified directory.
   * @param {string} dir - The directory path.
   */
  serveStatic(dir) {
    this.use((req, res, next) => {
      const filePath = path.join(dir, url.parse(req.url).pathname);
      fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
          next();
        } else {
          res.sendFile(filePath);
        }
      });
    });
  }

  /**
   * Handles errors that occur during request processing.
   * @param {Error} err - The error object.
   * @param {http.IncomingMessage} req - The incoming HTTP request.
   * @param {http.ServerResponse} res - The outgoing HTTP response.
   */
  handleError(err, req, res) {
    console.error(err);
    for (const handler of this.errorHandlers) {
      try {
        handler(err, req, res);
        return;
      } catch (e) {
        console.error('Error handling error:', e);
      }
    }

    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Internal Server Error');
  }

  /**
   * Handles requests that don't match any defined routes.
   * @param {http.IncomingMessage} req - The incoming HTTP request.
   * @param {http.ServerResponse} res - The outgoing HTTP response.
   */
  handleNotFound(req, res) {
    if (this.notFoundHandler) {
      try {
        this.notFoundHandler(req, res);
      } catch (e) {
        console.error('Error handling not found:', e);
      }
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not Found');
    }
  }

  /**
   * Starts the HTTP server.
   * @param {number} port - The port number to listen on.
   */
  listen(port) {
    if (!this.server) {
      this.server = createServer((req, res) => this.handleMiddlewares(req, res, 0));
    }
    this.server.listen(port, () => console.log(`Server is listening on port ${port}`));
  }

  /**
   * Closes the HTTP server.
   */
  close() {
    if (this.server) {
      this.server.close();
    }
  }

  /**
   * Handles the middleware pipeline.
   * @param {http.IncomingMessage} req - The incoming HTTP request.
   * @param {http.ServerResponse} res - The outgoing HTTP response.
   * @param {number} index - The current middleware index.
   */
  async handleMiddlewares(req, res, index) {
    if (index < this.middlewares.length) {
      await this.middlewares[index](req, res, () => this.handleMiddlewares(req, res, index + 1));
    } else {
      this.handleRequest(req, res);
    }
  }
}

export default Rectify;