import React from 'react'

export class Panel extends React.Component {
  render() {
    const { props } = this

    return (
      <div
        aria-labelledby={props['aria-labelledby']}
        role={props.role}
        ref={props._ref}
        style={{
          height: '100%',
          overflowY: 'auto',
          ...props.style,
        }}
      >
        {props.children}
      </div>
    )
  }
}

export { snapX, snapY } from './utils/snap.js'
export const wrap = i => i
