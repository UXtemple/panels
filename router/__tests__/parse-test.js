import normaliseUri from 'panels-normalise-uri';
import parse from '../parse';
import test from 'tape';
import util from 'util';

const specificRegex = /^https?:\/\/((specificDomain\.com)\/[a-zA-Z0-9\-\_]+)(\/.*)/;
const cases = [{
  uri: 'https://UXtemple.com/',
  name: 'basic: one panel https://UXtemple.com/'
},{
  uri: 'https://UXtemple.com/panels',
  name: 'basic: many panels https://UXtemple.com/panels'
}, {
  uri: 'https://UXtemple.com/panels/../back',
  name: 'basic: backwards panels https://UXtemple.com/panels/../back'
}, {
  uri: 'https://UXtemple.com/https://usepanels.com/',
  name: 'teleport: basic https://UXtemple.com/https://usepanels.com/'
}, {
  uri: 'https://UXtemple.com/)panels',
  name: 'teleport: slice the root https://UXtemple.com/)panels'
}, {
  uri: 'https://UXtemple.com/(panels)',
  name: 'teleport: slice all panels https://UXtemple.com/(panels) i.e., hidden gems :)?'
}, {
  uri: 'https://UXtemple.com/(panels/use)',
  name: 'teleport: slice multiple panels https://UXtemple.com/(panels/use)'
}, {
  uri: 'https://UXtemple.com/(panels)/use',
  name: 'teleport: slice in between https://UXtemple.com/(panels)/use'
}, {
  uri: 'https://UXtemple.com/(panels)/use/(new)',
  name: 'teleport: slice some parts https://UXtemple.com/(panels)/use/(new)'
}, {
  uri: 'https://UXtemple.com/panels)/use/https://usepanels.com/UXtemple',
  name: 'teleport: slice one app only https://UXtemple.com/panels)/use/https://usepanels.com/UXtemple'
},
{
  uri: 'https://UXtemple.com/panels)/use/https://usepanels.com/)UXtemple',
  name: 'teleport: slice many apps https://UXtemple.com/panels)/use/https://usepanels.com/)UXtemple'
}, {
  uri: 'https://UXtemple.com/panels/https://usepanels.com/..',
  name: 'teleport: backwards panels https://UXtemple.com/panels/https://usepanels.com/..'
},{
  uri: 'https://specificDomain.com/root/',
  name: 'routerWhitelist: one panel https://specificDomain.com/root/',
  whitelist: [
    specificRegex
  ]
},{
  uri: 'https://specificDomain.com/root/panel/',
  name: 'routerWhitelist: more panels https://specificDomain.com/root/panel/',
  whitelist: [
    specificRegex
  ]
}]


test('#parse', t => {
  cases.forEach(c => {
    console.log(`${c.name} \n ${util.inspect(parse(c.uri, c.whitelist), false, null)}\n`);
  });

  t.end();
});
