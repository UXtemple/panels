import React, { PropTypes } from 'react'

const Text = ({ lineBreak, style, text, ...props }) => {
  const styleLine = { marginTop: lineBreak }
  const splitText = `${text}`.split('\n')
  const children = splitText.length === 0
    ? text
    : splitText.map((t, i) => (
        <div key={i} style={i ? styleLine : undefined}>{t}</div>
      ))

  return (
    <div {...props} style={style}>
      {children}
    </div>
  )
}

Text.defaultProps = {
  lineBreak: 10,
  style: {},
  text: '',
}

Text.propTypes = {
  lineBreak: PropTypes.number,
  style: PropTypes.object,
  text: PropTypes.string.isRequired,
}

export default Text
