const http = require('http');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());

// Set up middleware to serve static files
app.use(express.static('public'));
// app.use('/static', express.static(path.join(__dirname, 'public')));

// To serve Bootstrap static files
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap-icons/font/bootstrap-icons.min.css'));
app.use('/woff2', express.static(__dirname + '/node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2'));

// MIME types
function getContentType(ext) {
  switch (ext) {
    case '.html': return 'text/html';
    case '.css': return 'text/css';
    case '.js': return 'application/javascript';
    case '.png': return 'image/png';
    case '.jpg': return 'image/jpeg';
    case '.svg': return 'image/svg+xml';
    case '.woff': return 'font/woff';
    case '.woff2': return 'font/woff2';
    default: return 'text/plain';
  }
}

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  let ext = path.extname(filePath);

  // Check for file path security
  if (filePath.includes('..')) {
    res.writeHead(400);
    res.end('invalid request');
    return;
  }

  // Path to access files in node_modules
  if (filePath.includes('/node_modules/')) {
    filePath = path.join(__dirname, filePath);
  } else {
    filePath = path.join(__dirname, 'public', filePath);
  }

  // Read file and reply
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Show 404 page if file not found
        fs.readFile(path.join(__dirname, 'public', '404.html'), (error, data) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(data, 'utf-8');
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end('Server error: ' + err.code);
      }
    } else {
      // Successful response
      res.writeHead(200, { 'Content-Type': getContentType(ext) });
      res.end(content, 'utf-8');
    }
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`The server is running on port ${port}.`);
});