import React, { PropTypes } from 'react';

const Text = ({ 'data-block': dataBlock, lineBreak, style, text }) => {
  const styleLine = { marginTop: lineBreak };

  return (
    <div data-block={dataBlock} style={style}>
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
