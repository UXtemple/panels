import React from 'react'

const G = ({ children, ...props }) => (
  <g {...props}>
    {children}
  </g>
)
export default G
