import React, { Component } from 'react'

export default class Path extends Component {
  render() {
    const { props } = this
    return <path {...props} />
  }
}
