
class Request {
  constructor(req) {
    this.req = req;
    this.params = {};
    this.query = {};
    this.body = null;
  }

  get method() {
    return this.req.method;
  }

  get url() {
    return this.req.url;
  }

  get headers() {
    return this.req.headers;
  }

  async parseBody() {
    if (this.body) return this.body;

    const chunks = [];
    for await (const chunk of this.req) {
      chunks.push(chunk);
    }
    const rawBody = Buffer.concat(chunks).toString();

    if (this.headers['content-type'] === 'application/json') {
      try {
        this.body = JSON.parse(rawBody);
      } catch (e) {
        this.body = rawBody;
      }
    } else if (this.headers['content-type'] === 'application/x-www-form-urlencoded') {
      this.body = Object.fromEntries(new URLSearchParams(rawBody));
    } else {
      this.body = rawBody;
    }
    return this.body;
  }
}

module.exports = Request;
