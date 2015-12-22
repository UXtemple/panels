import { alignItemsCenter, justifyContentCenter } from 'browser-vendor-prefix';
import { moveLeft } from './actions';
import React from 'react';

const MoveLeft = props => (
  <div onClick={() => props.dispatch(moveLeft())} style={style}>
    BACK
  </div>
);
export default MoveLeft;

const style = {
  ...alignItemsCenter,
  backgroundColor: 'rgba(0,0,0,0.3)',
  borderRadius: 64,
  bottom: 20,
  color: 'white',
  cursor: 'pointer',
  fontFamily: 'sans-serif',
  fontSize: 10,
  fontWeight: 'bold',
  height: 64,
  left: 13,
  ...justifyContentCenter,
  position: 'fixed',
  width: 64,
  zIndex: 1
};
