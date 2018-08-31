import Horizontal from '../../blocks/horizontal.js'
import React from 'react'
import Vertical from '../../blocks/vertical.js'

const SIZE = 64

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
}
const styleNext = {
  alignItems: 'center',
  backgroundColor: '#5eb75e',
  borderRadius: SIZE,
  boxShadow: '0px 0px 10px transparent',
  color: '#ffffff',
  cursor: 'pointer',
  fontFamily: 'sans-serif',
  fontSize: 16,
  height: SIZE,
  justifyContent: 'center',
  margin: 2.5,
  textAlign: 'center',
  textDecoration: 'none',
  textTransform: 'uppercase',
  width: SIZE
}
const styleNextActive = {
  boxShadow: '0px 0px 10px #f2f2f2'
}
const Content = ({ content, width }) => (
  <Vertical style={{ backgroundColor: '#000000', color: '#ffffff', fontFamily: 'sans-serif', fontSize: 125, padding: 20, width }}>
    { content }

    <Horizontal style={styleAction} to={'http://notes.localhost/note-1'}>Note 1</Horizontal>
    <Horizontal style={styleAction} to={'http://notes.localhost/note-2'}>Note 2</Horizontal>
  </Vertical>
)

const Launchpad = ({ panels: { router, runtime }, width }) => {
  const [ lCtx = '', mCtx = '', dCtx = '' ] = router.routes.items
  const base = mCtx.replace(lCtx, '')

  let notes = `${base}http://notes.localhost/`
  let toc = `${base}http://toc.localhost/`

  if (dCtx.indexOf(notes) !== -1) {
    notes = base
  }
  if (dCtx.indexOf(toc) !== -1) {
    toc = base
  }

  return (
    <Horizontal style={{ position: 'absolute', zIndex: 1, width }}>
      <Horizontal
        style={{
          ...styleNext,
          position: 'absolute',
          top: `calc(100vh - ${SIZE + 20}px)`,
          left: 20
        }}
        styleActive={styleNextActive}
        styleHover={styleNextActive}
        teleportTo={toc}
      >
        Toc
      </Horizontal>
      <Horizontal
        style={{
          ...styleNext,
          position: 'absolute',
          left: `calc(100vw - ${SIZE + 20}px)`,
          top: `calc(100vh - ${SIZE + 20}px)`
        }}
        styleActive={styleNextActive}
        styleHover={styleNextActive}
        teleportTo={notes}
      >
        Notes
      </Horizontal>
    </Horizontal>
  )
}



export const types = {
  Content,
  Launchpad
}

export const panels = {
  '/': {
    default: 'cover',
    style: {
      overflowY: 'none',
      position: 'absolute',
      zIndex: 1
    },
    type: 'Launchpad'
  },
  '/:content': {
    type: 'Content',
    width: '100%'
  }
}

export const lookup = [
  '/:content'
]

