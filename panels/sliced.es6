import { Action } from 'panels-ui';
import getHrefToUnsliceUri from '../router/get-href-to-unslice-uri';
import React from 'react';

const Sliced = props => (
  <Action href={getHrefToUnsliceUri(props.route, props.uri)} style={{...style.wrapper, width: props.width}}>
    <div style={style.content}>
      {props.title || props.route.path}
    </div>
  </Action>
);
export default Sliced;

const style = {
  wrapper: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white'
  },
  content: {
    alignSelf: 'center',
    transform: 'rotate(90deg)'
  }
}
