import { Action, Panel } from 'panels-ui';
import React, { PropTypes } from 'react';

const ACTION = 'action';
const TITLE = 'title';
const TEXT = 'text';

export default props => (
  <Panel style={props.style} width={props.width}>
    {props.blocks.length ?
      props.blocks.map(block) :
      'empty!'}
  </Panel>
);

const block = (block, i) => {
  const { data } = block;

  switch (block.element) {
    case ACTION:  return <Action activeStyle={activeStyle} key={i} href={data.href} title={data.text}>{data.text}</Action>;
    case TEXT:    return <p key={i}>{data.text}</p>;
    case TITLE:   return <h1 key={i}>{data.text}</h1>;
    default:      return <div key={i}>{JSON.stringify(data)}</div>;
  }
}

const activeStyle = {
  backgroundColor: 'red'
}
