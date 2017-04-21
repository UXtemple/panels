import normaliseUri from '../utils/normalise-uri/index.js'
import React, { Component, PropTypes } from 'react'
import toCSS from 'style-to-css'
import uniqueId from 'mini-unique-id'

export default class Teleport extends Component {
  constructor(props, context) {
    super(props, context)
    this.className = `Teleport-${uniqueId()}`
  }

  render() {
    const { className } = this
    const {
      context, children, focus, loose, onClick, _ref, style, styleActive, styleActiveHover,
      styleHover, title, to, ...rest
    } = this.props
    const { isActive, navigate, route } = this.context
    const isExplicitlyActive = this.props.isActive;
    const active = typeof isExplicitlyActive === 'boolean' && isExplicitlyActive || isActive(to, loose)
    const href = normaliseUri(`${route.context}${to}`)

    let inlineStyle = ''
    if (!active && styleHover) {
     inlineStyle = `.${className}:hover {${toCSS(styleHover)}}`
    }
    if (active && styleActiveHover) {
     inlineStyle = `.${className}:hover {${toCSS(styleActiveHover)}}`
    }
    const finalStyle = active ? { ...style, ...styleActive } : style

    const finalOnClick = event => {
      event.preventDefault()
      let preventNavigate = false

      if (typeof onClick === 'function') {
        preventNavigate = onClick(event)
      }

      if (preventNavigate !== true) {
        navigate(to, focus, context)
      }
    }

    if (_ref) {
      rest.ref = _ref
    }

    return (
      <a
        {...rest}
        className={className}
        href={href}
        onClick={finalOnClick}
        style={finalStyle}
        title={title}
      >
        <style>{inlineStyle}</style>
        {children}
      </a>
    )
  }
}
Teleport.contextTypes = {
  isActive: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  route: PropTypes.shape({
    context: PropTypes.string.isRequired
  }).isRequired
}

Teleport.propTypes = {
  _ref: PropTypes.func,
  styleActive: PropTypes.object,
  styleHover: PropTypes.object,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object,
  title: PropTypes.string
}
