
function cookieParser() {
  return (req, res, next) => {
    const cookies = {};
    const cookieHeader = req.headers.cookie;
    
    if (cookieHeader) {
      cookieHeader.split(';').forEach(cookie => {
        const parts = cookie.split('=');
        const key = parts[0].trim();
        const value = parts[1].trim();
        cookies[key] = decodeURIComponent(value);
      });
    }
    
    req.cookies = cookies;
    
    res.cookie = (name, value, options = {}) => {
      const cookieStr = `${name}=${encodeURIComponent(value)}`;
      const optionsStr = Object.entries(options)
        .map(([key, value]) => `; ${key}=${value}`)
        .join('');
      
      res.setHeader('Set-Cookie', cookieStr + optionsStr);
    };
    
    next();
  };
}

module.exports = cookieParser;
