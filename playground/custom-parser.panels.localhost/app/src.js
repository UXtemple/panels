import Horizontal from '../../../blocks/horizontal.js'
import React from 'react'
import PropTypes from 'prop-types'
import Vertical from '../../../blocks/vertical.js'

const Content = props => (
  <Vertical>
    custom-parser content {props.content}

    <Horizontal teleportTo='..'>
      back
    </Horizontal>

    <Horizontal teleportTo='http://trails.panels.localhost'>
      teleport
    </Horizontal>
  </Vertical>
)
Content.propTypes = {
  content: PropTypes.string
}
const Index = () => (
  <Vertical>
    custom-parser index
    <Horizontal teleportTo='some-content'>
      Some content
    </Horizontal>
  </Vertical>
)

export const types = {
  Content,
  Index
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
