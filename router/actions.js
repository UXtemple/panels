import normaliseUri from 'panels-normalise-uri';

export const NAVIGATE = 'panels/router/NAVIGATE';
export function navigate(uri) {
  return {
    type: NAVIGATE,
    payload: {
      uri: normaliseUri(uri)
    }
  };
}

export const SHOW = 'panels/router/SHOW';
export function show(route) {
  return {
    type: SHOW,
    payload: route
  };
}
