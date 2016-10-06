import { existsSync } from 'fs';
import http from 'http';
import send from 'send';

const base = `${process.cwd()}/playground`;
const common = [
  '/panels.js'
];

http.createServer((req, res) => {
  let file;

  if (common.includes(req.url)) {
    file = `${base}/${req.url}`;
  } else {
    let appBase = `${base}/${req.headers.host}`
    let path = req.url

    if (req.headers.host === 'custom-parser.panels.dev') {
      appBase = `${appBase}/app`
      path = path.replace(/^\/app/, '')
    }
    file = `${appBase}${path}`;

    console.log('file', file)

    if (!existsSync(file)) {
      file = `${appBase}/index.html`;
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
    - Launchpad: http://launchpad.panels.dev
  Tests:
  - Custom parser: http://custom-parser.panels.dev/app
`);
