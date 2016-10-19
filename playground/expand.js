import ArrowLeft from './arrow-left.js';
import ArrowRight from './arrow-right.js';
import React, { PropTypes } from 'react';

const DIAMETER = 40;

const Expand = ({ style }, { route, toggleExpand }) => (
  <div style={style} onClick={toggleExpand}>
    {route.isExpanded ? <ArrowLeft /> : <ArrowRight />}
  </div>
);

Expand.contextTypes = {
  route: PropTypes.shape({
    isExpanded: PropTypes.bool
  }).isRequired,
  toggleExpand: PropTypes.func.isRequired
};

Expand.defaultProps = {
  style: {
    alignItems: 'center',
    backgroundColor: '#00ADEE',
    borderBottomLeftRadius: DIAMETER,
    borderTopLeftRadius: DIAMETER,
    bottom: 32,
    cursor: 'pointer',
    height: DIAMETER,
    justifyContent: 'center',
    paddingLeft: 3,
    position: 'absolute',
    right: 0,
    width: DIAMETER / 2,
    zIndex: 10000
  }
};

Expand.propTypes = {
  style: PropTypes.object
};

export default Expand;
