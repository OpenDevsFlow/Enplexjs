
const rateLimit = (options = {}) => {
  const defaultOptions = {
    windowMs: 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per windowMs
  };

  const opts = { ...defaultOptions, ...options };
  const requests = new Map();

  return (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const now = Date.now();
    
    if (!requests.has(ip)) {
      requests.set(ip, []);
    }
    
    const userRequests = requests.get(ip);
    const windowStart = now - opts.windowMs;
    
    // Remove old requests
    while (userRequests.length && userRequests[0] < windowStart) {
      userRequests.shift();
    }
    
    if (userRequests.length >= opts.max) {
      res.setStatus(429);
      res.json({ error: 'Too many requests' });
      return;
    }
    
    userRequests.push(now);
    next();
  };
};

module.exports = rateLimit;
