import { Teleport, Panel, wrap } from 'panels-ui';
import React, { Component } from 'react';

const Notes = ({ note, panels: { route } }) => (
  <Panel style={{ backgroundColor: '#00ff00', fontFamily: 'sans-serif', fontSize: 125, padding: 20, width: route.width }}>
    Notes

    <Teleport style={styleAction} to={'../content-1/note-1'}>Note 1 in Content 1</Teleport>
    <Teleport style={styleAction} to={'../content-1/note-2'}>Note 2 in Content 1</Teleport>
    <Teleport style={styleAction} to={'../content-2/note-3'}>Note 3 in Content 2</Teleport>
    <Teleport style={styleAction} to={'../content-2/note-4'}>Note 4 in Content 2</Teleport>
    <Teleport style={styleAction} to={'../content-2/note-5'}>Note 5 in Content 2</Teleport>
  </Panel>
);

const Note = ({ note, panels: { route } }) => (
  <Panel style={{ backgroundColor: '#00ff00', fontFamily: 'sans-serif', fontSize: 125, padding: 20, width: route.width }}>
    { note }
  </Panel>
);

export const types = {
  'Note': wrap(Note),
  'Notes': wrap(Notes)
}

export const panels = {
  '/': {
    dockLeft: false,
    type: 'Notes',
    width: 360
  },
  '/:note': {
    dockLeft: false,
    type: 'Note',
    width: 360
  }
};

export const lookup = [
  '/:note'
];

const styleAction = {
  backgroundColor: '#f0f0f0',
  borderRadius: 5,
  color: '#000000',
  cursor: 'pointer',
  fontFamily: 'sans-serif',
  fontSize: 20,
  justifyContent: 'center',
  margin: 2.5,
  padding: '10px 20px',
  textDecoration: 'none',
  textTransform: 'uppercase'
};
