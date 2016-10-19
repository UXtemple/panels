import React, { Component } from 'react'

export default class Circle extends Component {
  render() {
    const { props } = this
    return <circle {...props} />
  }
}
