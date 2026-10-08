import http from 'node:http';
import { readFile } from 'node:fs/promises';
const files = new Map([
  ['/zeppelin.js', ['zeppelin.js', 'text/javascript; charset=utf-8']],
  ['/assets/zeppelin.png', ['assets/zeppelin.png', 'image/png']],
  ['/menu.js', ['menu.js', 'text/javascript; charset=utf-8']],
  ['/assets/sunflower-logo.png', ['assets/sunflower-logo.png', 'image/png']],
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
  ['/assets/castle-desktop.png', ['assets/castle-desktop.png', 'image/png']],
  ['/assets/castle-mobile.png', ['assets/castle-mobile.png', 'image/png']],
]);
const server = http.createServer(async (req, res) => {
  const entry = files.get(new URL(req.url, 'http://localhost').pathname);
  if (!entry) { res.writeHead(404); res.end('Not found'); return; }
  try {
    const body = await readFile(new URL(entry[0], import.meta.url));
    res.writeHead(200, { 'Content-Type': entry[1] }); res.end(body);
  } catch { res.writeHead(500); res.end('Unable to load file'); }
});
server.listen(4173, '127.0.0.1', () => console.log('Preview: http://127.0.0.1:4173'));
