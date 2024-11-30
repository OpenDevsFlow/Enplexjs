class Request {
  constructor(req) {
    this.req = req;
    this.params = {};
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
    if (!this.body) {
      const chunks = [];
      for await (const chunk of this.req) {
        chunks.push(chunk);
      }
      this.body = Buffer.concat(chunks).toString();
    }
    return this.body;
  }
}

module.exports = Request;