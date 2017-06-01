import Teleport from './teleport.js'
import GoTo from './go-to'
import OnClick from './on-click'
import PropTypes from 'prop-types'
import React from 'react'
import toCSS from 'style-to-css'
import uniqueId from 'mini-unique-id'

export default function createGroup(name, groupStyle) {
  class Group extends React.Component {
    constructor(props, context) {
      super(props, context)

      this.localClassName = `${name}-${uniqueId()}`
    }

    render() {
      const {
        children,
        className: moreClassName,
        goTo,
        style,
        teleportTo,
        ...props
      } = this.props
      const { localClassName } = this
      const { pages } = this.context

      let finalStyle = {
        ...groupStyle,
        ...style,
      }

      let className = localClassName
      if (typeof moreClassName === 'string') {
        className += ` ${moreClassName}`
      }

      let Base
      if (teleportTo) {
        Base = Teleport
        props.to = teleportTo
      } else if (goTo) {
        Base = GoTo
        props.href = goTo
      } else if (
        (props.onClick || props.onMouseDown || props.onMouseUp) &&
        !props.noButton
      ) {
        Base = OnClick
      } else {
        const {
          isDisabled,
          noButton,
          _ref,
          styleDisabled,
          styleActive,
          styleActiveHover,
          styleActiveTimeout,
          styleHover,
          ...rest
        } = props

        let inlineStyle = null
        if (isDisabled) {
          if (styleDisabled) {
            finalStyle = {
              ...finalStyle,
              ...styleDisabled,
            }
          }
        } else {
          if (Object.keys(styleHover).length) {
            inlineStyle = (
              <style>{`.${localClassName}:hover {${toCSS(styleHover)}}`}</style>
            )
          }
        }

        return (
          <div {...rest} className={className} ref={_ref} style={finalStyle}>
            {inlineStyle}
            {children}
          </div>
        )
      }

      if (pages && pages.isSelecting) {
        props.onClick = event => {
          if (event) {
            event.preventDefault()
          }
          return true
        }
      }

      return (
        <Base {...props} className={className} style={finalStyle}>
          {children}
        </Base>
      )
    }
  }

  Group.contextTypes = {
    pages: PropTypes.shape({
      isSelecting: PropTypes.bool,
    }),
  }

  Group.defaultProps = {
    className: '',
    style: {},
    styleActive: {},
    styleHover: {},
  }

  Group.displayName = name

  return Group
}
