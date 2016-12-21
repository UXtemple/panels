import React, { Component, PropTypes } from 'react';
import toCSS from 'style-to-css';

export default class OnClick extends Component {
  constructor(...args) {
    super(...args)
    this.state = {}
  }

  componentWillMount() {
    const { props } = this

    const manualActive = typeof props.isActive === 'boolean'
    this.setState({
      isActive: manualActive ? props.isActive : false,
      manualActive
    });

    this.bindOnClick(props.onClick);
  }

  componentWillReceiveProps(nextProps) {
    this.bindOnClick(nextProps.onClick);

    const manualActive = typeof nextProps.isActive === 'boolean'

    if (manualActive) {
      this.setState({
        isActive: nextProps.isActive,
        manualActive
      })
    }
  }

  componentWillUnmount() {
    if (this.onClickTimeout) {
      clearTimeout(this.onClickTimeout);
    }
  }

  bindOnClick(onClick) {
    const { context } = this

    /* eslint-disable no-console */
    let finalOnClick
    if (typeof onClick === 'function') {
      finalOnClick = () => {
        try {
          onClick()
        } catch(err) {
          const match = err.message.match(/props\.(.+) is not a function/)
          if (match) {
            context.transitionTo(match[1].trim(), true)
          }
        }
      }
    } else {
      let match
      if (typeof onClick === 'string') {
        match = onClick.match(/transitionTo\((.+)\)/)
      }
      if (match && typeof context.transitionTo === 'function') {
        finalOnClick = () => context.transitionTo(match[1].trim())
      } else {
        finalOnClick = () => console.log(onClick)
      }
    }

    this.onClick = event => {
      finalOnClick(event);

      event.stopPropagation();

      if (!this.state.manualActive) {
        this.setState({
          isActive: true
        });

        this.onClickTimeout = setTimeout(() => {
          this.setState({
            isActive: false
          });
          this.onClickTimeout = null;
        }, this.props.styleActiveTimeout);
      }
    };
  }

  render() {
    const { isActive } = this.state;
    /* eslint-disable no-unused-vars */
    const {
      children, className, isActive: _isActive, _ref, style, styleActive, styleActiveHover,
      styleActiveTimeout, styleHover, ...rest
    } = this.props;

    let inlineStyle = null
    const fClass = className.split(' ')[0]
    if (!isActive && styleHover) {
      inlineStyle = <style>{`.${fClass}:hover {${toCSS(styleHover)}}`}</style>;
    }
    if (isActive && styleActiveHover) {
      inlineStyle = <style>{`.${fClass}:hover {${toCSS(styleActiveHover)}}`}</style>;
    }

    const finalStyle = isActive ? {
      cursor: 'pointer',
      ...style,
      ...styleActive
    } : {
      cursor: 'pointer',
      ...style
    };

    if (_ref) {
      rest.ref = _ref;
    }

    return (
      <div
        {...rest}
        className={className}
        disabled={isActive}
        onClick={this.onClick}
        style={finalStyle}
      >
        {inlineStyle}
        {children}
      </div>
    );
  }
}
OnClick.contextTypes = {
  transitionTo: PropTypes.func
}
OnClick.defaultProps = {
  styleActiveTimeout: 1000
};
OnClick.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string
  ]),
  _ref: PropTypes.func,
  style: PropTypes.object,
  styleActive: PropTypes.object,
  styleActiveTimeout: PropTypes.number.isRequired,
  styleHover: PropTypes.object
};
