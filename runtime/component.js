import { connect } from 'react-redux';
import { moveLeft, setViewportWidth, setX } from './actions';
import { navigate } from '../actions';
import { toggleExpand, updateSettings } from '../panels/actions';
import { snapX } from 'panels-ui';
import debounce from 'lodash.debounce';
import FlipMove from 'react-flip-move';
import getViewportWidth from './get-viewport-width';
import MoveLeft from './move-left';
import React, { Component, PropTypes } from 'react';
import Route from '../panels/component';
import supportsPassiveEvents from './supports-passive-events';
import Waiting from 'waiting';

const DEBOUNCE = 250;
const LOADING_SIZE = 100;
const LOADING_OFFSET = LOADING_SIZE / -2;
const REBOUND = 500;

const scrollEventOptions = supportsPassiveEvents ? { passive: true } : false;

export class Runtime extends Component {
  state = {
    autoScroll: null,
    opacity: 1,
    presenter: null
  };

  componentDidMount() {
    this.$runtime.addEventListener('scroll', this.setX, scrollEventOptions);
    window.addEventListener('resize', this.setViewportWidth, false);
    window.addEventListener('orientationchange', this.setViewportWidth, false);
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;

    if (props.focusPanel !== nextProps.focusPanel || props.runtime.x !== nextProps.runtime.x) {
      this.toggleOpacityIfPresenting();
    }
  }

  componentDidUpdate(prevProps) {
    const { props } = this;

    if (props.focusPanel) {
      window.document.title = props.focusPanel.title || props.focusPanel.type;
    }

    if (prevProps.runtime.x !== props.runtime.x) {
      snapX(this.$runtime, props.runtime.x);
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
        this.$runtime.addEventListener('scroll', this.setX, scrollEventOptions);
        window.addEventListener('resize', this.setViewportWidth, false);
        window.addEventListener('orientationchange', this.setViewportWidth, false);
      }, REBOUND);
    }
  }

  present = (presenter = null) => {
    this.setState({
      opacity: presenter ? 0 : 1,
      presenter
    });
  }

  render() {
    const { opacity, presenter } = this.state;
    const { apps, canMoveLeft, focusPanel, moveLeft, navigate, panels, router, runtime, toggleExpand, updateSettings } = this.props;
    const { present } = this;

    const runtimeStyle = focusPanel ? {
      ...style,
      ...focusPanel.styleBackground
    } : style;

    return (
      <div ref={$e => this.$runtime = $e} style={runtimeStyle}>
        {canMoveLeft && <MoveLeft onClick={moveLeft} snapPoint={runtime.snapPoint} />}

        {presenter}

        <FlipMove
          enterAnimation='fade'
          leaveAnimation='fade'
          onClick={this.toggleOpacityIfPresenting}
          style={{
            flexDirection: 'row',
            height: '100%',
            opacity,
            overflowY: 'hidden',
            paddingLeft: runtime.snapPoint,
            transition: 'opacity 0.5s ease-in',
            width: runtime.width,
            willChange: 'scroll-position, opacity'
          }}
        >
          {router.routes.items.map((context, i) => {
            const route = router.routes.byContext[context];
            const app = apps[route.app];
            const panel = panels[route.panelId];

            return !route.isVisible ? null : (
              <Route
                isContext={i >= router.context}
                isFocus={i === router.focus}
                panel={panel}
                route={route}
                routeIndex={i}
                store={app.store}
                Type={app.types[panel.type]}
                zIndex={router.routes.items.length - i}
                navigate={navigate}
                key={context}
                present={present}
                router={router}
                toggleExpand={toggleExpand}
                updateSettings={updateSettings}
                width={route.width}
              />
            );
          })}
        </FlipMove>

        {router.isLoading ? (
          <div
            style={{
              justifyContent: 'center',
              left: router.routes.items.length ? LOADING_OFFSET : LOADING_OFFSET - runtime.snapPoint,
              marginTop: LOADING_OFFSET
            }}
          >
            <Waiting size={LOADING_SIZE} />
          </div>
          ) : null}
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
    }

    const nextX = this.$runtime.scrollLeft;
    if (Math.abs(this.props.runtime.x - nextX) > 5) {
      this.props.setX(nextX);
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
}

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
    apps: state.apps.byName,
    canMoveLeft: getCanMoveLeft(state),
    focusPanel: getFocusPanel(state),
    panels: state.panels.byId,
    router: state.router,
    runtime: state.runtime
  };
}

const mapDispatchToProps = {
  moveLeft,
  navigate,
  setViewportWidth,
  setX,
  toggleExpand,
  updateSettings
};
export default connect(mapStateToProps, mapDispatchToProps)(Runtime);
