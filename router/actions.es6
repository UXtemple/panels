export const NAVIGATE = 'panels/router/NAVIGATE';
export function navigate(uri) {
  return {
    type: NAVIGATE,
    payload: {
      uri
    }
  };
}
