import ArrowLeft from '../../playground/arrow-left.js'
import React from 'react'

const DIAMETER = 40

const MoveLeft = ({ onClick, snapPoint }) => (
  <div
    onClick={onClick}
    style={{
      alignItems: 'center',
      backgroundColor: '#00ADEE',
      borderRadius: DIAMETER,
      bottom: 32,
      cursor: 'pointer',
      height: DIAMETER,
      justifyContent: 'center',
      left: snapPoint - DIAMETER / 2,
      position: 'fixed',
      width: DIAMETER,
      zIndex: 100000
    }}
  >
    <ArrowLeft />
  </div>
)
export default MoveLeft
