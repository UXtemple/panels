import { Horizontal } from 'usepages-blocks'
import { Panel, wrap } from 'panels-ui'
import React, { PropTypes } from 'react'

const Content = props => (
  <Panel>
    custom-parser content {props.content}

    <Horizontal teleportTo='..'>
      back
    </Horizontal>

    <Horizontal teleportTo='http://trails.panels.dev'>
      teleport
    </Horizontal>
  </Panel>
)
Content.propTypes = {
  content: PropTypes.string
}
const Index = () => (
  <Panel>
    custom-parser index
    <Horizontal teleportTo='some-content'>
      Some content
    </Horizontal>
  </Panel>
)

export const types = {
  Content: wrap(Content),
  Index: wrap(Index)
}

export const panels = {
  '/': {
    type: 'Index'
  },
  '/:content': {
    type: 'Content'
  }
}

export const lookup = [
  '/:content'
]
