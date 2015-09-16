import DEFAULT_PANEL_WIDTH from './default-panel-width';
import React, { Component, PropTypes } from 'react';
import widthShape from './width-shape';

export default class Panel extends Component {
  render() {
    const { children, style, width } = this.props;
    const panelStyle = {
      ...baseStyle,
      ...style,
      width
    };

    return <div className='Panel' style={panelStyle}>{children}</div>;
  }

  static defaultProps = {
    style: {},
    width: DEFAULT_PANEL_WIDTH
  }

  static propTypes = {
    style: PropTypes.object,
    width: widthShape.isRequired
  }
}

const baseStyle = {
  msFlexAlign: 'center',
  WebkitBoxAlign: 'center',
  WebkitAlignItems: 'center',
  alignItems: 'center',
  height: '100vh',
  msOverflowStyle: 'none',
  overflowX: 'auto'
};
