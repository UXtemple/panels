import normaliseUri from '../index.js'

const fixtures = [{
  in: 'http://app.com/thing/..',
  out: 'http://app.com/'
}, {
  in: 'http://app.com/thing/../another',
  out: 'http://app.com/another/'
}, {
  in: 'http://app.com/thing/http://more.com/..',
  out: 'http://app.com/thing/'
}, {
  in: 'http://app.com/thing/http://more.com/stuff/..',
  out: 'http://app.com/thing/http://more.com/'
}, {
  in: 'http://app.com/thing/http://more.com/../that',
  out: 'http://app.com/thing/that/'
}]

fixtures.forEach(f => {
  test(`${f['in']} -> ${f.out}`, () => {
    expect(normaliseUri(f['in'])).toBe(f.out)
  })
})
