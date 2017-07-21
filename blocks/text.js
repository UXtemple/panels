import React from 'react'

const Text = ({ lineBreak, style, text, ...props }) => {
  const styleLine = { marginTop: lineBreak, minHeight: '1em' }
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

export default Text
