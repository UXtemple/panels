import parse from '../parse'

const whitelist = [/^https?:\/\/((specificDomain\.com)\/[a-zA-Z0-9\-\_]+)(\/.*)/]

const fixtures = [{
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
}, {
  uri: 'https://specificDomain.com/root/https://UXtemple.com/',
  name: 'routerWhitelist: one specific domain and a standard domain https://specificDomain.com/root/https://UXtemple.com/',
  whitelist
},{
  uri: 'https://specificDomain.com/root/panelhttps://UXtemple.com/otherPanel',
  name: 'routerWhitelist: one specific domain and panel and a standard domain with panel https://specificDomain.com/root/panelhttps://UXtemple.com/otherPanel',
  whitelist
}]

fixtures.forEach(f => {
  test(f.name, () => {
    expect(parse(f.uri, f.whitelist)).toMatchSnapshot()
  })
})
