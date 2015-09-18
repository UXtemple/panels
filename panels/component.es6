import { connect } from 'react-redux';
import { loadPanelIfNeeded } from './actions';
import { navigate } from '../router/actions';
import { Provider } from 'react-redux';
import appShape from '../apps/app-shape';
import getPanelPathFromRoute from '../router/get-panel-path-from-route';
import panelShape from './panel-shape';
import prepare from './prepare';
import React, { Component, PropTypes } from 'react';
import routeShape from '../router/route-shape';

class Panel extends Component {
  componentDidMount() {
    this.props.dispatch(loadPanelIfNeeded(this.props.route));
  }

  getChildContext() {
    return {
      isActive: path => this.props.routeAfter && `${this.props.route.context}${path}` === this.props.routeAfter.context,
      navigate: toUri => this.props.dispatch(navigate(`${this.props.route.context}${toUri}`))
    };
  }

  render() {
    const { app, panel, route, routeAfter, width } = this.props;

    if (typeof panel === 'undefined' || panel.isLoading) {
      return <div style={{width}}>loading panel {route.app} {route.path}...</div>;
    } else if (panel.isReady) {
      const dep = require(route.app);
      const Type = dep.types[panel.type];

      return (
        <Provider store={app.store}>
          <Type {...panel.props} {...this.props} />
        </Provider>
      );
    } else {
      return <div style={{width}}>panel {route.app} {route.path} failed to load or doesn't exist</div>;
    }
  }

  static childContextTypes = {
    isActive: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired
  }

  static propTypes = {
    app: appShape.isRequired,
    panel: panelShape,
    route: routeShape.isRequired,
    routeAfter: PropTypes.oneOfType([PropTypes.bool, routeShape]).isRequired
  }
}

function mapStateToProps(state, props) {
  const routeIndex = state.router.routes.findIndex(panel => panel.context === props.route.context);

  return {
    panel: prepare(state.panels[getPanelPathFromRoute(props.route)], props.app.store.getState()),
    routeAfter: state.router.routes[routeIndex + 1] || false
  };
}

export default connect(mapStateToProps)(Panel);
