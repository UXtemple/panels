import { connect } from 'react-redux';
import { loadPanelIfNeeded, toggleExpand, updateSettings } from './actions';
import { navigate } from '../router/actions';
import { Provider } from 'react-redux';
import DisplayError from '../display-error';
import findIndex from 'array-find-index';
import getPanelPathFromRoute from '../router/get-panel-path-from-route';
import React, { Component, PropTypes } from 'react';
import Sliced from './sliced';
import shallowEqual from '../utils/shallow-equal';
import Waiting from 'waiting';

class Panel extends Component {
  componentDidMount() {
    this.props.dispatch(loadPanelIfNeeded(this.props.route));
  }

  componentDidUpdate() {
    this.props.dispatch(loadPanelIfNeeded(this.props.route));
  }

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
    const { app, dispatch, error, isLoading, panel, route, width, x, zIndex, ...rest } = this.props;

    const finalWidth = route.visible ? width : 0;

    let children;
    if (route.visible) {
      if (isLoading) {
        children = <Waiting />;
      } else if (error) {
        children = <DisplayError error={error} />;
      } else {
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
  path: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired
});

Panel.childContextTypes = {
  isActive: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  panel: PropTypes.object.isRequired,
  route: routeShape.isRequired,
  routeIndex: PropTypes.number.isRequired,
  router: PropTypes.shape({
    routes: PropTypes.arrayOf(routeShape),
    uri: PropTypes.string.isRequired
  }),
  toggleExpand: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  // const routeIndex = findIndex(state.router.routes, panel => panel.context === props.route.context);
  const app = state.apps[props.route.app] || {
    isLoading: true
  };
  const panel = state.panels.byId[getPanelPathFromRoute(props.route)] || {
    isLoading: true
  };

  const isLoading = app.isLoading || panel.isLoading;
  const isReady = app.isReady && panel.isReady;
  const error = app.error || panel.error;

  return {
    app,
    error,
    isLoading,
    isReady,
    panel,
    routeAfter: state.router.routes[props.routeIndex + 1] || false,
    // routeIndex: routeIndex,
    router: state.router,
    uri: state.router.uri,
    width: props.width
  };
}

export default connect(mapStateToProps)(Panel);
