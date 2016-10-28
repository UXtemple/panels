import parse from '../parse'

const fixtures = [{
  uri: 'https://UXtemple.com/',
  name: 'basic: one panel https://UXtemple.com/'
},{
  uri: 'https://UXtemple.com/panels',
  name: 'basic: many panels https://UXtemple.com/panels'
}, {
  uri: 'https://UXtemple.com/panels?stuff',
  name: 'basic: many panels https://UXtemple.com/panels discards query string'
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
  whitelist: [
    /^https?:\/\/((specificDomain\.com)\/[a-zA-Z0-9\-_]+)(\/.*)/
  ]
}, {
  uri: 'https://specificDomain.com/root/panel/https://UXtemple.com/otherPanel',
  name: 'routerWhitelist: one specific domain and panel and a standard domain with panel https://specificDomain.com/root/panel/https://UXtemple.com/otherPanel',
  whitelist: [
    /^https?:\/\/((specificDomain\.com)\/[a-zA-Z0-9\-_]+)(\/.*)/
  ]
}, {
  uri: 'http://app.domain.com/content/bar/baz/qux/quux/corge/grault/garply/http://app.domain.com/root/waldo/',
  name: 'routerWhitelist: two specific domains matched by different parsers and panel and a standard domain with panel http://app.domain.com/content/bar/baz/qux/quux/corge/grault/garply/http://app.domain.com/root/waldo/',
  whitelist: [
    /^https?:\/\/((.*domain.com)\/root\/[a-zA-Z0-9\-_]+)(\/.*)/,
    /^https?:\/\/((.*domain.com)\/content\/bar\/baz\/qux\/quux\/corge\/grault)(\/.*)/,
    /^https?:\/\/((root.dev)\/[a-zA-Z0-9\-_]+)(\/.*)/
  ]
}]

fixtures.forEach(f => {
  test(f.name, () => {
    expect(parse(f.uri, f.whitelist)).toMatchSnapshot()
  })
})
