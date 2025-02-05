
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

function multipart(options = {}) {
  const defaultOptions = {
    uploadDir: os.tmpdir(),
    maxFileSize: 5 * 1024 * 1024 // 5MB
  };

  const opts = { ...defaultOptions, ...options };

  return async (req, res, next) => {
    if (!req.headers['content-type']?.includes('multipart/form-data')) {
      return next();
    }

    const boundary = req.headers['content-type'].split('boundary=')[1];
    const parts = [];
    let currentPart = null;
    let buffer = Buffer.alloc(0);

    for await (const chunk of req.req) {
      buffer = Buffer.concat([buffer, chunk]);
      
      while (buffer.includes(boundary)) {
        const boundaryIndex = buffer.indexOf(boundary);
        
        if (currentPart) {
          const partData = buffer.slice(0, boundaryIndex - 4); // Remove trailing \r\n--
          await processPart(currentPart, partData, opts);
          parts.push(currentPart);
        }
        
        buffer = buffer.slice(boundaryIndex + boundary.length + 2);
        currentPart = parseHeaders(buffer);
        
        if (currentPart) {
          const headerEnd = buffer.indexOf('\r\n\r\n');
          buffer = buffer.slice(headerEnd + 4);
        }
      }
    }

    req.files = parts.filter(p => p.filename).reduce((acc, p) => {
      acc[p.fieldname] = {
        filename: p.filename,
        path: p.path,
        size: p.size
      };
      return acc;
    }, {});

    next();
  };
}

function parseHeaders(buffer) {
  const headerStr = buffer.toString('utf8', 0, buffer.indexOf('\r\n\r\n'));
  const headers = headerStr.split('\r\n');
  const contentDisposition = headers.find(h => h.toLowerCase().startsWith('content-disposition'));
  
  if (!contentDisposition) return null;
  
  const part = {};
  const matches = contentDisposition.match(/name="([^"]+)"/);
  if (matches) part.fieldname = matches[1];
  
  const filenameMatches = contentDisposition.match(/filename="([^"]+)"/);
  if (filenameMatches) part.filename = filenameMatches[1];
  
  return part;
}

async function processPart(part, data, options) {
  if (!part.filename) return;
  
  if (data.length > options.maxFileSize) {
    throw new Error('File too large');
  }
  
  const tmpPath = path.join(options.uploadDir, `${crypto.randomBytes(16).toString('hex')}`);
  await fs.promises.writeFile(tmpPath, data);
  
  part.path = tmpPath;
  part.size = data.length;
}

module.exports = multipart;
