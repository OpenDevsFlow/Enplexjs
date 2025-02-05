
const zlib = require('node:zlib');

function compression(options = {}) {
  return function(req, res, next) {
    const acceptEncoding = req.headers['accept-encoding'] || '';
    
    if (acceptEncoding.includes('gzip')) {
      res.setHeader('Content-Encoding', 'gzip');
      const oldSend = res.send.bind(res);
      res.send = (data) => {
        zlib.gzip(data, (err, compressed) => {
          if (err) return oldSend(data);
          oldSend(compressed);
        });
      };
    } else if (acceptEncoding.includes('deflate')) {
      res.setHeader('Content-Encoding', 'deflate');
      const oldSend = res.send.bind(res);
      res.send = (data) => {
        zlib.deflate(data, (err, compressed) => {
          if (err) return oldSend(data);
          oldSend(compressed);
        });
      };
    }
    
    next();
  };
}

module.exports = compression;
