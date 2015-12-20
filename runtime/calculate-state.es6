import getHalves from './get-halves';
import getWidth from './get-width';
import getRegions from './get-regions';
import getWidths from './get-widths';

export const MOBILE_THRESHOLD = 720;

export default function calculateState(viewportWidth, panelsWidths, preferredSnapPoint) {
  const shouldGoMobile = viewportWidth < MOBILE_THRESHOLD;
  const widths = getWidths(panelsWidths, shouldGoMobile, viewportWidth);
  const halves = getHalves(widths);
  const regions = getRegions(widths, halves);
  const snapPoint = shouldGoMobile ? 0 : preferredSnapPoint;

  return {
    regions,
    shouldGoMobile,
    snapPoint,
    viewportWidth,
    width: getWidth(viewportWidth, snapPoint, widths),
    widths
  };
}
