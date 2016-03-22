import { alignItemsCenter, justifyContentCenter } from 'browser-vendor-prefix';
import { ArrowLeft } from 'panels-ui';
import { moveLeft } from './actions';
import React from 'react';

const DIAMETER = 40;

const MoveLeft = props => (
  <div onClick={() => props.dispatch(moveLeft())} style={{...style, left: props.snapPoint - DIAMETER / 2}}>
    <ArrowLeft />
  </div>
);
export default MoveLeft;

const style = {
  ...alignItemsCenter,
  backgroundColor: '#00ADEE',
  borderRadius: DIAMETER,
  bottom: 32,
  cursor: 'pointer',
  height: DIAMETER,
  ...justifyContentCenter,
  position: 'fixed',
  width: DIAMETER,
  zIndex: 10
};
