import React, { Component } from 'react'

export default class Rect extends Component {
  render() {
    const { props } = this
    return <rect {...props} />
  }
}
