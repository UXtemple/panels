import { NAVIGATE } from '../actions';
import test from 'tape';
import proxyquire from 'proxyquire';
proxyquire.noCallThru();

const parseMock = (uri) => [{uri, context: uri}];
const reducer = proxyquire('../reducer', {'./parse': parseMock});
const URI = '/';

test('#reducer', t => {
  t.deepEquals(
    reducer(undefined, {type: NAVIGATE, payload: {uri: URI}}),
    {
      uri: URI,
      routes: parseMock(URI)
    },
    'handles NAVIGATE'
  )
  t.end();
});
