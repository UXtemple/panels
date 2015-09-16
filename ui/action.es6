import React, { Component, PropTypes } from 'react';

function isFunction(fn) {
  return typeof fn === 'function';
}

export default class Action extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    };
  }

  onClick(event) {
    event.preventDefault();
    this.context.navigate(this.props.href);

    if (isFunction(this.props.onClick)) {
      this.props.onClick();
    }
  }

  render() {
    const { activeStyle, children, hoverStyle, href, style, title } = this.props;
    const { hover } = this.state;
    const active = this.context.isActive(href);

    let finalStyle = {
      WebkitBoxOrient: 'horizontal',
      WebkitBoxDirection: 'normal',
      WebkitFlexDirection: 'row',
      msFlexDirection: 'row',
      flexDirection: 'row',
      textDecoration: 'none',
      ...style
    };

    if (active) {
      finalStyle = {
        ...finalStyle,
        ...activeStyle
      }
    }

    if (hover) {
      finalStyle = {
        ...finalStyle,
        ...hoverStyle
      }
    }

    const content = children ?
      (isFunction(children) ? children(active, hover) : children) :
      title;

    return <a href={href} title={title} style={finalStyle} onClick={::this.onClick}>{content}</a>;
  }

  static contextTypes = {
    isActive: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired
  }

  static defaultProps = {
    activeStyle: {},
    hoverStyle: {},
    style: {}
  }

  static propTypes = {
    activeStyle: PropTypes.object,
    hoverStyle: PropTypes.object,
    href: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    style: PropTypes.object,
    title: PropTypes.string
  }
}
