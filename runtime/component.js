import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { moveLeft } from './actions';
import { reset, setX } from './actions';
import { snapX } from 'panels-ui';
import { spring, TransitionMotion } from 'react-motion';
import debounce from 'lodash.debounce';
import getViewportWidth from './get-viewport-width';
import MoveLeft from './move-left';
import Panel from '../panels/component';
import React, { Component, PropTypes } from 'react';

const DEBOUNCE = 150;
const REBOUND = 500;

export class Runtime extends Component {
  // state = {
  //   presenterIsFocused: false
  // };

  componentDidMount() {
    this.$runtime.addEventListener('scroll', this.setX, false);
    window.addEventListener('resize', this.setViewportWidth, false);
    window.addEventListener('orientationchange', this.setViewportWidth, false);
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  }

  // componentWillReceiveProps(nextProps) {
  //   const { props, state } = this;

  //   if (state.Presenter && (props.focusPanel !== nextProps.focusPanel || props.x !== nextProps.x)) {
  //     this.setState({
  //       presenterIsFocused: !state.presenterIsFocused
  //     });
  //   }
  // }

  componentDidUpdate(prevProps) {
    const { props } = this;

    if (props.focusPanel) {
      window.document.title = props.focusPanel.title || props.focusPanel.type;
    }

    if (props.routes !== prevProps.routes ||
       (props.shouldReset !== prevProps.shouldReset && props.shouldReset)) {
      props.reset(props.preferredSnapPoint);
    }

    if (props.x !== prevProps.x) {
      snapX(this.$runtime, props.x);
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
      present: (app, presenter, presenterProps) => {
        // this.setState({
        //   presenterIsFocused: true,
        //   Presenter: this.props.apps[app].presenters[presenter],
        //   presenterProps
        // });
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
    const { canMoveLeft, focusPanel, moveLeft, snapPoint } = this.props;

    const runtimeStyle = focusPanel ? {
      ...style,
      ...focusPanel.styleBackground
    } : style;

    // const { Presenter, presenterProps } = this.state;

    return (
      <div ref={ $e => this.$runtime = $e } style={runtimeStyle}>
        { canMoveLeft && <MoveLeft onClick={moveLeft} snapPoint={snapPoint} /> }

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
    // const { presenterIsFocused } = this.state;

    return (
      <div
        style={{
          flexDirection: 'row',
          // opacity: presenterIsFocused ? 0 : 1,
          paddingLeft: snapPoint,
          transition: 'opacity 2s linear',
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

  setViewportWidth = debounce(() => {
    this.props.reset(this.props.preferredSnapPoint, getViewportWidth());
  }, DEBOUNCE)

  setX = debounce(() => {
    this.props.setX(this.$runtime.scrollLeft);
  }, DEBOUNCE)

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
