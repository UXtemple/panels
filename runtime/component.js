import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { flexDirectionRow } from 'browser-vendor-prefix';
import { moveLeft } from './actions';
import { reset, setX } from './actions';
import { snapX } from 'panels-ui';
import { spring, TransitionMotion } from 'react-motion';
import debounce from 'lodash.debounce';
import getViewportWidth from './get-viewport-width';
import MoveLeft from './move-left';
import Panel from '../panels/component';
import React, { Component } from 'react';

const DEBOUNCE = 150;
const REBOUND = 500;

export class Runtime extends Component {
  constructor(props) {
    super(props);

    this.onVisibilityChange = this.onVisibilityChange.bind(this);
    this.setXDebounced = debounce(this.setX.bind(this), DEBOUNCE);
    this.setViewportWidthDebounced = debounce(this.setViewportWidth.bind(this), DEBOUNCE);

    this.willEnter = this.willEnter.bind(this);
    this.willLeave = this.willLeave.bind(this);
  }

  componentDidMount() {
    this.$runtime.addEventListener('scroll', this.setXDebounced, false);
    window.addEventListener('resize', this.setViewportWidthDebounced, false);
    window.addEventListener('orientationchange', this.setViewportWidthDebounced, false);
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    this.setViewportWidth();
  }

  componentDidUpdate(prevProps) {
    const { props } = this;

    if (prevProps.focusPanel && props.focusPanel && props.focusPanel.title !== prevProps.focusPanel.title) {
      window.document.title = props.focusPanel.title;
    }

    if (props.routes !== prevProps.routes) {
      props.reset(props.preferredSnapPoint);
    }

    if (props.shouldReset !== prevProps.shouldReset && props.shouldReset) {
      props.reset(props.preferredSnapPoint);
    }

    if (props.x !== prevProps.x) {
      snapX(this.$runtime, props.x);
    }
  }

  componentWillUnmount() {
    this.$runtime.removeEventListener('scroll', this.setXDebounced);
    window.removeEventListener('resize', this.setViewportWidthDebounced, false);
    window.removeEventListener('orientationchange', this.setViewportWidthDebounced, false);
  }

  onVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      this.$runtime.removeEventListener('scroll', this.setXDebounced);
      window.removeEventListener('resize', this.setViewportWidthDebounced, false);
      window.removeEventListener('orientationchange', this.setViewportWidthDebounced, false);
    } else {
      setTimeout(() => {
        this.$runtime.addEventListener('scroll', this.setXDebounced, false);
        window.addEventListener('resize', this.setViewportWidthDebounced, false);
        window.addEventListener('orientationchange', this.setViewportWidthDebounced, false);
      }, REBOUND);
    }
  }

  willEnter() {
    return {
      x: 0
    };
  }

  willLeave() {
    return {
      x: spring(0, { stifness: 210 })
    };
  }

  render() {
    const {
      canMoveLeft, context, focus, focusPanel, moveLeft, routes, snapPoint, width, widths
    } = this.props;
    const runtimeStyle = focusPanel ? {
      ...style,
      ...focusPanel.styleBackground
    } : style;

    return (
      <div ref={ $e => this.$runtime = $e } style={runtimeStyle}>
        { canMoveLeft && <MoveLeft onClick={moveLeft} snapPoint={snapPoint} /> }

        <TransitionMotion
          willEnter={this.willEnter}
          willLeave={this.willLeave}
          styles={routes.map((route, i) => ({
            key: i, // route.context,
            data: {
              route,
              width: widths[i] || 360
            },
            style: {
              x: spring(1, { stifness: 210 })
            }
          }))}>
          {interpolatedStyles => (
            <div style={{ ...stylePanels, paddingLeft: snapPoint, width }}>
              { interpolatedStyles.map((config, i) => (
                <Panel
                  isContext={i >= context}
                  isFocus={i === focus}
                  isVisible={config.data.route.visible}
                  key={config.key}
                  route={config.data.route}
                  shouldWrap={i === routes.length - 1}
                  x={config.style.x}
                  zIndex={routes.length - i}
                  width={config.data.width}
                />
              )) }
            </div>
          )}
        </TransitionMotion>
      </div>
    );
  }

  setViewportWidth() {
    this.props.reset(this.props.preferredSnapPoint, getViewportWidth());
  }

  setX() {
    this.props.setX(this.$runtime.scrollLeft);
  }
}

const style = {
  height: '100%',
  overflowX: 'auto',
  overflowY: 'hidden',
  width: '100vw'
};

const stylePanels = {
  ...flexDirectionRow,
  height: '100%'
};

const getFocusPanel = ({panels, router}) => {
  const focusRoute = router.routes[router.focus];
  return panels.byId[`${focusRoute.app}${focusRoute.path}`];
};

// const getFocusPanel = createSelector(
//   state => state.panels,
//   state => state.router.routes[state.router.focus],
//   (panels, focusRoute) => panels[`${focusRoute.app}${focusRoute.path}`]
// );

// const getCanMoveLeft = createSelector(
//   state => state.runtime.shouldGoMobile,
//   state => state.runtime.x,
//   (shouldGoMobile, x) => !shouldGoMobile && x > 0
// );

const getCanMoveLeft = ({runtime}) => !runtime.shouldGoMobile && runtime.x > 0;

function mapStateToProps(state, props) {
  return {
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
