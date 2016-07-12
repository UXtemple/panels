import React, { Component, PropTypes } from 'react';

export default class Route extends Component {
  state = {};

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

  componentDidMount() {
    const { isActive, navigate, toggleExpand, updateSettings } = this;
    const { isContext, isFocus, panel, present, route, routeIndex, router, store, type } = this.props;

    const props = {
      isActive,
      isContext,
      isFocus,
      navigate,
      panel,
      present,
      route,
      routeIndex,
      router,
      store,
      toggleExpand,
      updateSettings
    };

    try {
      this.onDestroy = type(this.$el, props, this.subscribe);

      if (this.state.error) {
        this.setState({ error: false });
      }
    } catch(error) {
      console.error('panels:route', error);

      this.setState({ error });
    }
  }

  componentDidUpdate(prevProps) {
    const { error } = this.state;
    const { panel, route, routeIndex, router, type } = this.props;

    if (prevProps.type !== type) {
      this.componentWillUnmount();
      this.componentDidMount();
    } else if (
      typeof this.onChange === 'function' && (
        prevProps.panel !== panel ||
        prevProps.route !== route ||
        prevProps.routeIndex !== routeIndex ||
        prevProps.router !== router
      )
    ) {
      this.onChange({
        panel,
        route,
        routeIndex,
        router
      });
    }
  }

  componentWillUnmount() {
    if (typeof this.onDestroy === 'function') {
      this.onDestroy();
    }
  }

  subscribe = onChange => this.onChange = onChange

  render() {
    const { props, state } = this;

    return (
      <div
        ref={$el => { this.$el = $el }}
        style={{
          backgroundColor: state.error && '#ff5959',
          height: '100%',
          overflowY: 'auto',
          transition: 'transform 0.25s linear',
          transform: `translateX(${ -props.x }px)`,
          width: props.width,
          zIndex: props.zIndex
        }}
      >
        {state.error && (
          <pre style={{ color: '#ffffff', overflowX: 'scroll', padding: 10 }}>
            {state.error.stack}
          </pre>
        )}
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

Route.propTypes = {
  isContext: PropTypes.bool.isRequired,
  isFocus: PropTypes.bool.isRequired,
  navigate: PropTypes.func.isRequired,
  panel: PropTypes.object.isRequired,
  present: PropTypes.func,
  route: routeShape.isRequired,
  routeIndex: PropTypes.number.isRequired,
  router: PropTypes.shape({
    routes: PropTypes.shape({
      byContext: PropTypes.objectOf(routeShape),
      items: PropTypes.arrayOf(PropTypes.string)
    }),
    uri: PropTypes.string.isRequired
  }),
  store: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
      subscribe: PropTypes.func.isRequired
    })
  ]).isRequired,
  type: PropTypes.func.isRequired,
  toggleExpand: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  zIndex: PropTypes.number.isRequired
};
