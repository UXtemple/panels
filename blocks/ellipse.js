import React, { Component } from 'react'

export default class Ellipse extends Component {
  render() {
    const { props } = this
    return <ellipse {...props} />
  }
}
