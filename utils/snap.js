import * as FUNCTIONS from './snap-functions';

function snap($el, to, scroll, { delay = 10, duration = 75, fn = 'easeOutCubic', step = 5 }) {
  let currentTime = 0;
  const next = FUNCTIONS[fn] || FUNCTIONS.easeOutCubic;
  const start = $el[scroll];
  const change = to - start;

  const animate = () => {
    currentTime += step;

    $el[scroll] = next(currentTime, start, change, duration);

    if (currentTime < duration) {
      requestAnimationFrame(animate);
    }
  };

  setTimeout(animate, delay);
}

export function snapY($el, to, options = {}) {
  snap($el, to, 'scrollTop', options);
}

export function snapX($el, to, options = {}) {
  snap($el, to, 'scrollLeft', options);
}
