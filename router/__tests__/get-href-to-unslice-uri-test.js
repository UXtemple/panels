import getHrefToUnsliceUri from '../get-href-to-unslice-uri';
import test from 'tape';

test('#getHrefToUnsliceUri', t => {
  t.equals(
    getHrefToUnsliceUri(
      {context: "http://panels.dev/", path: "/"},
      'http://panels.dev/)a'
    ),
    '../',
    'http://panels.dev/)a => ../'
  );

  t.equals(
    getHrefToUnsliceUri(
      {context: "http://panels.dev/(a)/", path: "/a"},
      'http://panels.dev/(a)/b'
    ),
    '../a',
    'http://panels.dev/(a)/b => ../a'
  );

  t.end();
});
