import { connect } from 'react-redux';
import { reset, setX } from './actions';
import canUseDOM from 'can-use-dom';
import debounce from 'lodash.debounce';
import getFocusPanel from '../panels/get-focus-panel';
import getViewportWidth from './get-viewport-width';
import MoveLeft from './move-left';
import Panels from '../panels/component';
import React, { Component } from 'react';
import shallowEqual from '../utils/shallow-equal';
import snap from './snap';

const DEBOUNCE = 50;

export class Runtime extends Component {
  componentDidMount() {
    if (canUseDOM) {
      this.setXDebounced = debounce(this.setX.bind(this), DEBOUNCE);
      this.refs.runtime.addEventListener('scroll', this.setXDebounced, false);

      this.setViewportWidthDebounced = debounce(this.setViewportWidth.bind(this), DEBOUNCE);
      window.addEventListener('resize', this.setViewportWidthDebounced, false);
      window.addEventListener('orientationchange', this.setViewportWidthDebounced, false);

      this.setViewportWidth();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.x !== prevProps.x) {
      snap(this.refs.runtime, this.props.x);
    }

    if (!shallowEqual(this.props.panels, prevProps.panels)) {
      this.props.dispatch(reset(this.props.preferredSnapPoint, undefined, this.props.isExpanded));
    }

    if (!shallowEqual(this.props.routes, prevProps.routes)) {
      this.props.dispatch(reset(this.props.preferredSnapPoint));
    }

    if (this.props.title !== prevProps.title) {
      window.document.title = this.props.title;
    }
  }

  componentWillUnmount() {
    if (canUseDOM) {
      this.refs.runtime.removeEventListener('scroll', this.setXDebounced);
      window.removeEventListener('resize', this.setViewportWidthDebounced, false);
      window.removeEventListener('orientationchange', this.setViewportWidthDebounced, false);
    }
  }

  render() {
    const { props } = this;

    const backgroundStyle = {};
    if (props.background) {
      if (props.background.image) {
        backgroundStyle.backgroundImage = `url(${props.background.image})`;

        if (props.background.size) {
          backgroundStyle.backgroundSize = props.background.size;
        }
      }

      if (props.background.color) {
        backgroundStyle.backgroundColor = props.background.color;
      }
    }

    return (
      <div className='runtime' ref='runtime' style={{...style, ...backgroundStyle}}>
        {!props.shouldGoMobile && props.x > 0 && <MoveLeft {...props} />}
        <Panels />
      </div>
    );
  }

  setViewportWidth() {
    this.props.dispatch(reset(this.props.preferredSnapPoint, getViewportWidth()));
  }

  setX() {
    this.props.dispatch(setX(this.refs.runtime.scrollLeft));
  }
}

const style = {
  overflowX: 'auto',
  overflowY: 'hidden',
  width: '100vw'
};

function mapStateToProps(state, props) {
  const focusPanel = getFocusPanel(state.router.routes, state.panels);
  let isExpanded = false;
  const panels = Object.keys(state.panels).map(k => {
    const panel = state.panels[k];
    isExpanded = isExpanded || panel.isExpanded;
    return panel.isExpanded ? panel.maxWidth : panel.width;
  });

  return {
    background: focusPanel.background,
    isExpanded,
    panels,
    routes: state.router.routes,
    snapPoint: state.runtime.snapPoint,
    shouldGoMobile: state.runtime.shouldGoMobile,
    title: focusPanel.title,
    x: state.runtime.x
  };
}
export default connect(mapStateToProps)(Runtime);
