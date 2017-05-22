import React, { Component, PropTypes } from 'react';
import toCSS from 'style-to-css';
import uniqueId from 'mini-unique-id';

const PLACEHOLDER_PREFIXES = [
  '::-webkit-input-placeholder',
  '::-moz-placeholder',
  ':-ms-input-placeholder',
  ':placeholder-shown',
];

export default class Input extends Component {
  constructor(...args) {
    super(...args);
    this.id = `Input-${uniqueId()}`;
  }

  render() {
    const { id } = this;
    const {
      disabled,
      onEnter,
      _ref,
      style,
      styleDisabled,
      styleFocus,
      styleHover,
      stylePlaceholder,
      styleWrapper,
      ...rest
    } = this.props;

    let finalStyle = style;

    const backgroundColor = (style && style.backgroundColor) || 'transparent';
    const color = (style && style.color) || 'black';
    const inlineStyle = [
      `#${id}:-webkit-autofill {
      background-color: ${backgroundColor} !important;
      box-shadow: 0 0 0px 1000px ${backgroundColor} inset;
      color: ${color} !important;
    }`,
    ];

    if (stylePlaceholder) {
      PLACEHOLDER_PREFIXES.forEach(prefix => {
        inlineStyle.push(`#${id}${prefix} {${toCSS(stylePlaceholder)}}`);
      });
    }

    if (styleDisabled && disabled) {
      finalStyle = {
        ...style,
        ...styleDisabled,
      };
    } else {
      if (styleHover) {
        inlineStyle.push(`${inlineStyle} #${id}:hover {${toCSS(styleHover)}}`);
      }
      if (styleFocus) {
        inlineStyle.push(`#${id}:focus {${toCSS(styleFocus)}}`);
      }
    }

    let onKeyUp;
    if (typeof onEnter !== 'undefined') {
      /* eslint-disable no-console */
      const finalOnEnter = typeof onEnter === 'function'
        ? onEnter
        : () => console.log(onEnter);
      onKeyUp = event => event.key === 'Enter' && finalOnEnter(event);
    }

    return (
      <div style={styleWrapper}>
        <style>{inlineStyle.join('\n')}</style>
        <input
          {...rest}
          autoComplete="off"
          id={id}
          onKeyUp={onKeyUp}
          ref={_ref}
          style={finalStyle}
        />
      </div>
    );
  }
}

Input.defaultProps = {
  placeholder: '',
  style: {},
  styleHover: {},
  styleWrapper: {},
  type: 'text',
};

Input.propTypes = {
  onEnter: PropTypes.func,
  placeholder: PropTypes.string,
  _ref: PropTypes.func,
  style: PropTypes.object,
  styleFocus: PropTypes.object,
  styleHover: PropTypes.object,
  stylePlaceholder: PropTypes.object,
  styleWrapper: PropTypes.object,
  type: PropTypes.string.isRequired,
};
