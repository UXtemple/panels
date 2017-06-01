import React from 'react'

const Svg = ({ children, ...props }) => (
  <svg {...props}>
    {children}
  </svg>
)
export default Svg
