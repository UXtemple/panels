import { alignItemsCenter, justifyContentCenter } from 'browser-vendor-prefix';
import { ArrowLeft, ArrowRight } from 'panels-ui';
import React, { Component, PropTypes } from 'react';

export default class Expand extends Component {
  render() {
    return (
      <div style={style} onClick={() => this.context.toggleExpand()}>
        {this.props.isExpanded ? <ArrowLeft /> : <ArrowRight />}
      </div>
    );
  }
}
Expand.contextTypes = {
  toggleExpand: PropTypes.func
};

const DIAMETER = 40;
const style = {
  ...alignItemsCenter,
  backgroundColor: '#00ADEE',
  borderBottomLeftRadius: DIAMETER,
  borderTopLeftRadius: DIAMETER,
  bottom: 32,
  cursor: 'pointer',
  height: DIAMETER,
  ...justifyContentCenter,
  paddingLeft: 3,
  position: 'absolute',
  right: 0,
  width: DIAMETER / 2,
  zIndex: 1
};
