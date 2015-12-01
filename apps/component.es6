import { connect } from 'react-redux';
import { loadAppIfNeeded } from './actions';
import { widthShape } from 'panels-ui';
import appShape from './app-shape';
import knockKnockGo from '../knock-knock-go';
import Panel from '../panels/component';
import React, { PropTypes } from 'react';
import routeShape from '../router/route-shape';

const App = props => <Panel appStore={props.store} route={props.route} width={props.width} />;

App.propTypes = {
  ...appShape,
  route: routeShape.isRequired,
  width: widthShape.isRequired
};

const KnockKnockApp = knockKnockGo(
  props => props.isLoading,
  props => props.error,
  App,
  props => props.dispatch(loadAppIfNeeded(props.route))
);

function mapStateToProps(state, props) {
  return state.apps[props.route.app] || {
    isLoading: true
  };
}

export default connect(mapStateToProps)(KnockKnockApp);
