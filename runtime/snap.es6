import easeOutCubic from './ease-out-cubic';

const DURATION = 75;
const STEP = 5;

export default function snap($el, to) {
  const start = $el.scrollLeft;
  const change = to - start;
  let currentTime = 0;

  function animate() {
    currentTime += STEP;

    $el.scrollLeft = easeOutCubic(currentTime, start, change, DURATION);

    if (currentTime < DURATION) {
      requestAnimationFrame(animate);
    }
  };

  animate();
}
