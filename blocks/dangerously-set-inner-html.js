import React, { Component } from 'react'

export default class DangerouslySetInnerHTML extends Component {
  render() {
    const { props } = this

    return (
      <div
        dangerouslySetInnerHTML={{
          __html: props.html
        }}
        data-block={props['data-block']}
        ref={props._ref}
        style={props.style}
      />
    )
  }
}
