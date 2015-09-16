export const NAVIGATE = 'ROUTER:NAVIGATE';
export function navigate(uri) {
  return {
    type: NAVIGATE,
    payload: {
      uri
    }
  };
}
