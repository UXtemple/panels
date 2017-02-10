import React, { Component, PropTypes } from 'react'
import Vertical from './vertical.js'

export default class Panel extends Component {
  render() {
    const { props } = this

    return (
      <Vertical
        aria-labelledby={props['aria-labelledby']}
        role={props.role}
        ref={props._ref}
        style={{
          height: '100%',
          overflowY: 'auto',
          ...props.style
        }}
      >
        {props.children}
      </Vertical>
    )
  }
}
Panel.propTypes = {
  _ref: PropTypes.func,
  style: PropTypes.object
}
