import PropTypes from 'prop-types';
import React from 'react';
import toCSS from 'style-to-css';

export default class OnClick extends React.Component {
  state = {};

  componentWillMount() {
    const {props} = this;

    const manualActive = typeof props.isActive === 'boolean';
    this.setState({
      isActive: manualActive ? props.isActive : false,
      manualActive,
    });

    this.bindOnClick(props.onClick);
  }

  componentWillReceiveProps(nextProps) {
    this.bindOnClick(nextProps.onClick);

    const manualActive = typeof nextProps.isActive === 'boolean';

    if (manualActive) {
      this.setState({
        isActive: nextProps.isActive,
        manualActive,
      });
    }
  }

  componentWillUnmount() {
    if (this.onClickTimeout) {
      clearTimeout(this.onClickTimeout);
    }
  }

  bindOnClick(onClick) {
    const {context} = this;

    /* eslint-disable no-console */
    let finalOnClick;
    if (typeof onClick === 'function') {
      finalOnClick = () => {
        try {
          onClick();
        } catch (err) {
          const match = err.message.match(/props\.(.+) is not a function/);
          if (match) {
            context.transitionTo(match[1].trim(), true);
          }
        }
      };
    } else {
      let match;
      if (typeof onClick === 'string') {
        match = onClick.match(/transitionTo\((.+)\)/);
      }
      if (match && typeof context.transitionTo === 'function') {
        finalOnClick = () => context.transitionTo(match[1].trim());
      } else {
        finalOnClick = () => console.log(onClick);
      }
    }

    this.onClick = event => {
      finalOnClick(event);

      event.stopPropagation();

      if (!this.state.manualActive) {
        this.setState({
          isActive: true,
        });

        this.onClickTimeout = setTimeout(() => {
          this.setState({
            isActive: false,
          });
          this.onClickTimeout = null;
        }, this.props.styleActiveTimeout);
      }
    };
  }

  render() {
    const {context} = this;
    const {isActive} = this.state;
    /* eslint-disable no-unused-vars */
    const {
      'aria-label': ariaLabel,
      children,
      className,
      isActive: _isActive,
      isDisabled,
      _ref,
      style,
      styleActive,
      styleActiveHover,
      styleActiveTimeout,
      styleDisabled,
      styleHover,
      ...rest
    } = this.props;

    let inlineStyle = null;
    if (!isDisabled) {
      rest.onClick = this.onClick;

      const fClass = className.split(' ')[0];
      if (!isActive && styleHover) {
        inlineStyle = (
          <style>{`.${fClass}:hover {${toCSS(styleHover)}}`}</style>
        );
      }
      if (isActive && styleActiveHover) {
        inlineStyle = (
          <style>{`.${fClass}:hover {${toCSS(styleActiveHover)}}`}</style>
        );
      }
    }

    let finalStyle = {
      cursor: 'pointer',
      ...style,
    };
    if (isDisabled) {
      finalStyle = {
        ...finalStyle,
        cursor: 'default',
        ...styleDisabled,
      };
    } else if (isActive) {
      finalStyle = {
        ...finalStyle,
        ...styleActive,
      };
    }

    if (_ref) {
      rest.ref = _ref;
    }

    return (
      <button
        {...rest}
        aria-label={
          ariaLabel ? context.i18n ? (
            context.i18n.t(ariaLabel)
          ) : (
            ariaLabel
          ) : (
            undefined
          )
        }
        className={className}
        style={finalStyle}>
        {inlineStyle}
        {children}
      </button>
    );
  }
}
OnClick.contextTypes = {
  i18n: PropTypes.shape({
    t: PropTypes.func.isRequired,
  }),
  transitionTo: PropTypes.func,
};
OnClick.defaultProps = {
  styleActiveTimeout: 1000,
};
