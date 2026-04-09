const http = require('http');
const fs = require('fs');
const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('log', () => {
  fs.appendFileSync('./data/log.txt', 'Event triggered\n');
});

http.createServer((req, res) => {
  // ✅ CÁCH MỚI – KHÔNG WARNING
  const myURL = new URL(req.url, `http://${req.headers.host}`);
  const pathname = myURL.pathname;

  // ===== CSS STATIC =====
  if (pathname.startsWith('/css/')) {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    return fs.createReadStream('./public' + pathname).pipe(res);
  }

  // ===== ROUTES =====
  if (pathname === '/') {
    return fs.createReadStream('./views/index.html').pipe(res);
  }

  if (pathname === '/events') {
    return fs.createReadStream('./views/events.html').pipe(res);
  }

  if (pathname === '/event') {
    emitter.emit('log');
    return res.end('Event logged');
  }

  if (pathname === '/request') {
    const data = `
URL: ${req.url}
Method: ${req.method}
Headers:
${JSON.stringify(req.headers, null, 2)}
`;
    let html = fs.readFileSync('./views/request.html', 'utf8');
    html = html.replace('{{DATA}}', data);
    return res.end(html);
  }

  if (pathname === '/streams') {
    return fs.createReadStream('./views/streams.html').pipe(res);
  }

  if (pathname === '/json') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ subject: 'NodeJS', practice: 6 }));
  }

  // ===== 404 =====
  res.writeHead(404);
  res.end('Not Found');
}).listen(3000);

console.log('Server running at http://localhost:3000');