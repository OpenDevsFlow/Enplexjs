
const fs = require('fs').promises;
const path = require('path');

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

  async render(template, data = {}) {
    try {
      let content = await fs.readFile(path.join(process.cwd(), 'templates', template), 'utf8');
      
      // Simple template engine
      Object.entries(data).forEach(([key, value]) => {
        content = content.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), value);
      });
      
      this.setHeader('Content-Type', 'text/html');
      this.send(content);
    } catch (err) {
      this.setStatus(500);
      this.send('Template rendering error');
    }
  }
}

module.exports = Response;
