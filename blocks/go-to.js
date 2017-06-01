import React from 'react'
import toCSS from 'style-to-css'
import uniqueId from 'mini-unique-id'

export default class GoTo extends React.Component {
  render() {
    const {
      children,
      className,
      _ref,
      styleActive,
      styleHover,
      ...props
    } = this.props

    let inlineStyle = null
    if (Object.keys(styleHover).length) {
      inlineStyle = (
        <style>{`.${className}:hover {${toCSS(styleHover)}}`}</style>
      )
    }

    if (_ref) {
      props.ref = _ref
    }

    return (
      <a {...props} className={className} target={'_blank'}>
        {inlineStyle}
        {children}
      </a>
    )
  }
}
