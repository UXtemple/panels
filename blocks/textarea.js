import React, { Component } from 'react'
import PropTypes from 'prop-types'
import toCSS from 'style-to-css'
import uniqueId from 'mini-unique-id'

const PLACEHOLDER_PREFIXES = [
  '::-webkit-input-placeholder',
  '::-moz-placeholder',
  ':-ms-input-placeholder',
  ':placeholder-shown',
]

export default class Textarea extends Component {
  constructor(...args) {
    super(...args)
    this.id = `Textarea-${uniqueId()}`
  }

  render() {
    const { context, id } = this

    const {
      _ref,
      placeholder,
      stylePlaceholder,
      styleHover,
      styleFocus,
      styleDisabled,
      text,
      ...rest
    } = this.props

    const inlineStyle = []
    if (stylePlaceholder) {
      PLACEHOLDER_PREFIXES.forEach(prefix => {
        inlineStyle.push(`#${id}${prefix} {${toCSS(stylePlaceholder)}}`)
      })
    }
    if (styleHover) {
      inlineStyle.push(`${inlineStyle} #${id}:hover {${toCSS(styleHover)}}`)
    }
    if (styleFocus) {
      inlineStyle.push(`#${id}:focus {${toCSS(styleFocus)}}`)
    }
    if (styleDisabled) {
      inlineStyle.push(`#${id}:disabled {${toCSS(styleDisabled)}}`)
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
          placeholder={
            placeholder
              ? context.i18n ? context.i18n.t(placeholder) : placeholder
              : undefined
          }
        />
      </div>
    )
  }
}

Textarea.defaultProps = {
  style: {},
  styleDisabled: {},
  styleFocus: {},
  stylePlaceholder: {},
  text: '',
}

Textarea.contextTypes = {
  i18n: PropTypes.shape({
    t: PropTypes.func.isRequired,
  }),
}
