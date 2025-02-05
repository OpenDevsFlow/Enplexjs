
const querystring = require('node:querystring');

async function bodyParser(req, res, next) {
  if (req.method !== 'POST' && req.method !== 'PUT' && req.method !== 'PATCH') {
    return next();
  }

  const contentType = req.headers['content-type'];
  const chunks = [];
  
  for await (const chunk of req.req) {
    chunks.push(chunk);
  }
  
  const rawBody = Buffer.concat(chunks).toString();

  if (contentType?.includes('application/json')) {
    try {
      req.body = JSON.parse(rawBody);
    } catch (e) {
      req.body = {};
    }
  } else if (contentType?.includes('application/x-www-form-urlencoded')) {
    req.body = querystring.parse(rawBody);
  } else {
    req.body = rawBody;
  }
  
  next();
}

module.exports = bodyParser;
