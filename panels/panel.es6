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
  const dep = require(props.route.app);
  const Type = dep.types[props.type];
  const { props: typeProps, width, ...rest } = props;

  if (props.route.visible) {
    if (props.appStore) {
      return (
        <Provider store={props.appStore}>
          <Type {...typeProps} panel={rest} width={width} />
        </Provider>
      );
    } else {
      return <Type {...typeProps} panel={rest} width={width} />;
    }
  } else {
    return <Sliced {...typeProps} route={props.route} uri={props.uri} width={width} />;
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

  return {
    ...panel,
    appStore: app.store,
    routeAfter: state.router.routes[routeIndex + 1] || false,
    uri: state.router.uri,
    width: props.width
  };
}

export default connect(mapStateToProps)(KnockKnockPanelInContext);
