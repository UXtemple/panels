import { NAVIGATE } from '../actions';
import assert from 'assert';
import eq from 'lodash/lang/eq';
import proxyquire from 'proxyquire';
proxyquire.noCallThru();

const parseMock = (uri) => [{uri, context: uri}];
const reducer = proxyquire('../reducer', {'./parse': parseMock});
const URI = '/';

describe('reducer', () => {
  it('handles NAVIGATE', () => {
    const newState = reducer(undefined, {type: NAVIGATE, payload: {uri: URI}});
    assert(newState.uri === URI, 'has uri');
    assert(Array.isArray(newState.panels), 'has an array of panels');
    assert(eq(newState.panels, parseMock(URI)), 'has the parsed list of panels on that array');
  });
});
