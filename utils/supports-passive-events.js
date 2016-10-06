let supports = false
try {
  const opts = Object.defineProperty({}, 'passive', {
    get() {
      supports = true
    }
  })
  window.addEventListener('test', null, opts)
} catch (e) {}

export default supports
