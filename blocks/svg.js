import React, { Component, PropTypes } from 'react'

export default class Svg extends Component {
  render() {
    const { children, ...props } = this.props
    return (
      <svg {...props}>
        {children}
      </svg>
    )
  }
}
Svg.propTypes = {
  blocks: PropTypes.array
}
