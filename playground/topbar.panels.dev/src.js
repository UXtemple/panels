import { Expand, Teleport, Panel, wrap } from 'panels-ui';
import React from 'react';

export const types = {
  'Home': wrap(() => <Panel>Home</Panel>)
}

export const panels = {
  '/': {
    type: 'Home'
  }
}
