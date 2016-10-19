import React, { Component } from 'react'

export default class Line extends Component {
  render() {
    const { props } = this
    return <line {...props} />
  }
}
