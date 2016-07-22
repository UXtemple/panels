import { Teleport, Panel, wrap } from 'panels-ui';
import { Horizontal } from 'usepages-blocks';
import normaliseUri from 'panels-normalise-uri';
import React, { Component, PropTypes } from 'react';

class Content extends Component {
  isActive = path => {
    const { route, router } = this.props.panels;
    return normaliseUri(`${route.context}${path}`) === router.uri;
  }

  getChildContext() {
    return {
      isActive: this.isActive
    }
  }

  render() {
    const { content } = this.props;

    return (
      <Panel style={{ backgroundColor: '#000000', color: '#ffffff', fontFamily: 'sans-serif', fontSize: 125, padding: 20 }}>
        { content }

        <Horizontal
          style={styleAction}
          styleActive={styleActionActive}
          styleHover={styleActionActive}
          teleportTo={'http://notes.dev/note-1'}
        >
          Note 1
        </Horizontal>
        <Horizontal
          style={styleAction}
          styleActive={styleActionActive}
          styleHover={styleActionActive}
          teleportTo={'http://notes.dev/note-2'}
        >
          Note 2
        </Horizontal>
      </Panel>
    );
  }
}
Content.childContextTypes = {
  isActive: PropTypes.func
}

const LAUNCHPAD_HEIGHT = 50;
const Launchpad = ({ panels: { router } }) => {
  const [ lCtx = '', mCtx = '', dCtx = '' ] = router.routes.items;
  const base = mCtx.replace(lCtx, '');

  let notes = `${base}http://notes.dev/`;
  let toc = `${base}http://toc.dev/`;

  if (dCtx.indexOf(notes) !== -1) {
    notes = base;
  }
  if (dCtx.indexOf(toc) !== -1) {
    toc = base;
  }

  return (
    <Horizontal style={{ backgroundColor: '#323232', height: LAUNCHPAD_HEIGHT }}>
      <Horizontal
        style={{
          ...styleNext,
          marginLeft: 20
        }}
        styleActive={styleNextActive}
        styleHover={styleNextActive}
        teleportTo={toc}
      >
        Toc
      </Horizontal>
      <Horizontal style={{flex: 1}} />
      <Horizontal
        style={{
          ...styleNext,
          marginRight: 20
        }}
        styleActive={styleNextActive}
        styleHover={styleNextActive}
        teleportTo={notes}
      >
        Notes
      </Horizontal>
    </Horizontal>
  );
}

export const types = {
  'Content': wrap(Content),
  'Launchpad': wrap(Launchpad)
};

export const panels = {
  '/': {
    default: () => 'cover',
    height: LAUNCHPAD_HEIGHT,
    type: 'Launchpad'
  },
  '/:content': {
    type: 'Content',
    width: '100%'
  }
};

export const lookup = [
  '/:content'
];

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
const styleActionActive = {
  backgroundColor: '#323232',
  color: '#f0f0f0'
};
const styleNext = {
  alignItems: 'center',
  color: '#ffffff',
  cursor: 'pointer',
  fontFamily: 'sans-serif',
  fontSize: 16,
  justifyContent: 'center',
  textAlign: 'center',
  textDecoration: 'none',
  textTransform: 'uppercase'
};
const styleNextActive = {
  textShadow: '0px 0px 10px #f2f2f2'
};
