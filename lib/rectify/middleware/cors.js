
function cors(options = {}) {
  const defaultOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
    exposedHeaders: '',
    credentials: false,
    maxAge: 86400
  };

  const opts = { ...defaultOptions, ...options };

  return function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', opts.origin);
    res.setHeader('Access-Control-Allow-Methods', opts.methods);
    res.setHeader('Access-Control-Allow-Headers', opts.allowedHeaders);
    
    if (opts.exposedHeaders) {
      res.setHeader('Access-Control-Expose-Headers', opts.exposedHeaders);
    }
    
    if (opts.credentials) {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    
    if (opts.maxAge) {
      res.setHeader('Access-Control-Max-Age', opts.maxAge);
    }

    if (req.method === 'OPTIONS') {
      res.setStatus(204);
      res.send();
      return;
    }

    next();
  };
}

module.exports = cors;
