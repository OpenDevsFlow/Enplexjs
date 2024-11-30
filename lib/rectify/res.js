class Response {
  constructor(res) {
    this.res = res;
  }

  setHeader(key, value) {
    this.res.setHeader(key, value);
  }

  setStatus(code) {
    this.res.statusCode = code;
  }

  send(data) {
    this.res.end(data);
  }

  json(data) {
    this.setHeader('Content-Type', 'application/json');
    this.send(JSON.stringify(data));
  }

  redirect(url) {
    this.setStatus(302);
    this.setHeader('Location', url);
    this.send();
  }
}

module.exports = Response;