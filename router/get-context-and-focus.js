export default function getContextAndFocus({ currentFocus, next, last, uri }) {
  // focus works in relation to the currentFocus, so try to do what the user wants
  let focus = currentFocus + next.focus;
  if (focus < 0 || focus > last) {
    // however, they may go out of boundaries; in such cases we default to the last route
    focus = last;
  }

  // context works in relation to the new focus, so try to do what the user wants,
  // it tells how many panels we should preferably show before the focus.
  // we say preferably because it might be the case that it isn't possible to fit them all in the
  // current viewport
  let context = 0;
  if (typeof next.context === 'number') {
    context = focus - next.context;

    if (context < 0 || context > focus) {
      // if the value is out of boundaries, default to showing all
      context = 0;
    }
  }

  return {
    context,
    focus
  };
}
