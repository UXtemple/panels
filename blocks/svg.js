import React from 'react'

const Svg = ({ children, ...props }) => (
  <svg focusable={props.focusable || false} {...props}>
    {children}
  </svg>
)
export default Svg
