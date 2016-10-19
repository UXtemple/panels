import Horizontal from './horizontal.js'
import React, { PropTypes } from 'react'

const animation = `@keyframes scaleout {
  0% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 100% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
    opacity: 0;
  }
}`

const Knocking = ({ 'data-block': dataBlock, size, style = {} }) => {
  const finalStyle = {
    animation: 'scaleout 1.0s infinite linear',
    backgroundColor: style.color,
    borderRadius: size,
    height: size,
    WebkitAnimation: 'scaleout 1.0s infinite linear',
    width: size,
    ...style
  }

  return (
    <Horizontal
      data-block={dataBlock}
      style={finalStyle}
    >
      <style>{animation}</style>
    </Horizontal>
  )
}

Knocking.defaultProps = {
  style: {
    color: '#323232'
  },
  size: 32
}

Knocking.propTypes = {
  style: PropTypes.object,
  size: PropTypes.number.isRequired
}

export default Knocking
