import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { moveLeft } from './actions';
import { reset, setX } from './actions';
import { Motion, spring, TransitionMotion } from 'react-motion';
import debounce from 'lodash.debounce';
import getViewportWidth from './get-viewport-width';
import MoveLeft from './move-left';
import Panel from '../panels/component';
import React, { Component, PropTypes } from 'react';

const DEBOUNCE = 150;
const REBOUND = 500;

export class Runtime extends Component {
  state = {
    opacity: 1,
    presenter: null
  };

  isAutomaticallyScrolling = false;
  stopAutomaticallyScrolling = false;
  scrollGap = 0;

  componentDidMount() {
    this.$runtime.addEventListener('scroll', this.setX, false);
    window.addEventListener('resize', this.setViewportWidth, false);
    window.addEventListener('orientationchange', this.setViewportWidth, false);
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;

    if (props.focusPanel !== nextProps.focusPanel || props.x !== nextProps.x) {
      this.toggleOpacityIfPresenting();
    }

    if (nextProps.x !== props.x) {
      this.isAutomaticallyScrolling = true;
      this.stopAutomaticallyScrolling = false;
      this.scrollFrom = this.$runtime.scrollLeft;
      this.scrollGap = this.scrollFrom - nextProps.x;
      // console.log('target', nextProps.x, 'at', this.scrollFrom, 'gap', this.scrollGap)
    }
  }

  componentDidUpdate(prevProps) {
    const { props } = this;

    if (props.focusPanel) {
      window.document.title = props.focusPanel.title || props.focusPanel.type;
    }

    if (props.routes !== prevProps.routes ||
       (props.shouldReset !== prevProps.shouldReset && props.shouldReset)) {
      props.reset(props.preferredSnapPoint);
    }
  }

  componentWillUnmount() {
    this.$runtime.removeEventListener('scroll', this.setX);
    window.removeEventListener('resize', this.setViewportWidth, false);
    window.removeEventListener('orientationchange', this.setViewportWidth, false);
  }

  onVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      this.$runtime.removeEventListener('scroll', this.setX);
      window.removeEventListener('resize', this.setViewportWidth, false);
      window.removeEventListener('orientationchange', this.setViewportWidth, false);
    } else {
      setTimeout(() => {
        this.$runtime.addEventListener('scroll', this.setX, false);
        window.addEventListener('resize', this.setViewportWidth, false);
        window.addEventListener('orientationchange', this.setViewportWidth, false);
      }, REBOUND);
    }
  }

  getChildContext() {
    return {
      present: (presenter = null) => {
        this.setState({
          opacity: presenter ? 0 : 1,
          presenter
        });
      }
    }
  }

  mapRoutesToMotionStyles() {
    const { routes, widths } = this.props;

    return routes.map((route, routeIndex) => ({
      data: {
        route,
        routeIndex,
        width: widths[routeIndex] || 360
      },
      key: routeIndex,
      style: {
        x: spring(1, { stifness: 210 })
      }
    }));
  }

  render() {
    const { canMoveLeft, focusPanel, moveLeft, snapPoint, x } = this.props;

    const runtimeStyle = focusPanel ? {
      ...style,
      ...focusPanel.styleBackground
    } : style;

    const { presenter } = this.state;

    return (
      <div ref={ $e => this.$runtime = $e } style={runtimeStyle}>
        { canMoveLeft && <MoveLeft onClick={moveLeft} snapPoint={snapPoint} /> }

        { presenter }

        <Motion
          onRest={() => {
            this.isAutomaticallyScrolling = false;
            this.stopAutomaticallyScrolling = false;
          }}
          style={{ x: spring(this.scrollGap, { stifness: 210 }) }}
        >
          {this.scrollRuntime}
        </Motion>

        <TransitionMotion
          styles={this.mapRoutesToMotionStyles()}
          willEnter={this.willEnter}
          willLeave={this.willLeave}
        >
          {this.renderPanels}
        </TransitionMotion>
      </div>
    );
  }

  renderPanels = (interpolatedStyles) => {
    const { context, focus, routes, snapPoint, width } = this.props;
    const { opacity } = this.state;

    return (
      <div
        onClick={this.toggleOpacityIfPresenting}
        style={{
          flexDirection: 'row',
          height: '100%',
          opacity,
          overflowY: 'hidden',
          paddingLeft: snapPoint,
          transition: 'opacity 0.5s ease-in',
          width
        }}
      >
        { interpolatedStyles.map((config, i) => (
          <Panel
            isContext={i >= context}
            isFocus={i === focus}
            isVisible={config.data.route.visible}
            key={config.key}
            route={config.data.route}
            routeIndex={config.data.routeIndex}
            shouldWrap={i === routes.length - 1}
            x={config.style.x}
            zIndex={routes.length - i}
            width={config.data.width}
          />
        )) }
      </div>
    );
  }

  scrollRuntime = ({ x }) => {
    // console.log('scrollRuntime!!', x)
    if (this.$runtime && !this.stopAutomaticallyScrolling) {
      // console.log('x', x, 'next', this.scrollFrom - x)
      this.$runtime.scrollLeft = this.scrollFrom - x;
    }

    return null;
  }

  setViewportWidth = debounce(() => {
    this.props.reset(this.props.preferredSnapPoint, getViewportWidth());
  }, DEBOUNCE)

  setX = debounce(() => {
    if (this.isAutomaticallyScrolling) {
      this.stopAutomaticallyScrolling = true;
    } else {
      // console.log('setting x to ', this.$runtime.scrollLeft)
      this.props.setX(this.$runtime.scrollLeft);
    }
  }, DEBOUNCE)

  toggleOpacityIfPresenting = event => {
    const { state } = this;

    if (state.presenter && state.opacity === 0) {
      this.setState({
        opacity: state.opacity === 1 ? 0 : 1
      })
    }
  };

  willEnter = () => ({
    x: 0
  })

  willLeave = () => ({
    x: spring(0, { stifness: 210 })
  })
}
Runtime.childContextTypes = {
  present: PropTypes.func
};

// { Presenter ? (
//   <Presenter {...presenterProps}
//     onClick={() => this.setState({ presenterIsFocused: !presenterIsFocused })}
//     style={{ position: 'fixed', left: 0, top: 0, height: '100%', width: '100%' }} />
//   ) : null }

const style = {
  height: '100%',
  overflowX: 'auto',
  overflowY: 'hidden',
  width: '100vw'
};

const getFocusPanel = ({panels, router}) => {
  const focusRoute = router.routes[router.focus];
  return panels.byId[`${focusRoute.app}${focusRoute.path}`];
};

const getCanMoveLeft = ({runtime}) => !runtime.shouldGoMobile && runtime.x > 0;

function mapStateToProps(state, props) {
  return {
    // apps: state.apps,
    canMoveLeft: getCanMoveLeft(state),
    context: state.router.context,
    focus: state.router.focus,
    focusPanel: getFocusPanel(state),
    routes: state.router.routes,
    shouldReset: state.runtime.shouldReset,
    snapPoint: state.runtime.snapPoint,
    x: state.runtime.x,
    width: state.runtime.width,
    widths: state.runtime.widths
  };
}

const mapDispatchToProps = {
  moveLeft,
  reset,
  setX
};
export default connect(mapStateToProps, mapDispatchToProps)(Runtime);
