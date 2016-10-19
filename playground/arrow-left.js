import React from 'react';

const ArrowLeft = props => (
  <svg height="10px" viewBox="0 0 10 10" width="10px">
    <path fill={props.fill} d="M6.826,10.011c0.236,0,0.473-0.083,0.664-0.252C7.903,9.392,7.941,8.76,7.574,8.347L4.603,5l2.971-3.347
      C7.94,1.24,7.903,0.608,7.49,0.241C7.076-0.125,6.444-0.087,6.078,0.325L2.517,4.336c-0.336,0.379-0.336,0.949,0,1.328
      l3.561,4.011C6.276,9.897,6.55,10.011,6.826,10.011z"/>
  </svg>
);
ArrowLeft.defaultProps = {
  fill: '#FFFFFF'
};
export default ArrowLeft;
