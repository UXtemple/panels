import React, { Component, PropTypes } from 'react'

export default class G extends Component {
  render() {
    const { children, ...props } = this.props
    return (
      <g {...props}>
        {children}
      </g>
    )
  }
}
G.propTypes = {
  blocks: PropTypes.array
}
