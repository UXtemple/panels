import { after, last, panels } from '../getters';
import assert from 'assert';
import eq from 'lodash/lang/eq';
import i from 'seamless-immutable';

const R1 = {
  uri: '/',
  context: '/'
};
const R2 = {
  uri: '/2',
  context: '/2'
};
const R3 = {
  uri: '/3',
  context: '/3'
};
const state = i({
  panels: [R1, R2, R3]
});

describe('getters', () => {
  it('#after', () => assert(eq(after(state, '/'), R2)));
  it('#last', () => assert(eq(last(state), R3)));
  // it('#panels', () => assert(eq(panels(state), state.panels.asMutable())));
});
