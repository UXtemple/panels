import React, { Component, PropTypes } from 'react';

export default class Route extends Component {
  getChildContext() {
    const { isActive, navigate, toggleExpand, updateSettings } = this;
    const { panel, route, routeIndex, router } = this.props;

    return {
      panels: {
        isActive,
        navigate,
        panel,
        route,
        routeIndex,
        router,
        toggleExpand,
        updateSettings
      }
    };
  }

  isActive = path => {
    const { route, router, routeIndex } = this.props;

    const routeAfterContext = router.routes.items[routeIndex + 1];
    return routeAfterContext && `${route.context}${path}` === routeAfterContext;
  }

  navigate = (toUri, focus, context, raw = false) => (
    this.props.navigate(raw ? toUri : `${this.props.route.context}${toUri}`, focus, context)
  )

  toggleExpand = () => (
    this.props.toggleExpand(this.props.route.context)
  )

  updateSettings = settings => (
    this.props.updateSettings(this.props.route.context, settings)
  )

  render() {
    const { panel, route, store, Type, width, x, zIndex } = this.props;

    return (
      <Type
        {...panel.props}
        store={store}
        style={{
          height: '100%',
          opacity: x,
          transform: `translateX(${-Math.abs(100 - x * 100)}%)`,
          width,
          zIndex
        }}
      />
    );
  }
}

const routeShape = PropTypes.shape({
  app: PropTypes.string.isRequired,
  context: PropTypes.string.isRequired,
  panelId: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired
});

Route.propTypes = {
  store: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
      subscribe: PropTypes.func.isRequired
    })
  ]).isRequired,
  navigate: PropTypes.func.isRequired,
  panel: PropTypes.object.isRequired,
  route: routeShape.isRequired,
  routeIndex: PropTypes.number.isRequired,
  router: PropTypes.shape({
    routes: PropTypes.shape({
      byContext: PropTypes.objectOf(routeShape),
      items: PropTypes.arrayOf(PropTypes.string)
    }),
    uri: PropTypes.string.isRequired
  }),
  Type: PropTypes.func.isRequired,
  toggleExpand: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  zIndex: PropTypes.number.isRequired
};

Route.childContextTypes = {
  panels: PropTypes.shape({
    isActive: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    panel: PropTypes.object.isRequired,
    route: routeShape.isRequired,
    routeIndex: PropTypes.number.isRequired,
    router: PropTypes.shape({
      routes: PropTypes.shape({
        byContext: PropTypes.objectOf(routeShape),
        items: PropTypes.arrayOf(PropTypes.string)
      }),
      uri: PropTypes.string.isRequired
    }),
    toggleExpand: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired
  }).isRequired
};
