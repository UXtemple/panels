import React, { Component } from 'react'

export default class Polyline extends Component {
  render() {
    const { props } = this
    return <polyline {...props} />
  }
}
