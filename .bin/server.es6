#!/usr/bin/env babel-node

import createServer from '../server';

const LISTEN = process.env.LISTEN || 3000;
const PUBLIC = process.env.PUBLIC || `${__dirname}/../dist`;

const server = createServer({
  publicRoot: PUBLIC
});

server.listen(LISTEN);

const at = typeof parseInt(LISTEN, 10) === 'number' ? `http://0.0.0.0/${LISTEN}` : LISTEN;
console.log(`panels-server is ready at ${at}`);
