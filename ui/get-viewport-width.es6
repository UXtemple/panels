import canUseDOM from 'can-use-dom';

export default function getViewportWidth() {
  return canUseDOM ? Math.max(window.document.documentElement.clientWidth, window.innerWidth || 0) : 0;
}
