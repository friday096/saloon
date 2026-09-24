import http from 'http';
import fs from 'fs';
import path from 'path';
import os from 'os';

const ROOT = 'c:/autosait/atelier-volos';
const PORT = 8788;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
};

http
  .createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/' || p.endsWith('/')) p += 'index.html';
    const file = path.join(ROOT, p);
    if (!file.startsWith(path.resolve(ROOT))) {
      res.writeHead(403).end('403');
      return;
    }
    fs.readFile(file, (e, buf) => {
      if (e) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('404 — ' + p);
        return;
      }
      res.writeHead(200, {
        'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'no-cache',
      });
      res.end(buf);
    });
  })
  .listen(PORT, '0.0.0.0', () => {
    const nets = os.networkInterfaces();
    const lan = Object.values(nets)
      .flat()
      .filter((n) => n && n.family === 'IPv4' && !n.internal)
      .map((n) => n.address);
    console.log('Ателье волос — локальный сервер');
    console.log('  http://localhost:' + PORT);
    lan.forEach((a) => console.log('  http://' + a + ':' + PORT + '  (телефон в той же сети)'));
  });
