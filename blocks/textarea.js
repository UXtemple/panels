import React, { Component, PropTypes } from 'react';
import toCSS from 'style-to-css';
import uniqueId from 'mini-unique-id';

const PLACEHOLDER_PREFIXES = [
  '::-webkit-input-placeholder',
  '::-moz-placeholder',
  ':-ms-input-placeholder',
  ':placeholder-shown'
];

export default class Textarea extends Component {
  constructor(...args) {
    super(...args);
    this.id = `Textarea-${uniqueId()}`;
  }

  render() {
    const { id } = this;

    const {
      _ref, stylePlaceholder, styleHover, styleFocus, styleDisabled, text, ...rest
    } = this.props;

    const inlineStyle = [];
    if (stylePlaceholder) {
      PLACEHOLDER_PREFIXES.forEach(prefix => {
        inlineStyle.push(`#${id}${prefix} {${toCSS(stylePlaceholder)}}`);
      });
    }
    if (styleHover) {
      inlineStyle.push(`${inlineStyle} #${id}:hover {${toCSS(styleHover)}}`);
    }
    if (styleFocus) {
      inlineStyle.push(`#${id}:focus {${toCSS(styleFocus)}}`);
    }
    if (styleDisabled) {
      inlineStyle.push(`#${id}:disabled {${toCSS(styleDisabled)}}`);
    }
    // TODO remove when we normalise this
    if (!rest.value) {
      rest.defaultValue = text
    }

    return (
      <div>
        <style>{inlineStyle.join('\n')}</style>

        <textarea
          {...rest}
          id={id}
          ref={_ref}
        />
      </div>
    );
  }
}

Textarea.defaultProps = {
  style: {},
  styleDisabled: {},
  styleFocus: {},
  stylePlaceholder: {},
  text: ''
};
Textarea.propTypes = {
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  style: PropTypes.object,
  styleDisabled: PropTypes.object,
  styleFocus: PropTypes.object,
  stylePlaceholder: PropTypes.object,
  text: PropTypes.string.isRequired
};
