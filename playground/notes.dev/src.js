import Horizontal from '../../blocks/horizontal.js'
import React, { Component } from 'react';
import Vertical from '../../blocks/vertical.js'

const Notes = ({ width }) => (
  <Vertical style={{ backgroundColor: '#00ff00', fontFamily: 'sans-serif', fontSize: 125, padding: 20, width }}>
    Notes

    <Horizontal style={styleAction} teleportTo={'../content-1/note-1'}>Note 1 in Content 1</Horizontal>
    <Horizontal style={styleAction} teleportTo={'../content-1/note-2'}>Note 2 in Content 1</Horizontal>
    <Horizontal style={styleAction} teleportTo={'../content-2/note-3'}>Note 3 in Content 2</Horizontal>
    <Horizontal style={styleAction} teleportTo={'../content-2/note-4'}>Note 4 in Content 2</Horizontal>
    <Horizontal style={styleAction} teleportTo={'../content-2/note-5'}>Note 5 in Content 2</Horizontal>
  </Vertical>
);

const Note = ({ note, width }) => (
  <Vertical style={{ backgroundColor: '#00ff00', fontFamily: 'sans-serif', fontSize: 125, padding: 20, width }}>
    { note }
  </Vertical>
);

export const types = {
  Note,
  Notes
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
