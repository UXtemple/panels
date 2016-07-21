import { Expand, Teleport, Panel, wrap } from 'panels-ui';
import React, { Component } from 'react';

const SIZE = 45;

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
const styleBack = {
  backgroundColor: '#000000',
  borderRadius: SIZE,
  color: '#ffffff',
  cursor: 'pointer',
  fontFamily: 'sans-serif',
  fontSize: 10,
  height: SIZE,
  justifyContent: 'center',
  margin: 2.5,
  textAlign: 'center',
  textDecoration: 'none',
  textTransform: 'uppercase',
  width: SIZE
};
const styleNext = {
  backgroundColor: '#00ff00',
  borderRadius: SIZE,
  color: '#ffffff',
  cursor: 'pointer',
  fontFamily: 'sans-serif',
  fontSize: 10,
  height: SIZE,
  justifyContent: 'center',
  margin: 2.5,
  textAlign: 'center',
  textDecoration: 'none',
  textTransform: 'uppercase',
  width: SIZE
};

const Notes = ({ note }) => (
  <Panel style={{ backgroundColor: '#00ff00', fontFamily: 'sans-serif', fontSize: 125, padding: 20 }}>
    { note ? `Note ${note}` : 'Notes' }

    <Teleport style={styleAction} to={'../../content-1/note-1'}>Note 1 in Content 1</Teleport>
    <Teleport style={styleAction} to={'../../content-1/note-2'}>Note 2 in Content 1</Teleport>
    <Teleport style={styleAction} to={'../../content-2/note-3'}>Note 3 in Content 2</Teleport>
    <Teleport style={styleAction} to={'../../content-2/note-4'}>Note 4 in Content 2</Teleport>
    <Teleport style={styleAction} to={'../../content-2/note-5'}>Note 5 in Content 2</Teleport>
  </Panel>
);
const NotesBack = () => <div style={styleBack}>Notes</div>;

const Content = ({ content }) => (
  <Panel style={{ backgroundColor: '#000000', color: '#ffffff', fontFamily: 'sans-serif', fontSize: 125, padding: 20 }}>
    { content }

    <Teleport style={styleAction} to={'note-1'}>Note 1</Teleport>
    <Teleport style={styleAction} to={'note-2'}>Note 2</Teleport>
  </Panel>
);
const ContentBack = ({ content }) => <div style={styleBack}>{ content }</div>;
const ContentNext = () => (
  <div style={{ flexDirection: 'row' }}>
    <Teleport style={styleNext} to={'task'}>Task</Teleport>
    <Teleport style={styleNext} to={'notes'}>Notes</Teleport>
  </div>
);

const Task = () => (
  <Panel style={{ backgroundColor: '#ff0000', fontFamily: 'sans-serif', fontSize: 125, padding: 20 }}>
    Task
  </Panel>
);
const TaskBack = () => <div style={styleBack}>Task</div>;
const TaskNext = () => <Teleport style={styleNext} to={'even-more'}>EvenMore</Teleport>;

const EvenMore = () => (
  <Panel style={{ backgroundColor: '#00ff00', fontFamily: 'sans-serif', fontSize: 125, padding: 20 }}>
    Even more
  </Panel>
);
const EvenMoreBack = () => <div style={styleBack}>EvenMore</div>;

const Toc = () => (
  <Panel style={{ backgroundColor: '#0000ff', color: '#ffffff', fontFamily: 'sans-serif', fontSize: 125, padding: 20 }}>
    Toc

    <Teleport style={styleAction} to={'content-1'}>Content 1</Teleport>
    <Teleport style={styleAction} to={'content-2'}>Content 2</Teleport>
  </Panel>
);
const TocBack = () => <div style={styleBack}>Toc</div>;

export const types = {
  'Notes': wrap(Notes),
  'NotesBack': wrap(NotesBack),

  'Content': wrap(Content),
  'ContentBack': wrap(ContentBack),
  'ContentNext': wrap(ContentNext),

  'Task': wrap(Task),
  'TaskBack': wrap(TaskBack),
  'TaskNext': wrap(TaskNext),

  'EvenMore': wrap(EvenMore),
  'EvenMoreBack': wrap(EvenMoreBack),

  'Toc': wrap(Toc),
  'TocBack': wrap(TocBack)
}

export const panels = {
  '/': {
    back: 'TocBack',
    type: 'Toc'
  },
  '/:content': {
    back: 'ContentBack',
    next: 'ContentNext',
    type: 'Content',
    width: '100%'
  },
  '/:content/notes': {
    back: 'NotesBack',
    type: 'Notes'
  },
  '/:content/note-:note': {
    back: 'NotesBack',
    type: 'Notes'
  },
  '/:content/task': {
    back: 'TaskBack',
    next: 'TaskNext',
    type: 'Task'
  },
  '/:content/task/even-more': {
    back: 'EvenMoreBack',
    type: 'EvenMore'
  }
};

export const lookup = [
  '/:content/notes',
  '/:content/task',
  '/:content/task/even-more',
  '/:content/note-:note',
  '/:content'
];
