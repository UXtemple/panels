import React from 'react'

const DangerouslySetInnerHTML = props => (
  <div
    dangerouslySetInnerHTML={{
      __html: props.html,
    }}
    data-block={props['data-block']}
    ref={props._ref}
    style={props.style}
  />
)
export default DangerouslySetInnerHTML
