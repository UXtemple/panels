import React, { PropTypes } from 'react';

const Text = ({ lineBreak, style, text, ...props }) => {
  const styleLine = { marginTop: lineBreak };

  return (
    <div {...props} style={style}>
      {`${text}`.split('\n').map((t, i) => (
        <div key={i} style={i ? styleLine : undefined}>{t}</div>
      ))}
    </div>
  );
};

Text.defaultProps = {
  lineBreak: 10,
  style: {},
  text: ''
};

Text.propTypes = {
  lineBreak: PropTypes.number,
  style: PropTypes.object,
  text: PropTypes.string.isRequired
};

export default Text;
