import { connect } from 'react-redux';
import { loadPanelIfNeeded } from './actions';
import { navigate } from '../router/actions';
import { Provider } from 'react-redux';
import withContext from 'recompose/withContext';
import appShape from '../apps/app-shape';
import getPanelPathFromRoute from '../router/get-panel-path-from-route';
import knockKnockGo from '../knock-knock-go';
import panelShape from './panel-shape';
import prepare from './prepare';
import React, { PropTypes } from 'react';
import routeShape from '../router/route-shape';

const Panel = props => {
  const dep = require(props.route.app);
  const Type = dep.types[props.type];

  const { props: typeProps, width, ...rest } = props;

  return (
    <Provider store={props.appStore}>
      <Type {...typeProps} width={width} panel={rest} />
    </Provider>
  );
};
Panel.propTypes = {
  ...panelShape,
  appStore: appShape.store,
  route: routeShape.isRequired,
  routeAfter: PropTypes.oneOfType([PropTypes.bool, routeShape]).isRequired
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
  let panel = state.panels[getPanelPathFromRoute(props.route)] || {
    isLoading: true
  };
  // TODO FIXME
  if (panel && panel.isReady) {
    panel = prepare(panel, props.appStore.getState)
  }

  return {
    ...panel,
    routeAfter: state.router.routes[routeIndex + 1] || false
  };
}

export default connect(mapStateToProps)(KnockKnockPanelInContext);
