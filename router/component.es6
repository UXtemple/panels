import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { noSpeed } from '../animate/utils';
import { Panels } from 'panels-ui';
import animate from '../animate';
import App from '../apps/component';
import canUseDOM from 'can-use-dom';
import debounce from 'lodash.debounce';
import getFocusPanel from '../panels/get-focus-panel';
import panelShape from '../panels/panel-shape';
import raf from 'raf';
import React, { Component, PropTypes } from 'react';
import routeShape from './route-shape';

const UPDATE_PUSH_LEFT_INTERVAL = 50;

class Router extends Component {
  animationState = {
    endValue: 0,
    rafId: null,
    temp: {}
  };

  cancelRaf() {
    cancelAnimationFrame(this.animationState.rafId);
    this.animationState.rafId = null;
  }

  componentDidMount() {
    this.updatePushLeft();
    findDOMNode(this.refs.container).scrollLeft = findDOMNode(this.refs.last).offsetLeft;

    this.updatePushLeftDebounced = debounce(() => this.updatePushLeft(), UPDATE_PUSH_LEFT_INTERVAL);
    window.addEventListener('resize', this.updatePushLeftDebounced, false);
    window.addEventListener('orientationchange', this.updatePushLeftDebounced, false);

    this.updateTitle();
  }

  componentDidUpdate(prevProps) {
    this.animationState.temp = {
      currV: 0,
      currVals: findDOMNode(this.refs.container).scrollLeft,
      now: null
    };

    this.updatePushLeft();
    this.animationState.endValue = findDOMNode(this.refs.last).offsetLeft;
    this.raf(true, false);

    this.updateTitle();
  }

  componenWillUnmount() {
    this.cancelRaf();
    window.removeEventListener('resize', this.updatePushLeftDebounced);
    window.removeEventListener('orientationchange', this.updatePushLeftDebounced);
  }

  raf(justStarted, isLastRaf) {
    if (justStarted && this.animationState.rafId !== null) {
      return;
    }
    this.animationState.rafId = raf(() => {
      this.animationState.temp = animate(this.animationState.temp, {endValue: this.animationState.endValue, justStarted});

      findDOMNode(this.refs.container).scrollLeft = this.animationState.temp.currVals;

      const stop = noSpeed(this.animationState.temp.currV);
      if (stop && !justStarted) {
        if (isLastRaf) {
          this.animationState.rafId = null;
        } else {
          this.raf(false, true);
        }
      } else {
        this.raf(false, false);
      }
    });
  }

  render() {
    const { dispatch, focusPanel, routes } = this.props;

    let containerStyle = {...style.container};
    if (focusPanel && focusPanel.background) {
      if (focusPanel.background.image) {
        containerStyle.backgroundImage = `url(${focusPanel.background.image})`;

        if (focusPanel.background.size) {
          containerStyle.backgroundSize = focusPanel.background.size;
        }
      }

      if (focusPanel.background.color) {
        containerStyle.backgroundColor = focusPanel.background.color;
      }
    }

    return (
      <div style={containerStyle} ref='container' onWheel={::this.cancelRaf}>
        <div ref='pushLeft' style={style.pushLeft} />
        <Panels>
          {routes.map((route, i) => <App key={route.context} dispatch={dispatch} route={route} ref={i === routes.length - 1 && 'last'} />)}
        </Panels>
        <div style={style.pushRight} />
      </div>
    );
  }

  updatePushLeft() {
    findDOMNode(this.refs.pushLeft).style.width =
      `calc(50vw - ${findDOMNode(this.refs.last).getClientRects()[0].width / 2}px)`;
  }

  updateTitle() {
    if (canUseDOM) {
      document.title = this.props.focusPanel.title;
    }
  }

  static defaultProps = {
    routes: []
  }

  static propTypes = {
    focusPanel: PropTypes.oneOfType([PropTypes.bool, panelShape]),
    routes: PropTypes.arrayOf(routeShape),
  }
}

function mapStateToProps(state) {
  const routes = state.router.routes;

  const focusPanel = getFocusPanel(routes, state.panels);
  const focusPanelApp = routes[routes.length - 1].app;
  const focusPanelAppState = state.apps.byDomain[focusPanelApp].store.getState();

  return {
    focusPanel: prepare(focusPanel, focusPanelAppState),
    routes
  };
}

export default connect(mapStateToProps)(Router);

const style = {
  container: {
    WebkitBoxOrient: 'horizontal',
    WebkitBoxDirection: 'normal',
    WebkitFlexDirection: 'row',
    msFlexDirection: 'row',
    flexDirection: 'row',
    overflowX: 'auto',
    overflowY: 'hidden',
    WebkitOverflowScrolling: 'touch'
  },
  pushLeft: {
    width: 'calc(50vw - 180px)'
  },
  pushRight: {
    width: '100vw'
  }
};
