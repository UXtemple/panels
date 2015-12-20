import { Action, Panel } from 'panels-ui';
import React from 'react';

export const types = {
  'Lightgreen': props => (
    <Panel style={{backgroundColor: 'lightyellow', width: props.width}}>
      <Action href='a'>{'/a'}</Action>
    </Panel>
  ),
  'Lightyellow': props => (
    <Panel style={{backgroundColor: 'lightgreen', width: props.width}}>
      <Action href='b'>{'/a/b'}</Action>
      <Action href='..'>..</Action>
    </Panel>
  ),
  'Lightblue': props => (
    <Panel style={{backgroundColor: 'lightblue', width: props.width}}>
      <Action href='c'>{'/a/b/c'}</Action>
      <Action href='..'>..</Action>
    </Panel>
  ),
  'Lightpink': props => (
    <Panel style={{backgroundColor: 'lightpink', width: props.width}}>
      <Action href='d'>{'/a/b/c/d'}</Action>
      <Action href='..'>..</Action>
    </Panel>
  ),
  'Fuchsia': props => (
    <Panel style={{backgroundColor: 'fuchsia', width: props.width}}>
      <Action href='..'>..</Action>
    </Panel>
  )
};

export const panels = {
  '/': {type: 'Lightgreen', background: {color: '#f2f2f2'}, title: 'main'},
  '/a': {type: 'Lightyellow'},
  '/a/b': {type: 'Lightblue', width: 720},
  '/a/b/c': {type: 'Lightpink'},
  '/a/b/c/d': {type: 'Fuchsia'}
};
