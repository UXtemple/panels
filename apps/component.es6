import { connect } from 'react-redux';
import { loadAppIfNeeded } from './actions';
import { widthShape } from 'panels-ui';
import appShape from './app-shape';
import Panel from '../panels/component';
import React, { Component, PropTypes } from 'react';
import routeShape from '../router/route-shape';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(loadAppIfNeeded(this.props.route));
  }

  render() {
    const { app, route, width } = this.props;

    if (typeof app === 'undefined' || app.isLoading) {
      return <div style={{width}}>loading app {route.app}...</div>;
    } else if (app.isReady) {
      return <Panel app={app} route={route} width={width} />;
    } else {
      return <div style={{width}}>app {route.app} failed to load or doesn't exist</div>;
    }
  }

  static propTypes = {
    app: appShape,
    route: routeShape.isRequired,
    width: widthShape.isRequired
  }
}

function mapStateToProps(state, props) {
  return {
    app: state.apps.byDomain[props.route.app]
  };
}

export default connect(mapStateToProps)(App);
