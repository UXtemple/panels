import { alignItemsCenter, justifyContentCenter } from 'browser-vendor-prefix';
import { toggleShouldExpandFocus } from './actions';
import React from 'react';

const ExpandFocus = props => (
  <div onClick={() => props.dispatch(toggleShouldExpandFocus())} style={style}>
    {props.shouldExpandFocus ? 'SHRINK' : 'EXPAND'}
  </div>
);
export default ExpandFocus;

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
  ...justifyContentCenter,
  right: 13,
  position: 'fixed',
  width: 64,
  zIndex: 1
};
