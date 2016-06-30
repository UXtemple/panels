export default function getNextPosition({ context, focus, maxFullPanelWidth, routes, panels, shouldGoMobile, viewportWidth }) {
  console.time('getNextPosition');
  let nextRoutesByContext = routes.byContext;

  const widths = routes.items.map(routeContext => {
    const route = routes.byContext[routeContext];
    const panel = panels.byId[route.panelId];

    let width;
    if (route.isVisible) {
      if (shouldGoMobile) {
        width = viewportWidth;
      } else {
        width = route.isExpanded ? panel.maxWidth : panel.width;

        const percentageMatch = typeof width === 'string' && width.match(/([0-9]+)%/);
        if (percentageMatch) {
          width = maxFullPanelWidth * parseInt(percentageMatch, 10) / 100;
        }
      }
    } else {
      width = 0;
    }

    if (width !== route.width) {
      nextRoutesByContext = {
        ...nextRoutesByContext,
        [routeContext]: {
          ...route,
          width
        }
      };
    }

    return width;
  });

  // get how large our focus panel is
  const focusWidth = widths[focus]; // >> 500
  // get the focus panel's x real position in our runtime if it were flat
  let x = widths.slice(0, focus).reduce((a, b) => a + b, 0); // >> 860
  // get how much space we have left for context panels
  let leftForContext = maxFullPanelWidth - focusWidth; // >> 1089
  // assess how many context panels we should try to show
  let contextsLeft = focus - context - 1;

  // try to fit those context panels within that space that's left
  while (contextsLeft >= 0 && leftForContext >= widths[contextsLeft]) {
    // get the context's width
    const contextWidth = widths[contextsLeft];
    // remove it from the space left for context
    leftForContext -= contextWidth;
    // shift x to include that panel
    x -= contextWidth;
    // decrease the amount of contexts left
    contextsLeft--;
  }
  console.timeEnd('getNextPosition');

  return {
    routesByContext: nextRoutesByContext,
    x,
    width: maxFullPanelWidth + widths.reduce((a, b) => a + b, 0),
    widths
  };
}
