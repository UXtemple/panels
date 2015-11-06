import parse from '../parse';
import test from 'tape';

// TODO double check, do we still need to store uri?

test('#parse', t => {
  t.deepEquals(
    parse('https://UXtemple.com/'), [
      {app: 'UXtemple.com', path: '/', uri: 'https://UXtemple.com/', context: 'https://UXtemple.com/', visible: true}
    ],
    'basic: one panel https://UXtemple.com/'
  );

  t.deepEquals(
    parse('https://UXtemple.com/panels'), [
      {app: 'UXtemple.com', path: '/', uri: 'https://UXtemple.com/', context: 'https://UXtemple.com/', visible: true},
      {app: 'UXtemple.com', path: '/panels', uri: 'https://UXtemple.com/panels', context: 'https://UXtemple.com/panels/', visible: true}
    ],
    'basic: many panels https://UXtemple.com/panels'
  );

  t.deepEquals(
    parse('https://UXtemple.com/https://usepanels.com/'), [
      {app: 'UXtemple.com', path: '/', uri: 'https://UXtemple.com/', context: 'https://UXtemple.com/', visible: true},
      {app: 'usepanels.com', path: '/', uri: 'https://usepanels.com/', context: 'https://UXtemple.com/https://usepanels.com/', visible: true}
    ],
    'teleport: basic https://UXtemple.com/https://usepanels.com/'
  );

  t.deepEquals(
    parse('https://UXtemple.com/(panels)'), [
      {app: 'UXtemple.com', path: '/', uri: 'https://UXtemple.com', context: 'https://UXtemple.com/', visible: true},
      {app: 'UXtemple.com', path: '/panels', uri: 'https://UXtemple.com/(panels)', context: 'https://UXtemple.com/(panels)/', visible: false}
    ],
    'teleport: slice final panel https://UXtemple.com/(panels)'
  );

  // t.deepEquals(
  //   parse('https://UXtemple.com/(panels/use)'), [
  //     {app: 'UXtemple.com', path: '/', uri: A, context: A, visible: true},
  //     {app: 'UXtemple.com', path: '/panels', uri: B, context: 'https://UXtemple.com/(panels)', visible: false},
  //     {app: 'UXtemple.com', path: '/panels/use', uri: B, context: 'https://UXtemple.com/(panels/use)', visible: false}
  //   ],
  //   'slice multiple'
  // );

  // t.deepEquals(
  //   parse('https://UXtemple.com/(panels)/use'), [
  //     {app: 'UXtemple.com', path: '/', uri: A, context: A, visible: true},
  //     {app: 'UXtemple.com', path: '/panels', uri: B, context: 'https://UXtemple.com/(panels)', visible: false},
  //     {app: 'UXtemple.com', path: '/panels/use', uri: B, context: 'https://UXtemple.com/(panels)/use', visible: true}
  //   ],
  //   'slice in between'
  // );

  // t.deepEquals(
  //   parse('https://UXtemple.com/panels(/at)'),
  //   [],
  //   'slice full forward cut, i.e., hidden gems?'
  // );

  // t.deepEquals(
  //   parse('https://UXtemple.com(/panels)/at/https://usepanels.com/UXtemple'),
  //   [],
  //   'slice on one app with multiple apps'
  // );

  // t.deepEquals(
  //   parse('https://UXtemple.com(/panels)/at/https://usepanels.com(/)UXtemple'),
  //   [],
  //   'slice many apps'
  // );

  t.end();
});
