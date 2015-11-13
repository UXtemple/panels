import parse from '../parse';
import test from 'tape';

test('#parse', t => {
  t.deepEquals(
    parse('https://UXtemple.com/'), [
      {app: 'UXtemple.com', path: '/', context: 'https://UXtemple.com/', visible: true}
    ],
    'basic: one panel https://UXtemple.com/'
  );

  t.deepEquals(
    parse('https://UXtemple.com/panels'), [
      {app: 'UXtemple.com', path: '/', context: 'https://UXtemple.com/', visible: true},
      {app: 'UXtemple.com', path: '/panels', context: 'https://UXtemple.com/panels/', visible: true}
    ],
    'basic: many panels https://UXtemple.com/panels'
  );

  t.deepEquals(
    parse('https://UXtemple.com/panels/../back'), [
      {app: 'UXtemple.com', path: '/', context: 'https://UXtemple.com/', visible: true},
      {app: 'UXtemple.com', path: '/back', context: 'https://UXtemple.com/back/', visible: true}
    ],
    'basic: backwards panels https://UXtemple.com/panels/../back'
  );

  t.deepEquals(
    parse('https://UXtemple.com/https://usepanels.com/'), [
      {app: 'UXtemple.com', path: '/', context: 'https://UXtemple.com/', visible: true},
      {app: 'usepanels.com', path: '/', context: 'https://UXtemple.com/https://usepanels.com/', visible: true}
    ],
    'teleport: basic https://UXtemple.com/https://usepanels.com/'
  );

  t.deepEquals(
    parse('https://UXtemple.com/)panels'), [
      {app: 'UXtemple.com', path: '/', context: 'https://UXtemple.com/', visible: false},
      {app: 'UXtemple.com', path: '/panels', context: 'https://UXtemple.com/)panels/', visible: true}
    ],
    'teleport: slice the root https://UXtemple.com/)panels'
  );

  t.deepEquals(
    parse('https://UXtemple.com/panels)'), [
      {app: 'UXtemple.com', path: '/', context: 'https://UXtemple.com/', visible: false},
      {app: 'UXtemple.com', path: '/panels', context: 'https://UXtemple.com/panels)/', visible: false}
    ],
    'teleport: slice all panels https://UXtemple.com/(panels) i.e., hidden gems :)?'
  );

  t.deepEquals(
    parse('https://UXtemple.com/(panels)'), [
      {app: 'UXtemple.com', path: '/', context: 'https://UXtemple.com/', visible: true},
      {app: 'UXtemple.com', path: '/panels', context: 'https://UXtemple.com/(panels)/', visible: false}
    ],
    'teleport: slice final panel https://UXtemple.com/(panels) i.e., hidden gems :)?'
  );

  t.deepEquals(
    parse('https://UXtemple.com/(panels/use)'), [
      {app: 'UXtemple.com', path: '/', context: 'https://UXtemple.com/', visible: true},
      {app: 'UXtemple.com', path: '/panels', context: 'https://UXtemple.com/(panels/', visible: false},
      {app: 'UXtemple.com', path: '/panels/use', context: 'https://UXtemple.com/(panels/use)/', visible: false}
    ],
    'teleport: slice multiple panels https://UXtemple.com/(panels/use)'
  );

  t.deepEquals(
    parse('https://UXtemple.com/(panels)/use'), [
      {app: 'UXtemple.com', path: '/', context: 'https://UXtemple.com/', visible: true},
      {app: 'UXtemple.com', path: '/panels', context: 'https://UXtemple.com/(panels)/', visible: false},
      {app: 'UXtemple.com', path: '/panels/use', context: 'https://UXtemple.com/(panels)/use/', visible: true}
    ],
    'teleport: slice in between https://UXtemple.com/(panels)/use'
  );

  t.deepEquals(
    parse('https://UXtemple.com/(panels)/use/(new)'), [
      {app: 'UXtemple.com', path: '/', context: 'https://UXtemple.com/', visible: true},
      {app: 'UXtemple.com', path: '/panels', context: 'https://UXtemple.com/(panels)/', visible: false},
      {app: 'UXtemple.com', path: '/panels/use', context: 'https://UXtemple.com/(panels)/use/', visible: true},
      {app: 'UXtemple.com', path: '/panels/use/new', context: 'https://UXtemple.com/(panels)/use/(new)/', visible: false}
    ],
    'teleport: slice some parts https://UXtemple.com/(panels)/use/(new)'
  );

  t.deepEquals(
    parse('https://UXtemple.com/panels)/use/https://usepanels.com/UXtemple'), [
      {app: 'UXtemple.com', path: '/', context: 'https://UXtemple.com/', visible: false},
      {app: 'UXtemple.com', path: '/panels', context: 'https://UXtemple.com/panels)/', visible: false},
      {app: 'UXtemple.com', path: '/panels/use', context: 'https://UXtemple.com/panels)/use/', visible: true},
      {app: 'usepanels.com', path: '/', context: 'https://UXtemple.com/panels)/use/https://usepanels.com/', visible: true},
      {app: 'usepanels.com', path: '/UXtemple', context: 'https://UXtemple.com/panels)/use/https://usepanels.com/UXtemple/', visible: true},
    ],
    'teleport: slice one app only https://UXtemple.com/panels)/use/https://usepanels.com/UXtemple'
  );

  t.deepEquals(
    parse('https://UXtemple.com/panels)/use/https://usepanels.com/)UXtemple'), [
      {app: 'UXtemple.com', path: '/', context: 'https://UXtemple.com/', visible: false},
      {app: 'UXtemple.com', path: '/panels', context: 'https://UXtemple.com/panels)/', visible: false},
      {app: 'UXtemple.com', path: '/panels/use', context: 'https://UXtemple.com/panels)/use/', visible: true},
      {app: 'usepanels.com', path: '/', context: 'https://UXtemple.com/panels)/use/https://usepanels.com/', visible: false},
      {app: 'usepanels.com', path: '/UXtemple', context: 'https://UXtemple.com/panels)/use/https://usepanels.com/)UXtemple/', visible: true},
    ],
    'teleport: slice many apps https://UXtemple.com/panels)/use/https://usepanels.com/)UXtemple'
  );

  t.end();
});
