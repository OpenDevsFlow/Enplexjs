class Route {
  constructor(method, path, handler) {
    this.method = method;
    this.path = path;
    this.handler = handler;
    this.regexp = new RegExp(`^${path.replace(/:[^\s/]+/g, "([^/]+)")}$`);
  }

  matches(url) {
    return this.regexp.test(url);
  }

  extractParams(url) {
    const match = url.match(this.regexp);
    if (match) {
      const params = {};
      const keys = (this.path.match(/:[^\s/]+/g) || []).map((param) =>
        param.substring(1),
      );
      keys.forEach((key, index) => {
        params[key] = match[index + 1];
      });
      return params;
    }
    return null;
  }
}

module.exports = Route;