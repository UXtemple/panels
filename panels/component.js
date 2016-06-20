import React, { Component, PropTypes } from 'react';

export default class Route extends Component {
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
    const { isActive, navigate, toggleExpand, updateSettings } = this;
    const { Type, width, x, zIndex, ...props } = this.props;
    const style = {
      height: '100%',
      opacity: x,
      overflowY: 'auto',
      transform: `translateX(${-Math.abs(100 - x * 100)}%)`,
      width,
      zIndex
    };

    return (
      <Type
        {...props}
        isActive={isActive}
        navigate={navigate}
        style={style}
        toggleExpand={toggleExpand}
        updateSettings={updateSettings}
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
  present: PropTypes.func.isRequired,
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
