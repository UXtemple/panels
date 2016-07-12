import { connect } from 'react-redux';
import { moveLeft, setViewportWidth, setX } from '../actions';
import { navigate, toggleExpand, updateSettings } from '../../actions';
import { snapX } from 'panels-ui';
import debounce from 'lodash.debounce';
import getViewportWidth from '../get-viewport-width';
import React, { Component, PropTypes } from 'react';
import Route from '../../route';
import Waiting from 'waiting';

const DEBOUNCE = 250;
const LOADING_SIZE = 100;
const LOADING_OFFSET = LOADING_SIZE / -2;
const REBOUND = 500;

export class Runtime extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.setViewportWidth, false);
    window.addEventListener('orientationchange', this.setViewportWidth, false);
    document.addEventListener('visibilitychange', this.onVisibilityChange);
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
    window.removeEventListener('resize', this.setViewportWidth);
    window.removeEventListener('orientationchange', this.setViewportWidth);
  }

  onVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      window.removeEventListener('resize', this.setViewportWidth);
      window.removeEventListener('orientationchange', this.setViewportWidth);
    } else {
      setTimeout(() => {
        window.addEventListener('resize', this.setViewportWidth, false);
        window.addEventListener('orientationchange', this.setViewportWidth, false);
      }, REBOUND);
    }
  }

  render() {
    const { apps, canMoveLeft, focusPanel, moveLeft, navigate, panels, router, runtime, toggleExpand, updateSettings } = this.props;

    const runtimeStyle = focusPanel ? {
      ...style,
      ...focusPanel.styleBackground
    } : style;

    const topBarHeight = 50;

    return (
      <div ref={$e => this.$runtime = $e} style={runtimeStyle}>
        <div
          style={{
            height: topBarHeight,
            width: '100%'
          }}
        >
          <div onClick={moveLeft}>left</div>
          topbar
        </div>
        <div
          style={{
            flexDirection: 'row',
            height: `calc(100% - ${topBarHeight}px)`,
            overflow: 'hidden',
            width: '100%'
          }}>
          {router.routes.items.map((context, i) => {
            const route = router.routes.byContext[context];
            const app = apps[route.app];
            const panel = panels[route.panelId];

            return !route.isVisible ? null : (
              <Route
                isContext={i >= router.context}
                isFocus={i === router.focus}
                key={context.replace(/[()]/g, '')}
                navigate={navigate}
                panel={panel}
                route={route}
                routeIndex={i}
                router={router}
                store={app.store}
                toggleExpand={toggleExpand}
                type={app.types[panel.type]}
                updateSettings={updateSettings}
                x={runtime.x}
                width={route.width}
                zIndex={router.routes.items.length - i}
              />
            );
          })}
          {router.isLoading ? (
            <div
              style={{
                justifyContent: 'center',
                left: LOADING_OFFSET,
                marginTop: LOADING_OFFSET
              }}
            >
              <Waiting size={LOADING_SIZE} />
            </div>
            ) : null}
        </div>
      </div>
    );
  }

  setViewportWidth = debounce(() => this.props.setViewportWidth(getViewportWidth()), DEBOUNCE)
}

const style = {
  height: '100%',
  overflow: 'hidden',
  width: '100%'
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
