import parse from '../parse';
import test from 'tape';

const A = 'https://UXtemple.com/';
const Ae = {app: 'UXtemple.com', path: '/', uri: A, context: A};
const B = `${A}panels`;
const Be = {app: 'UXtemple.com', path: '/panels', uri: B, context: `${B}/`};
const Cu = 'https://usepanels.com/';
const C = `${A}${Cu}`;
const Ce = {app: 'usepanels.com', path: '/', uri: Cu, context: C};
const D = `${B}/https://usepanels.com/`;
const De = {app: 'usepanels.com', path: '/', uri: Cu, context: D};

test('#parse', t => {
  t.deepEquals(
    parse(A),
    [Ae],
    A
  );

  t.deepEquals(
    parse(B),
    [Ae, Be],
    B
  );

  t.deepEquals(
    parse(C),
    [Ae, Ce],
    C
  );

  t.deepEquals(
    parse(D),
    [Ae, Be, De],
    D
  );

  t.end();
});
