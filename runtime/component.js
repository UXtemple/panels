import { connect } from 'react-redux';
import { moveLeft, setViewportWidth, setX } from './actions';
import { Motion, spring, TransitionMotion } from 'react-motion';
import debounce from 'lodash.debounce';
import getViewportWidth from './get-viewport-width';
import MoveLeft from './move-left';
import Panel from '../panels/component';
import React, { Component, PropTypes } from 'react';
import Waiting from 'waiting';

const DEBOUNCE = 150;
const REBOUND = 500;

export class Runtime extends Component {
  state = {
    autoScroll: null,
    opacity: 1,
    presenter: null
  };

  componentDidMount() {
    this.$runtime.addEventListener('scroll', this.setX, false);
    window.addEventListener('resize', this.setViewportWidth, false);
    window.addEventListener('orientationchange', this.setViewportWidth, false);
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;

    if (props.focusPanel !== nextProps.focusPanel || props.runtime.x !== nextProps.runtime.x) {
      this.toggleOpacityIfPresenting();
    }

    if (nextProps.runtime.x !== props.runtime.x) {
      const direction = nextProps.runtime.x >= props.runtime.x ? 1 : -1;
      const from = this.$runtime.scrollLeft;
      const to = nextProps.runtime.x;

      this.setState({
        autoScroll: {
          direction,
          from,
          gap: Math.abs(from - to) * direction,
          to
        }
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { props } = this;

    if (props.focusPanel) {
      window.document.title = props.focusPanel.title || props.focusPanel.type;
    }

    if (prevProps.runtime.x !== props.runtime.x) {
      this.$runtime.scrollLeft = props.runtime.x;
    }
  }

  componentWillUnmount() {
    this.$runtime.removeEventListener('scroll', this.setX);
    window.removeEventListener('resize', this.setViewportWidth);
    window.removeEventListener('orientationchange', this.setViewportWidth);
  }

  onVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      this.$runtime.removeEventListener('scroll', this.setX);
      window.removeEventListener('resize', this.setViewportWidth);
      window.removeEventListener('orientationchange', this.setViewportWidth);
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
    const { router } = this.props;

    return router.routes.items.map((context, i) => ({
      data: {
        route: router.routes.byContext[context],
        routeIndex: i
      },
      key: context,
      style: {
        x: spring(1, { stiffness: 210 })
      }
    }));
  }

  render() {
    const { canMoveLeft, focusPanel, moveLeft, runtime } = this.props;
    const { autoScroll, presenter } = this.state;

    const runtimeStyle = focusPanel ? {
      ...style,
      ...focusPanel.styleBackground
    } : style;

    return (
      <div ref={ $e => this.$runtime = $e } style={runtimeStyle}>
        { canMoveLeft && <MoveLeft onClick={moveLeft} snapPoint={runtime.snapPoint} /> }

        <Motion
          onRest={() => this.setState({ autoScroll: null }) }
          style={{ x: spring(autoScroll ? autoScroll.gap : 0, { stiffness: 210 }) }}
        >
          {this.scrollRuntime}
        </Motion>

        { presenter }

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

        // { autoScroll ? (
        //     <Motion
        //       onRest={() => this.setState({ autoScroll: null }) }
        //       style={{ x: spring(autoScroll.gap, { stiffness: 210 }) }}
        //     >
        //       {this.scrollRuntime}
        //     </Motion>
        //   ) : null }


  renderPanels = (interpolatedStyles) => {
    const { context, focus, router, runtime } = this.props;
    const { opacity } = this.state;

    return (
      <div
        onClick={this.toggleOpacityIfPresenting}
        style={{
          flexDirection: 'row',
          height: '100%',
          opacity,
          overflowY: 'hidden',
          paddingLeft: runtime.snapPoint,
          transition: 'opacity 0.5s ease-in',
          width: runtime.width
        }}
      >
        { interpolatedStyles.map((config, i) => (
          <Panel
            isContext={i >= router.context}
            isFocus={i === router.focus}
            isVisible={config.data.route.isVisible}
            key={config.key}
            route={config.data.route}
            routeIndex={config.data.routeIndex}
            x={config.style.x}
            zIndex={router.routes.items.length - i}
            width={config.data.route.width}
          />
        )) }

        { router.isLoading ? (
          <div style={{ justifyContent: 'center', left: -50, marginTop: -50 }}>
            <Waiting size={100} />
          </div>
          ) : null }
      </div>
    );
  }

  scrollRuntime = ({ x }) => {
    const { autoScroll } = this.state;

    if (this.$runtime && autoScroll) {
      this.$runtime.scrollLeft = autoScroll.from + x;
    }
    return null;
  }

  setViewportWidth = debounce(() => {
    this.props.setViewportWidth(getViewportWidth());
  }, DEBOUNCE)

  setX = debounce(event => {
    if (this.state.autoScroll) {
      this.setState({
        autoScroll: null
      });
    } else {
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
    x: spring(0, { stiffness: 210 })
  })
}
Runtime.childContextTypes = {
  present: PropTypes.func
};

const style = {
  height: '100%',
  overflowX: 'auto',
  overflowY: 'hidden',
  width: '100vw'
};

const getFocusPanel = ({ panels, router }) => {
  const focusRoute = router.routes.byContext[router.routes.items[router.focus]];
  return focusRoute && panels.byId[focusRoute.panelId];
};

const getCanMoveLeft = ({ runtime }) => !runtime.shouldGoMobile && runtime.x > 0;

function mapStateToProps(state, props) {
  return {
    canMoveLeft: getCanMoveLeft(state),
    focusPanel: getFocusPanel(state),
    router: state.router,
    runtime: state.runtime
  };
}

const mapDispatchToProps = {
  moveLeft,
  setViewportWidth,
  setX
};
export default connect(mapStateToProps, mapDispatchToProps)(Runtime);
