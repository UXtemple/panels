export default function getViewportWidth() {
  return Math.max(window.document.documentElement.clientWidth, window.innerWidth || 0);
}
