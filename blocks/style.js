import React, { PropTypes } from 'react'

const Style = props => (
  <style>
    {props.css}
  </style>
)
Style.propTypes = {
  css: PropTypes.string.isRequired
}
export default Style
