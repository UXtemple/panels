import { connect } from 'react-redux';
import { toggleExpand, updateSettings } from './actions';
import { navigate } from '../actions';
import { Provider } from 'react-redux';
import React, { Component, PropTypes } from 'react';

class Panel extends Component {
  getChildContext() {
    const { dispatch, panel, route, routeAfter, routeIndex, router } = this.props;

    return {
      isActive: path => routeAfter && `${route.context}${path}` === routeAfter.context,
      // TODO allow for route without context
      navigate: (toUri, focus, context) => dispatch(navigate(`${route.context}${toUri}`, focus, context)),
      panel,
      route,
      routeIndex,
      router,
      toggleExpand: () => dispatch(toggleExpand(route)),
      updateSettings: settings => dispatch(updateSettings(route, settings))
    };
  }

  render() {
    const { app, panel, route, width, x, zIndex, ...rest } = this.props;

    const finalWidth = route.isVisible ? width : 0;

    let children;
    if (route.isVisible) {
      const Type = app.types[panel.type];

      if (app.store) {
        children = (
          <Provider store={app.store}>
            <Type {...panel.props} panel={rest} width={width} />
          </Provider>
        );
      } else {
        children = <Type {...panel.props} panel={rest} width={width} />;
      }
    }

    return (
      <div
        style={{
          height: '100%',
          opacity: x,
          overflowY: 'hidden',
          transform: `translateX(${-Math.abs(100 - x * 100)}%)`,
          width: finalWidth,
          zIndex
        }}
      >
        { children }
      </div>
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

Panel.childContextTypes = {
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
};

function mapStateToProps(state, props) {
  const app = state.apps.byName[props.route.app];
  const panel = state.panels.byId[props.route.panelId];

  return {
    app,
    panel,
    routeAfter: state.router.routes.items[props.routeIndex + 1] || false,
    // routeIndex: routeIndex,
    router: state.router,
    uri: state.router.uri,
    width: props.width
  };
}

export default connect(mapStateToProps)(Panel);
