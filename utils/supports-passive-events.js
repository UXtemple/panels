let supports = false;

try {
  const opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supports = true;
    }
  });
  window.addEventListener('test', null, opts);
} catch (e) {}

export default supports;
