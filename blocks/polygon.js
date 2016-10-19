import React, { Component } from 'react'

export default class Polygon extends Component {
  render() {
    const { props } = this
    return <polygon {...props} />
  }
}
