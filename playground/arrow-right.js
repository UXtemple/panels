import React from 'react';

const ArrowRight = props => (
  <svg height="10px" viewBox="0 0 10 10" width="10px">
    <path fill={props.fill} d="M3.265,10.011c-0.236,0-0.473-0.083-0.664-0.252C2.189,9.392,2.151,8.76,2.517,8.347L5.489,5L2.517,1.653
      C2.151,1.24,2.188,0.608,2.601,0.241c0.414-0.366,1.045-0.329,1.412,0.084l3.561,4.011c0.336,0.379,0.336,0.949,0,1.328
      L4.013,9.675C3.816,9.897,3.541,10.011,3.265,10.011z"/>
  </svg>
);
ArrowRight.defaultProps = {
  fill: '#FFFFFF'
};
export default ArrowRight;
