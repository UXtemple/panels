import React from 'react';
import PropTypes from 'prop-types';

const Text = ({style, text, ...props}, context) => {
  const finalStyle = {
    whiteSpace: 'pre-line',
    ...style,
  };
  return (
    <div {...props} style={finalStyle}>
      {context.i18n ? context.i18n.t(text) : text}
    </div>
  );
};
Text.contextTypes = {
  i18n: PropTypes.shape({
    t: PropTypes.func.isRequired,
  }),
};

Text.defaultProps = {
  style: {},
  text: '',
};

export default Text;
