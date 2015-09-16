// TODO Replace with react-motion once its core has settled
import { FRAME_RATE, updateCurrV, updateCurrVals } from './utils';

export default function animate({currV, currVals, now}, {endValue, justStarted}) {
  endValue = typeof endValue === 'function' ? endValue(currVals) : endValue;

  const currentTime = Date.now();
  const frameRate = now && !justStarted ? (currentTime - now) / 1000 : FRAME_RATE;

  return {
    currV: updateCurrV(frameRate, currVals, currV, endValue),
    currVals: updateCurrVals(frameRate, currVals, currV, endValue),
    now: currentTime
  };
}
