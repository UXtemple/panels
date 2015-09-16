import assert from 'assert';
import eq from 'lodash/lang/eq';
import parse from '../parse';

const A = 'https://UXtemple.com/';
const Ae = {uri: A, context: A};
const B = `${A}panels`;
const Be = {uri: B, context: `${B}/`};
const Cu = 'https://usepanels.com/';
const C = `${A}${Cu}`;
const Ce = {uri: Cu, context: C};
const D = `${B}/https://usepanels.com/`;
const De = {uri: Cu, context: D};

describe('#parse', function() {
  it(`${A}`, () => assert(eq(parse(A), [Ae])));
  it(`${B}`, () => assert(eq(parse(B), [Ae, Be])));
  it(`${C}`, () => assert(eq(parse(C), [Ae, Ce])));
  it(`${D}`, () => assert(eq(parse(D), [Ae, Be, De])));
});
