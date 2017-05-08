import React, { PropTypes } from 'react'

const Text = ({ lineBreak, style, text, ...props }) => {
  const styleLine = { marginTop: lineBreak }
  const children = /\n/.test(text)
    ? text
        .split('\n')
        .map((t, i) => <div key={i} style={i ? styleLine : undefined}>{t}</div>)
    : text

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
