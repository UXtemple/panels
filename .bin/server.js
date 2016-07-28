import { existsSync } from 'fs';
import http from 'http';
import send from 'send';

const base = `${process.cwd()}/playground`;
const common = [
  '/fetch.min.js',
  '/panels.js',
  '/panels-worker.js'
];

http.createServer((req, res) => {
  let file;

  if (common.includes(req.url)) {
    file = `${base}/${req.url}`;
  } else {
    file = `${base}/${req.headers.host}/${req.url}`;

    if (!existsSync(file)) {
      file = `${base}/${req.headers.host}/index.html`;
    }
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  send(req, file).pipe(res);
}).listen(80, '0.0.0.0');

console.log(
  `Panels dev server is up!
  Runtimes:
    - Trails: http://trails.panels.dev
    - Launchpad: http://launchpad.panels.dev`
);
