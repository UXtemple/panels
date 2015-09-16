import canUseDOM from 'can-use-dom';
import debounce from 'lodash.debounce';
import getPanelWidth from './get-panel-width';
import React, { Children, cloneElement, Component } from 'react';

const hideScrollbars = <style>{'.Panel::-webkit-scrollbar { width: 0 !important; }'}</style>;

const style = {
  msFlexDirection: 'row',
  WebkitBoxOrient: 'horizontal',
  WebkitBoxDirection: 'normal',
  WebkitFlexDirection: 'row',
  flexDirection: 'row',
  height: '100vh',
  minWidth: '100vw',
  overflowY: 'hidden'
};

const UPDATE_PANEL_WIDTH_INTERVAL = 50;

export default class Panels extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: getPanelWidth()
    }
  }

  componentWillMount() {
    this.updatePanelWidth = debounce(() => this.setState({width: getPanelWidth()}), UPDATE_PANEL_WIDTH_INTERVAL);

    if (canUseDOM) {
      window.addEventListener('resize', this.updatePanelWidth, false);
      window.addEventListener('orientationchange', this.updatePanelWidth, false);
    }
  }

  componentWillUnmount() {
    if (canUseDOM) {
      window.removeEventListener('resize', this.updatePanelWidth);
      window.removeEventListener('orientationchange', this.updatePanelWidth);
    }
  }

  render() {
    const { children } = this.props;
    const { width } = this.state;

    return (
      <div style={style}>
        {hideScrollbars}
        {Children.map(children, child => cloneElement(child, {width}))}
      </div>
    );
  }
}
