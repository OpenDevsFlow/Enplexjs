const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const { createServer } = require("http");

/**
 * @class rectify
 * @description Class to build web servers.
 * @example
 * ```javascript
 * const rectify = require('enplexjs').rectify;
 *
 * const server = new rectify();
 *
 * // Define a route handler for the GET method at the '/' path
 * server.route('GET', '/', (req, res) => {
 *   res.setHeader('Content-Type', 'text/plain');
 *   res.end('Hello from Rectify!');
 * });
 *
 * // Define a route handler for the POST method at the '/post' path
 * server.route('POST', '/post', (req, res) => {
 *   let body = '';
 *   req.on('data', chunk => {
 *     body += chunk.toString();
 *   });
 *   req.on('end', () => {
 *     res.setHeader('Content-Type', 'text/plain');
 *     res.end(`You posted: ${body}`);
 *   });
 * });
 *
 * // Serve static files from the 'public' directory
 * server.serveStatic('public');
 *
 * // Start the server on port 3000
 * server.listen(3000);
 * ```
 */
class rectify {
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
   * @example
   * ```javascript
   * // Define a route handler for the GET method at the '/' path
   * server.route('GET', '/', (req, res) => {
   *   res.setHeader('Content-Type', 'text/plain');
   *   res.end('Hello from Rectify!');
   * });
   * ```
   */
  route(method, path, handler) {
    this.routes[method][path] = handler;
  }

  /**
   * Adds a middleware function to the middleware pipeline.
   * @param {function} middleware - The middleware function.
   * @example
   * ```javascript
   * // Add a middleware function to log incoming requests
   * server.use((req, res, next) => {
   *   console.log(`Incoming request: ${req.method} ${req.url}`);
   *   next();
   * });
   * ```
   */
  use(middleware) {
    this.middlewares.push(middleware);
  }

  /**
   * Adds an error handler function to the error handling pipeline.
   * @param {function} handler - The error handler function.
   * @example
   * ```javascript
   * // Add an error handler to handle 404 errors
   * server.useErrorHandler((err, req, res) => {
   *   if (err.statusCode === 404) {
   *     res.statusCode = 404;
   *     res.setHeader('Content-Type', 'text/plain');
   *     res.end('Not Found');
   *   } else {
   *     next(err);
   *   }
   * });
   * ```
   */
  useErrorHandler(handler) {
    this.errorHandlers.push(handler);
  }

  /**
   * Sets a not found handler function.
   * @param {function} handler - The not found handler function.
   * @example
   * ```javascript
   * // Set a not found handler
   * server.useNotFoundHandler((req, res) => {
   *   res.statusCode = 404;
   *   res.setHeader('Content-Type', 'text/plain');
   *   res.end('Not Found');
   * });
   * ```
   */
  useNotFoundHandler(handler) {
    this.notFoundHandler = handler;
  }

  /**
   * Handles an incoming HTTP request.
   * @param {http.IncomingMessage} req - The incoming HTTP request.
   * @param {http.ServerResponse} res - The outgoing HTTP response.
   * @private
   */
  async handleRequest(req, res) {
    req,
      res,
      async () => {
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
      };
  }

  /**
   * Finds the appropriate route handler for a given HTTP method and URL.
   * @param {string} method - The HTTP method.
   * @param {string} url - The URL path.
   * @param {http.IncomingMessage} req - The incoming HTTP request.
   * @returns {function|null} - The route handler function, or null if not found.
   * @private
   */
  findRouteHandler(method, url, req) {
    const routes = this.routes[method] || {};
    for (const path in routes) {
      const re = new RegExp(`^${path.replace(/:[^\s/]+/g, "([^/]+)")}$`);
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
   * @private
   */
  extractParams(path, match) {
    const params = {};
    const keys = (path.match(/:[^\s/]+/g) || []).map((param) =>
      param.substring(1),
    );
    keys.forEach((key, index) => {
      params[key] = match[index + 1];
    });
    return params;
  }

  /**
   * Serves static files from a specified directory.
   * @param {string} dir - The directory path.
   * @example
   * ```javascript
   * // Serve static files from the 'public' directory
   * server.serveStatic('public');
   * ```
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
   * @private
   */
  handleError(err, req, res) {
    console.error(err);
    for (const handler of this.errorHandlers) {
      try {
        handler(err, req, res);
        return;
      } catch (e) {
        console.error("Error handling error:", e);
      }
    }

    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end("Internal Server Error");
  }

  /**
   * Handles requests that don't match any defined routes.
   * @param {http.IncomingMessage} req - The incoming HTTP request.
   * @param {http.ServerResponse} res - The outgoing HTTP response.
   * @private
   */
  handleNotFound(req, res) {
    if (this.notFoundHandler) {
      try {
        this.notFoundHandler(req, res);
      } catch (e) {
        console.error("Error handling not found:", e);
      }
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("Not Found");
    }
  }

  /**
   * Starts the HTTP server.
   * @param {number} port - The port number to listen on.
   * @example
   * ```javascript
   * // Start the server on port 3000
   * server.listen(3000);
   * ```
   */
  listen(port) {
    if (!this.server) {
      this.server = createServer((req, res) =>
        this.handleMiddlewares(req, res, 0),
      );
    }
    this.server.listen(port, () =>
      console.log(`Server is listening on port ${port}`),
    );
  }

  /**
   * Closes the HTTP server.
   * @example
   * ```javascript
   * // Close the server
   * server.close();
   * ```
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
   * @private
   */
  async handleMiddlewares(req, res, index) {
    if (index < this.middlewares.length) {
      await this.middlewares[index](req, res, () =>
        this.handleMiddlewares(req, res, index + 1),
      );
    } else {
      this.handleRequest(req, res);
    }
  }
}

module.exports = rectify;
