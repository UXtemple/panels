import React from 'react';

const Text = ({ style, text, ...props }) => {
  const finalStyle = {
    whiteSpace: 'pre-line',
    ...style,
  };
  return (
    <div {...props} style={finalStyle}>
      {text}
    </div>
  );
};

Text.defaultProps = {
  style: {},
  text: '',
};

export default Text;
