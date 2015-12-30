import 'core-js/fn/array/find-index';
import { connect } from 'react-redux';
import { loadPanelIfNeeded } from './actions';
import { navigate } from '../router/actions';
import { Provider } from 'react-redux';
import getPanelPathFromRoute from '../router/get-panel-path-from-route';
import knockKnockGo from '../knock-knock-go';
import prepare from './prepare';
import React, { PropTypes } from 'react';
import routeShape from '../router/route-shape';
import Sliced from './sliced';
import withContext from 'recompose/withContext';

const Panel = props => {
  const module = require(props.app.moduleName);
  const Type = module.types[props.panel.type];
  const { dispatch, width, ...rest } = props;

  if (props.route.visible) {
    if (props.app.store) {
      return (
        <Provider store={props.app.store}>
          <Type {...props.panel.props} panel={rest} width={width} />
        </Provider>
      );
    } else {
      return <Type {...props.panel.props} panel={rest} width={width} />;
    }
  } else {
    return <Sliced {...props.panel.props} route={props.route} uri={props.uri} width={width} />;
  }
};

const PanelInContext = withContext({
    isActive: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    route: routeShape.isRequired
  },
  props => ({
    isActive: path => props.routeAfter && `${props.route.context}${path}` === props.routeAfter.context,
    navigate: toUri => props.dispatch(navigate(`${props.route.context}${toUri}`)),
    route: props.route
  }),
  Panel
);

const KnockKnockPanelInContext = knockKnockGo(
  props => props.isLoading,
  props => props.error,
  PanelInContext,
  props => props.dispatch(loadPanelIfNeeded(props.route))
);

function mapStateToProps(state, props) {
  const routeIndex = state.router.routes.findIndex(panel => panel.context === props.route.context);
  const app = state.apps[props.route.app] || {
    isLoading: true
  };
  const panel = state.panels[getPanelPathFromRoute(props.route)] || {
    isLoading: true
  };

  const isLoading = app.isLoading || panel.isLoading;
  const isReady = app.isReady && panel.isReady;
  const error = app.error || panel.error;
  const message = app.message || panel.message;

  return {
    app,
    error,
    isLoading,
    isReady,
    message,
    panel,
    routeAfter: state.router.routes[routeIndex + 1] || false,
    uri: state.router.uri,
    width: props.width
  };
}

export default connect(mapStateToProps)(KnockKnockPanelInContext);
