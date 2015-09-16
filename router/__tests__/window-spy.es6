import { spy } from 'sinon';

let originalFns = {};

export function windowSpy(win, ref, fnName) {
  const fn = win[fnName];

  if (typeof originalFns[ref] === 'undefined') {
    originalFns[ref] = {};
  }

  originalFns[ref][fnName] = fn;
  win[fnName] = spy(fn);
}

export function windowRestore(win, ref, fnName) {
  const fn = originalFns[ref][fnName];

  win[fnName] = fn;
}
