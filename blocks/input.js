import React from 'react';
import PropTypes from 'prop-types';
import toCSS from 'style-to-css';
import uniqueId from 'mini-unique-id';

const PLACEHOLDER_PREFIXES = [
  '::-webkit-input-placeholder',
  '::-moz-placeholder',
  ':-ms-input-placeholder',
  ':placeholder-shown',
];

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.id = `Input-${uniqueId()}`;
  }

  render() {
    const {context, id} = this;
    const {
      disabled,
      onEnter,
      placeholder,
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
      const finalOnEnter =
        typeof onEnter === 'function' ? onEnter : () => console.log(onEnter);
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
          placeholder={
            placeholder ? context.i18n ? (
              context.i18n.t(placeholder)
            ) : (
              placeholder
            ) : (
              undefined
            )
          }
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

Input.contextTypes = {
  i18n: PropTypes.shape({
    t: PropTypes.func.isRequired,
  }),
};