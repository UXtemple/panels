require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var id = 1;

function index () {
  return "" + id++;
}

module.exports = index;
},{}],2:[function(require,module,exports){
'use strict';

function _interopDefault (ex) { return 'default' in ex ? ex['default'] : ex; }

var toSlugCase = _interopDefault(require('to-slug-case'));

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CSSProperty
 */

// https://raw.githubusercontent.com/facebook/react/3b96650e39ddda5ba49245713ef16dbc52d25e9e/src/renderers/dom/shared/CSSProperty.js

/**
 * CSS properties which accept numbers but are not in units of "px".
 */
var isUnitlessNumber = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true
};

/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */
function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});

function toCSS(obj) {
  return Object.keys(obj).map(function (rawKey) {
    var key = toSlugCase(rawKey);
    if (/^webkit/.test(key) || /^moz/.test(key) || /^ms/.test(key)) {
      key = '-' + key;
    }

    var value = obj[rawKey];
    if (typeof value === 'number' && !(isUnitlessNumber.hasOwnProperty(key) && isUnitlessNumber[key])) {
      value = value + 'px';
    }

    return key + ':' + value + ' !important;';
  }).join('');
}

module.exports = toCSS;
},{"to-slug-case":4}],3:[function(require,module,exports){

/**
 * Export.
 */

module.exports = toNoCase

/**
 * Test whether a string is camel-case.
 */

var hasSpace = /\s/
var hasSeparator = /(_|-|\.|:)/
var hasCamel = /([a-z][A-Z]|[A-Z][a-z])/

/**
 * Remove any starting case from a `string`, like camel or snake, but keep
 * spaces and punctuation that may be important otherwise.
 *
 * @param {String} string
 * @return {String}
 */

function toNoCase(string) {
  if (hasSpace.test(string)) return string.toLowerCase()
  if (hasSeparator.test(string)) return (unseparate(string) || string).toLowerCase()
  if (hasCamel.test(string)) return uncamelize(string).toLowerCase()
  return string.toLowerCase()
}

/**
 * Separator splitter.
 */

var separatorSplitter = /[\W_]+(.|$)/g

/**
 * Un-separate a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function unseparate(string) {
  return string.replace(separatorSplitter, function (m, next) {
    return next ? ' ' + next : ''
  })
}

/**
 * Camelcase splitter.
 */

var camelSplitter = /(.)([A-Z]+)/g

/**
 * Un-camelcase a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function uncamelize(string) {
  return string.replace(camelSplitter, function (m, previous, uppers) {
    return previous + ' ' + uppers.toLowerCase().split('').join(' ')
  })
}

},{}],4:[function(require,module,exports){

var toSpace = require('to-space-case')

/**
 * Export.
 */

module.exports = toSlugCase

/**
 * Convert a `string` to slug case.
 *
 * @param {String} string
 * @return {String}
 */

function toSlugCase(string) {
  return toSpace(string).replace(/\s/g, '-')
}

},{"to-space-case":5}],5:[function(require,module,exports){

var clean = require('to-no-case')

/**
 * Export.
 */

module.exports = toSpaceCase

/**
 * Convert a `string` to space case.
 *
 * @param {String} string
 * @return {String}
 */

function toSpaceCase(string) {
  return clean(string).replace(/[\W_]+(.|$)/g, function (matches, match) {
    return match ? ' ' + match : ''
  }).trim()
}

},{"to-no-case":3}],"notes.dev":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var toCSS = _interopDefault(require('style-to-css'));
var uniqueId = _interopDefault(require('mini-unique-id'));

// original src: https://github.com/substack/path-browserify
function normaliseArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// original src: https://github.com/substack/path-browserify
function normalisePath(rawPath) {
  var isAbsolute = rawPath.charAt(0) === '/';
  var trailingSlash = rawPath.substr(-1) === '/';

  // normalise the path
  var path = normaliseArray(rawPath.split('/').filter(function (p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
}

var TRAILING_SLASH_REGEX = /\/$/;

function withTrailingSlash(uri) {
  return TRAILING_SLASH_REGEX.test(uri) ? uri : uri + "/";
}

var decodeSchema = function decodeSchema(s) {
  return s.replace(/<<HTTP>>/g, 'http://').replace(/<<HTTPS>>/g, 'https://');
};
var encodeSchema = function encodeSchema(s) {
  return s.replace(/http:\/\//g, '<<HTTP>>').replace(/https:\/\//g, '<<HTTPS>>');
};

var normaliseUri = (function (uri) {
  return decodeSchema(normalisePath(withTrailingSlash(encodeSchema(uri))));
});

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var _jsxFileName$2 = '/Users/craverod/usepages/panels/blocks/teleport.js';
var Teleport = function (_Component) {
  inherits(Teleport, _Component);

  function Teleport(props, context) {
    classCallCheck(this, Teleport);

    var _this = possibleConstructorReturn(this, (Teleport.__proto__ || Object.getPrototypeOf(Teleport)).call(this, props, context));

    _this.className = 'Teleport-' + uniqueId();
    return _this;
  }

  createClass(Teleport, [{
    key: 'render',
    value: function render() {
      var className = this.className;
      var _props = this.props,
          context = _props.context,
          children = _props.children,
          focus = _props.focus,
          loose = _props.loose,
          onClick = _props.onClick,
          _ref = _props._ref,
          style = _props.style,
          styleActive = _props.styleActive,
          styleHover = _props.styleHover,
          title = _props.title,
          to = _props.to,
          rest = objectWithoutProperties(_props, ['context', 'children', 'focus', 'loose', 'onClick', '_ref', 'style', 'styleActive', 'styleHover', 'title', 'to']);
      var _context = this.context,
          isActive = _context.isActive,
          navigate = _context.navigate,
          route = _context.route;

      var active = isActive(to, loose);
      var href = normaliseUri('' + route.context + to);

      var inlineStyle = styleHover ? '.' + className + ':hover {' + toCSS(styleHover) + '}' : '';
      var finalStyle = active ? _extends({}, style, styleActive) : style;

      var finalOnClick = function finalOnClick(event) {
        event.preventDefault();
        var preventNavigate = false;

        if (typeof onClick === 'function') {
          preventNavigate = onClick(event);
        }

        if (preventNavigate !== true) {
          navigate(to, focus, context);
        }
      };

      if (_ref) {
        rest.ref = _ref;
      }

      return React__default.createElement(
        'a',
        _extends({}, rest, {
          className: className,
          href: href,
          onClick: finalOnClick,
          style: finalStyle,
          title: title,
          __source: {
            fileName: _jsxFileName$2,
            lineNumber: 43
          },
          __self: this
        }),
        React__default.createElement(
          'style',
          {
            __source: {
              fileName: _jsxFileName$2,
              lineNumber: 51
            },
            __self: this
          },
          inlineStyle
        ),
        children
      );
    }
  }]);
  return Teleport;
}(React.Component);

Teleport.contextTypes = {
  isActive: React.PropTypes.func.isRequired,
  navigate: React.PropTypes.func.isRequired,
  route: React.PropTypes.shape({
    context: React.PropTypes.string.isRequired
  }).isRequired
};

Teleport.propTypes = {
  _ref: React.PropTypes.func,
  styleActive: React.PropTypes.object,
  styleHover: React.PropTypes.object,
  to: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
  style: React.PropTypes.object,
  title: React.PropTypes.string
};

var _jsxFileName$3 = '/Users/craverod/usepages/panels/blocks/go-to.js';
var GoTo = function (_Component) {
  inherits(GoTo, _Component);

  function GoTo() {
    classCallCheck(this, GoTo);
    return possibleConstructorReturn(this, (GoTo.__proto__ || Object.getPrototypeOf(GoTo)).apply(this, arguments));
  }

  createClass(GoTo, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          _ref = _props._ref,
          styleActive = _props.styleActive,
          styleHover = _props.styleHover,
          props = objectWithoutProperties(_props, ['children', 'className', '_ref', 'styleActive', 'styleHover']);


      var inlineStyle = null;
      if (Object.keys(styleHover).length) {
        inlineStyle = React__default.createElement(
          'style',
          {
            __source: {
              fileName: _jsxFileName$3,
              lineNumber: 11
            },
            __self: this
          },
          '.' + className + ':hover {' + toCSS(styleHover) + '}'
        );
      }

      if (_ref) {
        props.ref = _ref;
      }

      return React__default.createElement(
        'a',
        _extends({}, props, { className: className, target: '_blank', __source: {
            fileName: _jsxFileName$3,
            lineNumber: 19
          },
          __self: this
        }),
        inlineStyle,
        children
      );
    }
  }]);
  return GoTo;
}(React.Component);

GoTo.propTypes = {
  href: React.PropTypes.string.isRequired,
  _ref: React.PropTypes.func,
  style: React.PropTypes.object,
  styleActive: React.PropTypes.object,
  styleHover: React.PropTypes.object
};

var _jsxFileName$4 = '/Users/craverod/usepages/panels/blocks/on-click.js';
var OnClick = function (_Component) {
  inherits(OnClick, _Component);

  function OnClick() {
    var _ref2;

    classCallCheck(this, OnClick);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = possibleConstructorReturn(this, (_ref2 = OnClick.__proto__ || Object.getPrototypeOf(OnClick)).call.apply(_ref2, [this].concat(args)));

    _this.state = {};
    return _this;
  }

  createClass(OnClick, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var props = this.props;


      var manualActive = typeof props.isActive === 'boolean';
      this.setState({
        isActive: manualActive ? props.isActive : false,
        manualActive: manualActive
      });

      this.bindOnClick(props.onClick);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.bindOnClick(nextProps.onClick);

      var manualActive = typeof nextProps.isActive === 'boolean';

      if (manualActive) {
        this.setState({
          isActive: nextProps.isActive,
          manualActive: manualActive
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.onClickTimeout) {
        clearTimeout(this.onClickTimeout);
      }
    }
  }, {
    key: 'bindOnClick',
    value: function bindOnClick(onClick) {
      var _this2 = this;

      /* eslint-disable no-console */
      var finalOnClick = typeof onClick === 'function' ? onClick : function () {
        return console.log(onClick);
      };

      this.onClick = function (event) {
        finalOnClick(event);

        event.stopPropagation();

        if (!_this2.state.manualActive) {
          _this2.setState({
            isActive: true
          });

          _this2.onClickTimeout = setTimeout(function () {
            _this2.setState({
              isActive: false
            });
            _this2.onClickTimeout = null;
          }, _this2.props.styleActiveTimeout);
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var isActive = this.state.isActive;
      /* eslint-disable no-unused-vars */

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          _isActive = _props.isActive,
          _ref = _props._ref,
          style = _props.style,
          styleActive = _props.styleActive,
          styleActiveTimeout = _props.styleActiveTimeout,
          styleHover = _props.styleHover,
          rest = objectWithoutProperties(_props, ['children', 'className', 'isActive', '_ref', 'style', 'styleActive', 'styleActiveTimeout', 'styleHover']);


      var inlineStyle = null;
      if (!isActive && Object.keys(styleHover).length) {
        inlineStyle = React__default.createElement(
          'style',
          {
            __source: {
              fileName: _jsxFileName$4,
              lineNumber: 76
            },
            __self: this
          },
          '.' + className + ':hover {' + toCSS(styleHover) + '}'
        );
      }

      var finalStyle = isActive ? _extends({}, style, styleActive, {
        outline: 0
      }) : _extends({}, style, {
        outline: 0,
        cursor: 'pointer'
      });

      if (_ref) {
        rest.ref = _ref;
      }

      return React__default.createElement(
        'button',
        _extends({}, rest, {
          className: className,
          disabled: isActive,
          onClick: this.onClick,
          style: finalStyle,
          __source: {
            fileName: _jsxFileName$4,
            lineNumber: 94
          },
          __self: this
        }),
        inlineStyle,
        children
      );
    }
  }]);
  return OnClick;
}(React.Component);

OnClick.defaultProps = {
  styleActiveTimeout: 1000
};
OnClick.propTypes = {
  isActive: React.PropTypes.bool,
  onClick: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.string]),
  _ref: React.PropTypes.func,
  style: React.PropTypes.object,
  styleActive: React.PropTypes.object,
  styleActiveTimeout: React.PropTypes.number.isRequired,
  styleHover: React.PropTypes.object
};

var _jsxFileName$1 = '/Users/craverod/usepages/panels/blocks/create-group.js';
function createGroup(name, groupStyle) {
  var Group = function (_Component) {
    inherits(Group, _Component);

    function Group(props, context) {
      classCallCheck(this, Group);

      var _this = possibleConstructorReturn(this, (Group.__proto__ || Object.getPrototypeOf(Group)).call(this, props, context));

      _this.className = name + '-' + uniqueId();
      return _this;
    }

    createClass(Group, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            children = _props.children,
            moreClassName = _props.className,
            goTo = _props.goTo,
            style = _props.style,
            teleportTo = _props.teleportTo,
            props = objectWithoutProperties(_props, ['children', 'className', 'goTo', 'style', 'teleportTo']);
        var className = this.className;
        var pages = this.context.pages;


        var finalStyle = _extends({}, groupStyle, style);

        var Base = void 0;
        if (teleportTo) {
          Base = Teleport;
          props.to = teleportTo;
        } else if (goTo) {
          Base = GoTo;
          props.href = goTo;
        } else if (props.onClick) {
          Base = OnClick;
        } else {
          var _ref = props._ref,
              styleActive = props.styleActive,
              styleHover = props.styleHover,
              rest = objectWithoutProperties(props, ['_ref', 'styleActive', 'styleHover']);


          var inlineStyle = null;
          if (Object.keys(styleHover).length) {
            inlineStyle = React__default.createElement(
              'style',
              {
                __source: {
                  fileName: _jsxFileName$1,
                  lineNumber: 40
                },
                __self: this
              },
              '.' + className + ':hover {' + toCSS(styleHover) + '}'
            );
          }

          return React__default.createElement(
            'div',
            _extends({}, rest, {
              className: className + ' ' + moreClassName,
              ref: _ref,
              style: finalStyle,
              __source: {
                fileName: _jsxFileName$1,
                lineNumber: 44
              },
              __self: this
            }),
            inlineStyle,
            children
          );
        }

        if (pages && pages.isSelecting) {
          props.onClick = function (event) {
            if (event) {
              event.preventDefault();
            }
            return true;
          };
        }

        return React__default.createElement(
          Base,
          _extends({}, props, {
            className: className,
            style: finalStyle,
            __source: {
              fileName: _jsxFileName$1,
              lineNumber: 66
            },
            __self: this
          }),
          children
        );
      }
    }]);
    return Group;
  }(React.Component);

  Group.contextTypes = {
    pages: React.PropTypes.shape({
      isSelecting: React.PropTypes.bool
    })
  };

  Group.defaultProps = {
    className: '',
    style: {},
    styleActive: {},
    styleHover: {}
  };

  Group.displayName = name;

  Group.propTypes = {
    blocks: React.PropTypes.any,
    goTo: React.PropTypes.string,
    onClick: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string, React.PropTypes.func]),
    _ref: React.PropTypes.func,
    style: React.PropTypes.object,
    styleActive: React.PropTypes.object,
    styleHover: React.PropTypes.object,
    teleportTo: React.PropTypes.string
  };

  return Group;
}

var Horizontal = createGroup('Horizontal', { flexDirection: 'row' });

var Vertical = createGroup('Vertical', { flexDirection: 'column' });

var _jsxFileName = '/Users/craverod/usepages/panels/playground/notes.dev/src.js.tmp';
var _this = undefined;
var Notes = function Notes(_ref) {
  var width = _ref.width;
  return React__default.createElement(
    Vertical,
    { style: { backgroundColor: '#00ff00', fontFamily: 'sans-serif', fontSize: 125, padding: 20, width: width }, __source: {
        fileName: _jsxFileName,
        lineNumber: 6
      },
      __self: _this
    },
    'Notes',
    React__default.createElement(
      Horizontal,
      { style: styleAction, teleportTo: '../content-1/note-1', __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        },
        __self: _this
      },
      'Note 1 in Content 1'
    ),
    React__default.createElement(
      Horizontal,
      { style: styleAction, teleportTo: '../content-1/note-2', __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        },
        __self: _this
      },
      'Note 2 in Content 1'
    ),
    React__default.createElement(
      Horizontal,
      { style: styleAction, teleportTo: '../content-2/note-3', __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        },
        __self: _this
      },
      'Note 3 in Content 2'
    ),
    React__default.createElement(
      Horizontal,
      { style: styleAction, teleportTo: '../content-2/note-4', __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        },
        __self: _this
      },
      'Note 4 in Content 2'
    ),
    React__default.createElement(
      Horizontal,
      { style: styleAction, teleportTo: '../content-2/note-5', __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        },
        __self: _this
      },
      'Note 5 in Content 2'
    )
  );
};

var Note = function Note(_ref2) {
  var note = _ref2.note,
      width = _ref2.width;
  return React__default.createElement(
    Vertical,
    { style: { backgroundColor: '#00ff00', fontFamily: 'sans-serif', fontSize: 125, padding: 20, width: width }, __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      },
      __self: _this
    },
    note
  );
};

var types = {
  Note: Note,
  Notes: Notes
};

var panels = {
  '/': {
    dockLeft: false,
    type: 'Notes',
    width: 360
  },
  '/:note': {
    dockLeft: false,
    type: 'Note',
    width: 360
  }
};

var lookup = ['/:note'];

var styleAction = {
  backgroundColor: '#f0f0f0',
  borderRadius: 5,
  color: '#000000',
  cursor: 'pointer',
  fontFamily: 'sans-serif',
  fontSize: 20,
  justifyContent: 'center',
  margin: 2.5,
  padding: '10px 20px',
  textDecoration: 'none',
  textTransform: 'uppercase'
};

exports.types = types;
exports.panels = panels;
exports.lookup = lookup;
},{"mini-unique-id":1,"react":"react","style-to-css":2}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbWluaS11bmlxdWUtaWQvaW5kZXguY2pzLmpzIiwibm9kZV9tb2R1bGVzL3N0eWxlLXRvLWNzcy9kaXN0L2Nqcy5qcyIsIm5vZGVfbW9kdWxlcy90by1uby1jYXNlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3RvLXNsdWctY2FzZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy90by1zcGFjZS1jYXNlL2luZGV4LmpzIiwicGxheWdyb3VuZC9ub3Rlcy5kZXYvc3JjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaWQgPSAxO1xuXG5mdW5jdGlvbiBpbmRleCAoKSB7XG4gIHJldHVybiBcIlwiICsgaWQrKztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbmRleDsiLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wRGVmYXVsdCAoZXgpIHsgcmV0dXJuICdkZWZhdWx0JyBpbiBleCA/IGV4WydkZWZhdWx0J10gOiBleDsgfVxuXG52YXIgdG9TbHVnQ2FzZSA9IF9pbnRlcm9wRGVmYXVsdChyZXF1aXJlKCd0by1zbHVnLWNhc2UnKSk7XG5cbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBDU1NQcm9wZXJ0eVxuICovXG5cbi8vIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9mYWNlYm9vay9yZWFjdC8zYjk2NjUwZTM5ZGRkYTViYTQ5MjQ1NzEzZWYxNmRiYzUyZDI1ZTllL3NyYy9yZW5kZXJlcnMvZG9tL3NoYXJlZC9DU1NQcm9wZXJ0eS5qc1xuXG4vKipcbiAqIENTUyBwcm9wZXJ0aWVzIHdoaWNoIGFjY2VwdCBudW1iZXJzIGJ1dCBhcmUgbm90IGluIHVuaXRzIG9mIFwicHhcIi5cbiAqL1xudmFyIGlzVW5pdGxlc3NOdW1iZXIgPSB7XG4gIGFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50OiB0cnVlLFxuICBib3hGbGV4OiB0cnVlLFxuICBib3hGbGV4R3JvdXA6IHRydWUsXG4gIGJveE9yZGluYWxHcm91cDogdHJ1ZSxcbiAgY29sdW1uQ291bnQ6IHRydWUsXG4gIGZsZXg6IHRydWUsXG4gIGZsZXhHcm93OiB0cnVlLFxuICBmbGV4UG9zaXRpdmU6IHRydWUsXG4gIGZsZXhTaHJpbms6IHRydWUsXG4gIGZsZXhOZWdhdGl2ZTogdHJ1ZSxcbiAgZmxleE9yZGVyOiB0cnVlLFxuICBncmlkUm93OiB0cnVlLFxuICBncmlkQ29sdW1uOiB0cnVlLFxuICBmb250V2VpZ2h0OiB0cnVlLFxuICBsaW5lQ2xhbXA6IHRydWUsXG4gIGxpbmVIZWlnaHQ6IHRydWUsXG4gIG9wYWNpdHk6IHRydWUsXG4gIG9yZGVyOiB0cnVlLFxuICBvcnBoYW5zOiB0cnVlLFxuICB0YWJTaXplOiB0cnVlLFxuICB3aWRvd3M6IHRydWUsXG4gIHpJbmRleDogdHJ1ZSxcbiAgem9vbTogdHJ1ZSxcblxuICAvLyBTVkctcmVsYXRlZCBwcm9wZXJ0aWVzXG4gIGZpbGxPcGFjaXR5OiB0cnVlLFxuICBzdG9wT3BhY2l0eTogdHJ1ZSxcbiAgc3Ryb2tlRGFzaG9mZnNldDogdHJ1ZSxcbiAgc3Ryb2tlT3BhY2l0eTogdHJ1ZSxcbiAgc3Ryb2tlV2lkdGg6IHRydWVcbn07XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeCB2ZW5kb3Itc3BlY2lmaWMgcHJlZml4LCBlZzogV2Via2l0XG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHN0eWxlIG5hbWUsIGVnOiB0cmFuc2l0aW9uRHVyYXRpb25cbiAqIEByZXR1cm4ge3N0cmluZ30gc3R5bGUgbmFtZSBwcmVmaXhlZCB3aXRoIGBwcmVmaXhgLCBwcm9wZXJseSBjYW1lbENhc2VkLCBlZzpcbiAqIFdlYmtpdFRyYW5zaXRpb25EdXJhdGlvblxuICovXG5mdW5jdGlvbiBwcmVmaXhLZXkocHJlZml4LCBrZXkpIHtcbiAgcmV0dXJuIHByZWZpeCArIGtleS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGtleS5zdWJzdHJpbmcoMSk7XG59XG5cbi8qKlxuICogU3VwcG9ydCBzdHlsZSBuYW1lcyB0aGF0IG1heSBjb21lIHBhc3NlZCBpbiBwcmVmaXhlZCBieSBhZGRpbmcgcGVybXV0YXRpb25zXG4gKiBvZiB2ZW5kb3IgcHJlZml4ZXMuXG4gKi9cbnZhciBwcmVmaXhlcyA9IFsnV2Via2l0JywgJ21zJywgJ01veicsICdPJ107XG5cbi8vIFVzaW5nIE9iamVjdC5rZXlzIGhlcmUsIG9yIGVsc2UgdGhlIHZhbmlsbGEgZm9yLWluIGxvb3AgbWFrZXMgSUU4IGdvIGludG8gYW5cbi8vIGluZmluaXRlIGxvb3AsIGJlY2F1c2UgaXQgaXRlcmF0ZXMgb3ZlciB0aGUgbmV3bHkgYWRkZWQgcHJvcHMgdG9vLlxuT2JqZWN0LmtleXMoaXNVbml0bGVzc051bWJlcikuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuICBwcmVmaXhlcy5mb3JFYWNoKGZ1bmN0aW9uIChwcmVmaXgpIHtcbiAgICBpc1VuaXRsZXNzTnVtYmVyW3ByZWZpeEtleShwcmVmaXgsIHByb3ApXSA9IGlzVW5pdGxlc3NOdW1iZXJbcHJvcF07XG4gIH0pO1xufSk7XG5cbmZ1bmN0aW9uIHRvQ1NTKG9iaikge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoZnVuY3Rpb24gKHJhd0tleSkge1xuICAgIHZhciBrZXkgPSB0b1NsdWdDYXNlKHJhd0tleSk7XG4gICAgaWYgKC9ed2Via2l0Ly50ZXN0KGtleSkgfHwgL15tb3ovLnRlc3Qoa2V5KSB8fCAvXm1zLy50ZXN0KGtleSkpIHtcbiAgICAgIGtleSA9ICctJyArIGtleTtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWUgPSBvYmpbcmF3S2V5XTtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiAhKGlzVW5pdGxlc3NOdW1iZXIuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBpc1VuaXRsZXNzTnVtYmVyW2tleV0pKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlICsgJ3B4JztcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5ICsgJzonICsgdmFsdWUgKyAnICFpbXBvcnRhbnQ7JztcbiAgfSkuam9pbignJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9DU1M7IiwiXG4vKipcbiAqIEV4cG9ydC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRvTm9DYXNlXG5cbi8qKlxuICogVGVzdCB3aGV0aGVyIGEgc3RyaW5nIGlzIGNhbWVsLWNhc2UuXG4gKi9cblxudmFyIGhhc1NwYWNlID0gL1xccy9cbnZhciBoYXNTZXBhcmF0b3IgPSAvKF98LXxcXC58OikvXG52YXIgaGFzQ2FtZWwgPSAvKFthLXpdW0EtWl18W0EtWl1bYS16XSkvXG5cbi8qKlxuICogUmVtb3ZlIGFueSBzdGFydGluZyBjYXNlIGZyb20gYSBgc3RyaW5nYCwgbGlrZSBjYW1lbCBvciBzbmFrZSwgYnV0IGtlZXBcbiAqIHNwYWNlcyBhbmQgcHVuY3R1YXRpb24gdGhhdCBtYXkgYmUgaW1wb3J0YW50IG90aGVyd2lzZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuZnVuY3Rpb24gdG9Ob0Nhc2Uoc3RyaW5nKSB7XG4gIGlmIChoYXNTcGFjZS50ZXN0KHN0cmluZykpIHJldHVybiBzdHJpbmcudG9Mb3dlckNhc2UoKVxuICBpZiAoaGFzU2VwYXJhdG9yLnRlc3Qoc3RyaW5nKSkgcmV0dXJuICh1bnNlcGFyYXRlKHN0cmluZykgfHwgc3RyaW5nKS50b0xvd2VyQ2FzZSgpXG4gIGlmIChoYXNDYW1lbC50ZXN0KHN0cmluZykpIHJldHVybiB1bmNhbWVsaXplKHN0cmluZykudG9Mb3dlckNhc2UoKVxuICByZXR1cm4gc3RyaW5nLnRvTG93ZXJDYXNlKClcbn1cblxuLyoqXG4gKiBTZXBhcmF0b3Igc3BsaXR0ZXIuXG4gKi9cblxudmFyIHNlcGFyYXRvclNwbGl0dGVyID0gL1tcXFdfXSsoLnwkKS9nXG5cbi8qKlxuICogVW4tc2VwYXJhdGUgYSBgc3RyaW5nYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuZnVuY3Rpb24gdW5zZXBhcmF0ZShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKHNlcGFyYXRvclNwbGl0dGVyLCBmdW5jdGlvbiAobSwgbmV4dCkge1xuICAgIHJldHVybiBuZXh0ID8gJyAnICsgbmV4dCA6ICcnXG4gIH0pXG59XG5cbi8qKlxuICogQ2FtZWxjYXNlIHNwbGl0dGVyLlxuICovXG5cbnZhciBjYW1lbFNwbGl0dGVyID0gLyguKShbQS1aXSspL2dcblxuLyoqXG4gKiBVbi1jYW1lbGNhc2UgYSBgc3RyaW5nYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuZnVuY3Rpb24gdW5jYW1lbGl6ZShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGNhbWVsU3BsaXR0ZXIsIGZ1bmN0aW9uIChtLCBwcmV2aW91cywgdXBwZXJzKSB7XG4gICAgcmV0dXJuIHByZXZpb3VzICsgJyAnICsgdXBwZXJzLnRvTG93ZXJDYXNlKCkuc3BsaXQoJycpLmpvaW4oJyAnKVxuICB9KVxufVxuIiwiXG52YXIgdG9TcGFjZSA9IHJlcXVpcmUoJ3RvLXNwYWNlLWNhc2UnKVxuXG4vKipcbiAqIEV4cG9ydC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRvU2x1Z0Nhc2VcblxuLyoqXG4gKiBDb252ZXJ0IGEgYHN0cmluZ2AgdG8gc2x1ZyBjYXNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuXG5mdW5jdGlvbiB0b1NsdWdDYXNlKHN0cmluZykge1xuICByZXR1cm4gdG9TcGFjZShzdHJpbmcpLnJlcGxhY2UoL1xccy9nLCAnLScpXG59XG4iLCJcbnZhciBjbGVhbiA9IHJlcXVpcmUoJ3RvLW5vLWNhc2UnKVxuXG4vKipcbiAqIEV4cG9ydC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRvU3BhY2VDYXNlXG5cbi8qKlxuICogQ29udmVydCBhIGBzdHJpbmdgIHRvIHNwYWNlIGNhc2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5cbmZ1bmN0aW9uIHRvU3BhY2VDYXNlKHN0cmluZykge1xuICByZXR1cm4gY2xlYW4oc3RyaW5nKS5yZXBsYWNlKC9bXFxXX10rKC58JCkvZywgZnVuY3Rpb24gKG1hdGNoZXMsIG1hdGNoKSB7XG4gICAgcmV0dXJuIG1hdGNoID8gJyAnICsgbWF0Y2ggOiAnJ1xuICB9KS50cmltKClcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxuZnVuY3Rpb24gX2ludGVyb3BEZWZhdWx0IChleCkgeyByZXR1cm4gKGV4ICYmICh0eXBlb2YgZXggPT09ICdvYmplY3QnKSAmJiAnZGVmYXVsdCcgaW4gZXgpID8gZXhbJ2RlZmF1bHQnXSA6IGV4OyB9XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RfX2RlZmF1bHQgPSBfaW50ZXJvcERlZmF1bHQoUmVhY3QpO1xudmFyIHRvQ1NTID0gX2ludGVyb3BEZWZhdWx0KHJlcXVpcmUoJ3N0eWxlLXRvLWNzcycpKTtcbnZhciB1bmlxdWVJZCA9IF9pbnRlcm9wRGVmYXVsdChyZXF1aXJlKCdtaW5pLXVuaXF1ZS1pZCcpKTtcblxuLy8gb3JpZ2luYWwgc3JjOiBodHRwczovL2dpdGh1Yi5jb20vc3Vic3RhY2svcGF0aC1icm93c2VyaWZ5XG5mdW5jdGlvbiBub3JtYWxpc2VBcnJheShwYXJ0cywgYWxsb3dBYm92ZVJvb3QpIHtcbiAgLy8gaWYgdGhlIHBhdGggdHJpZXMgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIGB1cGAgZW5kcyB1cCA+IDBcbiAgdmFyIHVwID0gMDtcbiAgZm9yICh2YXIgaSA9IHBhcnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgdmFyIGxhc3QgPSBwYXJ0c1tpXTtcbiAgICBpZiAobGFzdCA9PT0gJy4nKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChsYXN0ID09PSAnLi4nKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICAgIHVwLS07XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgdGhlIHBhdGggaXMgYWxsb3dlZCB0byBnbyBhYm92ZSB0aGUgcm9vdCwgcmVzdG9yZSBsZWFkaW5nIC4uc1xuICBpZiAoYWxsb3dBYm92ZVJvb3QpIHtcbiAgICBmb3IgKDsgdXAtLTsgdXApIHtcbiAgICAgIHBhcnRzLnVuc2hpZnQoJy4uJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzO1xufVxuXG4vLyBvcmlnaW5hbCBzcmM6IGh0dHBzOi8vZ2l0aHViLmNvbS9zdWJzdGFjay9wYXRoLWJyb3dzZXJpZnlcbmZ1bmN0aW9uIG5vcm1hbGlzZVBhdGgocmF3UGF0aCkge1xuICB2YXIgaXNBYnNvbHV0ZSA9IHJhd1BhdGguY2hhckF0KDApID09PSAnLyc7XG4gIHZhciB0cmFpbGluZ1NsYXNoID0gcmF3UGF0aC5zdWJzdHIoLTEpID09PSAnLyc7XG5cbiAgLy8gbm9ybWFsaXNlIHRoZSBwYXRoXG4gIHZhciBwYXRoID0gbm9ybWFsaXNlQXJyYXkocmF3UGF0aC5zcGxpdCgnLycpLmZpbHRlcihmdW5jdGlvbiAocCkge1xuICAgIHJldHVybiAhIXA7XG4gIH0pLCAhaXNBYnNvbHV0ZSkuam9pbignLycpO1xuXG4gIGlmICghcGF0aCAmJiAhaXNBYnNvbHV0ZSkge1xuICAgIHBhdGggPSAnLic7XG4gIH1cbiAgaWYgKHBhdGggJiYgdHJhaWxpbmdTbGFzaCkge1xuICAgIHBhdGggKz0gJy8nO1xuICB9XG5cbiAgcmV0dXJuIChpc0Fic29sdXRlID8gJy8nIDogJycpICsgcGF0aDtcbn1cblxudmFyIFRSQUlMSU5HX1NMQVNIX1JFR0VYID0gL1xcLyQvO1xuXG5mdW5jdGlvbiB3aXRoVHJhaWxpbmdTbGFzaCh1cmkpIHtcbiAgcmV0dXJuIFRSQUlMSU5HX1NMQVNIX1JFR0VYLnRlc3QodXJpKSA/IHVyaSA6IHVyaSArIFwiL1wiO1xufVxuXG52YXIgZGVjb2RlU2NoZW1hID0gZnVuY3Rpb24gZGVjb2RlU2NoZW1hKHMpIHtcbiAgcmV0dXJuIHMucmVwbGFjZSgvPDxIVFRQPj4vZywgJ2h0dHA6Ly8nKS5yZXBsYWNlKC88PEhUVFBTPj4vZywgJ2h0dHBzOi8vJyk7XG59O1xudmFyIGVuY29kZVNjaGVtYSA9IGZ1bmN0aW9uIGVuY29kZVNjaGVtYShzKSB7XG4gIHJldHVybiBzLnJlcGxhY2UoL2h0dHA6XFwvXFwvL2csICc8PEhUVFA+PicpLnJlcGxhY2UoL2h0dHBzOlxcL1xcLy9nLCAnPDxIVFRQUz4+Jyk7XG59O1xuXG52YXIgbm9ybWFsaXNlVXJpID0gKGZ1bmN0aW9uICh1cmkpIHtcbiAgcmV0dXJuIGRlY29kZVNjaGVtYShub3JtYWxpc2VQYXRoKHdpdGhUcmFpbGluZ1NsYXNoKGVuY29kZVNjaGVtYSh1cmkpKSkpO1xufSk7XG5cbnZhciBhc3luY0dlbmVyYXRvciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQXdhaXRWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIEFzeW5jR2VuZXJhdG9yKGdlbikge1xuICAgIHZhciBmcm9udCwgYmFjaztcblxuICAgIGZ1bmN0aW9uIHNlbmQoa2V5LCBhcmcpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgIGFyZzogYXJnLFxuICAgICAgICAgIHJlc29sdmU6IHJlc29sdmUsXG4gICAgICAgICAgcmVqZWN0OiByZWplY3QsXG4gICAgICAgICAgbmV4dDogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChiYWNrKSB7XG4gICAgICAgICAgYmFjayA9IGJhY2submV4dCA9IHJlcXVlc3Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZnJvbnQgPSBiYWNrID0gcmVxdWVzdDtcbiAgICAgICAgICByZXN1bWUoa2V5LCBhcmcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXN1bWUoa2V5LCBhcmcpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBnZW5ba2V5XShhcmcpO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG5cbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXdhaXRWYWx1ZSkge1xuICAgICAgICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZS52YWx1ZSkudGhlbihmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICByZXN1bWUoXCJuZXh0XCIsIGFyZyk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgcmVzdW1lKFwidGhyb3dcIiwgYXJnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXR0bGUocmVzdWx0LmRvbmUgPyBcInJldHVyblwiIDogXCJub3JtYWxcIiwgcmVzdWx0LnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHNldHRsZShcInRocm93XCIsIGVycik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0dGxlKHR5cGUsIHZhbHVlKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcInJldHVyblwiOlxuICAgICAgICAgIGZyb250LnJlc29sdmUoe1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgZG9uZTogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJ0aHJvd1wiOlxuICAgICAgICAgIGZyb250LnJlamVjdCh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBmcm9udC5yZXNvbHZlKHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIGRvbmU6IGZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGZyb250ID0gZnJvbnQubmV4dDtcblxuICAgICAgaWYgKGZyb250KSB7XG4gICAgICAgIHJlc3VtZShmcm9udC5rZXksIGZyb250LmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiYWNrID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9pbnZva2UgPSBzZW5kO1xuXG4gICAgaWYgKHR5cGVvZiBnZW4ucmV0dXJuICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRoaXMucmV0dXJuID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHtcbiAgICBBc3luY0dlbmVyYXRvci5wcm90b3R5cGVbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgfVxuXG4gIEFzeW5jR2VuZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiB0aGlzLl9pbnZva2UoXCJuZXh0XCIsIGFyZyk7XG4gIH07XG5cbiAgQXN5bmNHZW5lcmF0b3IucHJvdG90eXBlLnRocm93ID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiB0aGlzLl9pbnZva2UoXCJ0aHJvd1wiLCBhcmcpO1xuICB9O1xuXG4gIEFzeW5jR2VuZXJhdG9yLnByb3RvdHlwZS5yZXR1cm4gPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludm9rZShcInJldHVyblwiLCBhcmcpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgd3JhcDogZnVuY3Rpb24gKGZuKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IEFzeW5jR2VuZXJhdG9yKGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIGF3YWl0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBuZXcgQXdhaXRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9O1xufSgpO1xuXG52YXIgY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxudmFyIGNyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxudmFyIGluaGVyaXRzID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTtcblxudmFyIG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKG9iaiwga2V5cykge1xuICB2YXIgdGFyZ2V0ID0ge307XG5cbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlO1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlO1xuICAgIHRhcmdldFtpXSA9IG9ialtpXTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG52YXIgcG9zc2libGVDb25zdHJ1Y3RvclJldHVybiA9IGZ1bmN0aW9uIChzZWxmLCBjYWxsKSB7XG4gIGlmICghc2VsZikge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmO1xufTtcblxudmFyIF9qc3hGaWxlTmFtZSQyID0gJy9Vc2Vycy9jcmF2ZXJvZC91c2VwYWdlcy9wYW5lbHMvYmxvY2tzL3RlbGVwb3J0LmpzJztcbnZhciBUZWxlcG9ydCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIGluaGVyaXRzKFRlbGVwb3J0LCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBUZWxlcG9ydChwcm9wcywgY29udGV4dCkge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIFRlbGVwb3J0KTtcblxuICAgIHZhciBfdGhpcyA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKFRlbGVwb3J0Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoVGVsZXBvcnQpKS5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICBfdGhpcy5jbGFzc05hbWUgPSAnVGVsZXBvcnQtJyArIHVuaXF1ZUlkKCk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgY3JlYXRlQ2xhc3MoVGVsZXBvcnQsIFt7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IHRoaXMuY2xhc3NOYW1lO1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgY29udGV4dCA9IF9wcm9wcy5jb250ZXh0LFxuICAgICAgICAgIGNoaWxkcmVuID0gX3Byb3BzLmNoaWxkcmVuLFxuICAgICAgICAgIGZvY3VzID0gX3Byb3BzLmZvY3VzLFxuICAgICAgICAgIGxvb3NlID0gX3Byb3BzLmxvb3NlLFxuICAgICAgICAgIG9uQ2xpY2sgPSBfcHJvcHMub25DbGljayxcbiAgICAgICAgICBfcmVmID0gX3Byb3BzLl9yZWYsXG4gICAgICAgICAgc3R5bGUgPSBfcHJvcHMuc3R5bGUsXG4gICAgICAgICAgc3R5bGVBY3RpdmUgPSBfcHJvcHMuc3R5bGVBY3RpdmUsXG4gICAgICAgICAgc3R5bGVIb3ZlciA9IF9wcm9wcy5zdHlsZUhvdmVyLFxuICAgICAgICAgIHRpdGxlID0gX3Byb3BzLnRpdGxlLFxuICAgICAgICAgIHRvID0gX3Byb3BzLnRvLFxuICAgICAgICAgIHJlc3QgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhfcHJvcHMsIFsnY29udGV4dCcsICdjaGlsZHJlbicsICdmb2N1cycsICdsb29zZScsICdvbkNsaWNrJywgJ19yZWYnLCAnc3R5bGUnLCAnc3R5bGVBY3RpdmUnLCAnc3R5bGVIb3ZlcicsICd0aXRsZScsICd0byddKTtcbiAgICAgIHZhciBfY29udGV4dCA9IHRoaXMuY29udGV4dCxcbiAgICAgICAgICBpc0FjdGl2ZSA9IF9jb250ZXh0LmlzQWN0aXZlLFxuICAgICAgICAgIG5hdmlnYXRlID0gX2NvbnRleHQubmF2aWdhdGUsXG4gICAgICAgICAgcm91dGUgPSBfY29udGV4dC5yb3V0ZTtcblxuICAgICAgdmFyIGFjdGl2ZSA9IGlzQWN0aXZlKHRvLCBsb29zZSk7XG4gICAgICB2YXIgaHJlZiA9IG5vcm1hbGlzZVVyaSgnJyArIHJvdXRlLmNvbnRleHQgKyB0byk7XG5cbiAgICAgIHZhciBpbmxpbmVTdHlsZSA9IHN0eWxlSG92ZXIgPyAnLicgKyBjbGFzc05hbWUgKyAnOmhvdmVyIHsnICsgdG9DU1Moc3R5bGVIb3ZlcikgKyAnfScgOiAnJztcbiAgICAgIHZhciBmaW5hbFN0eWxlID0gYWN0aXZlID8gX2V4dGVuZHMoe30sIHN0eWxlLCBzdHlsZUFjdGl2ZSkgOiBzdHlsZTtcblxuICAgICAgdmFyIGZpbmFsT25DbGljayA9IGZ1bmN0aW9uIGZpbmFsT25DbGljayhldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgcHJldmVudE5hdmlnYXRlID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcHJldmVudE5hdmlnYXRlID0gb25DbGljayhldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJldmVudE5hdmlnYXRlICE9PSB0cnVlKSB7XG4gICAgICAgICAgbmF2aWdhdGUodG8sIGZvY3VzLCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKF9yZWYpIHtcbiAgICAgICAgcmVzdC5yZWYgPSBfcmVmO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2EnLFxuICAgICAgICBfZXh0ZW5kcyh7fSwgcmVzdCwge1xuICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgICAgIGhyZWY6IGhyZWYsXG4gICAgICAgICAgb25DbGljazogZmluYWxPbkNsaWNrLFxuICAgICAgICAgIHN0eWxlOiBmaW5hbFN0eWxlLFxuICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICBfX3NvdXJjZToge1xuICAgICAgICAgICAgZmlsZU5hbWU6IF9qc3hGaWxlTmFtZSQyLFxuICAgICAgICAgICAgbGluZU51bWJlcjogNDNcbiAgICAgICAgICB9LFxuICAgICAgICAgIF9fc2VsZjogdGhpc1xuICAgICAgICB9KSxcbiAgICAgICAgUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAnc3R5bGUnLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIF9fc291cmNlOiB7XG4gICAgICAgICAgICAgIGZpbGVOYW1lOiBfanN4RmlsZU5hbWUkMixcbiAgICAgICAgICAgICAgbGluZU51bWJlcjogNTFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfX3NlbGY6IHRoaXNcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlubGluZVN0eWxlXG4gICAgICAgICksXG4gICAgICAgIGNoaWxkcmVuXG4gICAgICApO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gVGVsZXBvcnQ7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cblRlbGVwb3J0LmNvbnRleHRUeXBlcyA9IHtcbiAgaXNBY3RpdmU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG5hdmlnYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICByb3V0ZTogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBjb250ZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcbiAgfSkuaXNSZXF1aXJlZFxufTtcblxuVGVsZXBvcnQucHJvcFR5cGVzID0ge1xuICBfcmVmOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgc3R5bGVBY3RpdmU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gIHN0eWxlSG92ZXI6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gIHRvOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgdGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbn07XG5cbnZhciBfanN4RmlsZU5hbWUkMyA9ICcvVXNlcnMvY3JhdmVyb2QvdXNlcGFnZXMvcGFuZWxzL2Jsb2Nrcy9nby10by5qcyc7XG52YXIgR29UbyA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIGluaGVyaXRzKEdvVG8sIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIEdvVG8oKSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgR29Ubyk7XG4gICAgcmV0dXJuIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKEdvVG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihHb1RvKSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICBjcmVhdGVDbGFzcyhHb1RvLCBbe1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGNoaWxkcmVuID0gX3Byb3BzLmNoaWxkcmVuLFxuICAgICAgICAgIGNsYXNzTmFtZSA9IF9wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgX3JlZiA9IF9wcm9wcy5fcmVmLFxuICAgICAgICAgIHN0eWxlQWN0aXZlID0gX3Byb3BzLnN0eWxlQWN0aXZlLFxuICAgICAgICAgIHN0eWxlSG92ZXIgPSBfcHJvcHMuc3R5bGVIb3ZlcixcbiAgICAgICAgICBwcm9wcyA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9wcm9wcywgWydjaGlsZHJlbicsICdjbGFzc05hbWUnLCAnX3JlZicsICdzdHlsZUFjdGl2ZScsICdzdHlsZUhvdmVyJ10pO1xuXG5cbiAgICAgIHZhciBpbmxpbmVTdHlsZSA9IG51bGw7XG4gICAgICBpZiAoT2JqZWN0LmtleXMoc3R5bGVIb3ZlcikubGVuZ3RoKSB7XG4gICAgICAgIGlubGluZVN0eWxlID0gUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAnc3R5bGUnLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIF9fc291cmNlOiB7XG4gICAgICAgICAgICAgIGZpbGVOYW1lOiBfanN4RmlsZU5hbWUkMyxcbiAgICAgICAgICAgICAgbGluZU51bWJlcjogMTFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfX3NlbGY6IHRoaXNcbiAgICAgICAgICB9LFxuICAgICAgICAgICcuJyArIGNsYXNzTmFtZSArICc6aG92ZXIgeycgKyB0b0NTUyhzdHlsZUhvdmVyKSArICd9J1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoX3JlZikge1xuICAgICAgICBwcm9wcy5yZWYgPSBfcmVmO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2EnLFxuICAgICAgICBfZXh0ZW5kcyh7fSwgcHJvcHMsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWUsIHRhcmdldDogJ19ibGFuaycsIF9fc291cmNlOiB7XG4gICAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lJDMsXG4gICAgICAgICAgICBsaW5lTnVtYmVyOiAxOVxuICAgICAgICAgIH0sXG4gICAgICAgICAgX19zZWxmOiB0aGlzXG4gICAgICAgIH0pLFxuICAgICAgICBpbmxpbmVTdHlsZSxcbiAgICAgICAgY2hpbGRyZW5cbiAgICAgICk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBHb1RvO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5Hb1RvLnByb3BUeXBlcyA9IHtcbiAgaHJlZjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBfcmVmOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgc3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gIHN0eWxlQWN0aXZlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICBzdHlsZUhvdmVyOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG59O1xuXG52YXIgX2pzeEZpbGVOYW1lJDQgPSAnL1VzZXJzL2NyYXZlcm9kL3VzZXBhZ2VzL3BhbmVscy9ibG9ja3Mvb24tY2xpY2suanMnO1xudmFyIE9uQ2xpY2sgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBpbmhlcml0cyhPbkNsaWNrLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBPbkNsaWNrKCkge1xuICAgIHZhciBfcmVmMjtcblxuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIE9uQ2xpY2spO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoX3JlZjIgPSBPbkNsaWNrLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoT25DbGljaykpLmNhbGwuYXBwbHkoX3JlZjIsIFt0aGlzXS5jb25jYXQoYXJncykpKTtcblxuICAgIF90aGlzLnN0YXRlID0ge307XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgY3JlYXRlQ2xhc3MoT25DbGljaywgW3tcbiAgICBrZXk6ICdjb21wb25lbnRXaWxsTW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICB2YXIgcHJvcHMgPSB0aGlzLnByb3BzO1xuXG5cbiAgICAgIHZhciBtYW51YWxBY3RpdmUgPSB0eXBlb2YgcHJvcHMuaXNBY3RpdmUgPT09ICdib29sZWFuJztcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBpc0FjdGl2ZTogbWFudWFsQWN0aXZlID8gcHJvcHMuaXNBY3RpdmUgOiBmYWxzZSxcbiAgICAgICAgbWFudWFsQWN0aXZlOiBtYW51YWxBY3RpdmVcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmJpbmRPbkNsaWNrKHByb3BzLm9uQ2xpY2spO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgdGhpcy5iaW5kT25DbGljayhuZXh0UHJvcHMub25DbGljayk7XG5cbiAgICAgIHZhciBtYW51YWxBY3RpdmUgPSB0eXBlb2YgbmV4dFByb3BzLmlzQWN0aXZlID09PSAnYm9vbGVhbic7XG5cbiAgICAgIGlmIChtYW51YWxBY3RpdmUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgaXNBY3RpdmU6IG5leHRQcm9wcy5pc0FjdGl2ZSxcbiAgICAgICAgICBtYW51YWxBY3RpdmU6IG1hbnVhbEFjdGl2ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnRXaWxsVW5tb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgaWYgKHRoaXMub25DbGlja1RpbWVvdXQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMub25DbGlja1RpbWVvdXQpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2JpbmRPbkNsaWNrJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYmluZE9uQ2xpY2sob25DbGljaykge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgICAgIHZhciBmaW5hbE9uQ2xpY2sgPSB0eXBlb2Ygb25DbGljayA9PT0gJ2Z1bmN0aW9uJyA/IG9uQ2xpY2sgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhvbkNsaWNrKTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMub25DbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBmaW5hbE9uQ2xpY2soZXZlbnQpO1xuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGlmICghX3RoaXMyLnN0YXRlLm1hbnVhbEFjdGl2ZSkge1xuICAgICAgICAgIF90aGlzMi5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpc0FjdGl2ZTogdHJ1ZVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgX3RoaXMyLm9uQ2xpY2tUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpczIuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICBpc0FjdGl2ZTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3RoaXMyLm9uQ2xpY2tUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICB9LCBfdGhpczIucHJvcHMuc3R5bGVBY3RpdmVUaW1lb3V0KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgaXNBY3RpdmUgPSB0aGlzLnN0YXRlLmlzQWN0aXZlO1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgY2hpbGRyZW4gPSBfcHJvcHMuY2hpbGRyZW4sXG4gICAgICAgICAgY2xhc3NOYW1lID0gX3Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICBfaXNBY3RpdmUgPSBfcHJvcHMuaXNBY3RpdmUsXG4gICAgICAgICAgX3JlZiA9IF9wcm9wcy5fcmVmLFxuICAgICAgICAgIHN0eWxlID0gX3Byb3BzLnN0eWxlLFxuICAgICAgICAgIHN0eWxlQWN0aXZlID0gX3Byb3BzLnN0eWxlQWN0aXZlLFxuICAgICAgICAgIHN0eWxlQWN0aXZlVGltZW91dCA9IF9wcm9wcy5zdHlsZUFjdGl2ZVRpbWVvdXQsXG4gICAgICAgICAgc3R5bGVIb3ZlciA9IF9wcm9wcy5zdHlsZUhvdmVyLFxuICAgICAgICAgIHJlc3QgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhfcHJvcHMsIFsnY2hpbGRyZW4nLCAnY2xhc3NOYW1lJywgJ2lzQWN0aXZlJywgJ19yZWYnLCAnc3R5bGUnLCAnc3R5bGVBY3RpdmUnLCAnc3R5bGVBY3RpdmVUaW1lb3V0JywgJ3N0eWxlSG92ZXInXSk7XG5cblxuICAgICAgdmFyIGlubGluZVN0eWxlID0gbnVsbDtcbiAgICAgIGlmICghaXNBY3RpdmUgJiYgT2JqZWN0LmtleXMoc3R5bGVIb3ZlcikubGVuZ3RoKSB7XG4gICAgICAgIGlubGluZVN0eWxlID0gUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAnc3R5bGUnLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIF9fc291cmNlOiB7XG4gICAgICAgICAgICAgIGZpbGVOYW1lOiBfanN4RmlsZU5hbWUkNCxcbiAgICAgICAgICAgICAgbGluZU51bWJlcjogNzZcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfX3NlbGY6IHRoaXNcbiAgICAgICAgICB9LFxuICAgICAgICAgICcuJyArIGNsYXNzTmFtZSArICc6aG92ZXIgeycgKyB0b0NTUyhzdHlsZUhvdmVyKSArICd9J1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB2YXIgZmluYWxTdHlsZSA9IGlzQWN0aXZlID8gX2V4dGVuZHMoe30sIHN0eWxlLCBzdHlsZUFjdGl2ZSwge1xuICAgICAgICBvdXRsaW5lOiAwXG4gICAgICB9KSA6IF9leHRlbmRzKHt9LCBzdHlsZSwge1xuICAgICAgICBvdXRsaW5lOiAwLFxuICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChfcmVmKSB7XG4gICAgICAgIHJlc3QucmVmID0gX3JlZjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdidXR0b24nLFxuICAgICAgICBfZXh0ZW5kcyh7fSwgcmVzdCwge1xuICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgICAgIGRpc2FibGVkOiBpc0FjdGl2ZSxcbiAgICAgICAgICBvbkNsaWNrOiB0aGlzLm9uQ2xpY2ssXG4gICAgICAgICAgc3R5bGU6IGZpbmFsU3R5bGUsXG4gICAgICAgICAgX19zb3VyY2U6IHtcbiAgICAgICAgICAgIGZpbGVOYW1lOiBfanN4RmlsZU5hbWUkNCxcbiAgICAgICAgICAgIGxpbmVOdW1iZXI6IDk0XG4gICAgICAgICAgfSxcbiAgICAgICAgICBfX3NlbGY6IHRoaXNcbiAgICAgICAgfSksXG4gICAgICAgIGlubGluZVN0eWxlLFxuICAgICAgICBjaGlsZHJlblxuICAgICAgKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIE9uQ2xpY2s7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbk9uQ2xpY2suZGVmYXVsdFByb3BzID0ge1xuICBzdHlsZUFjdGl2ZVRpbWVvdXQ6IDEwMDBcbn07XG5PbkNsaWNrLnByb3BUeXBlcyA9IHtcbiAgaXNBY3RpdmU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICBvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtSZWFjdC5Qcm9wVHlwZXMuZnVuYywgUmVhY3QuUHJvcFR5cGVzLnN0cmluZ10pLFxuICBfcmVmOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgc3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gIHN0eWxlQWN0aXZlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICBzdHlsZUFjdGl2ZVRpbWVvdXQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgc3R5bGVIb3ZlcjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxufTtcblxudmFyIF9qc3hGaWxlTmFtZSQxID0gJy9Vc2Vycy9jcmF2ZXJvZC91c2VwYWdlcy9wYW5lbHMvYmxvY2tzL2NyZWF0ZS1ncm91cC5qcyc7XG5mdW5jdGlvbiBjcmVhdGVHcm91cChuYW1lLCBncm91cFN0eWxlKSB7XG4gIHZhciBHcm91cCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gICAgaW5oZXJpdHMoR3JvdXAsIF9Db21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gR3JvdXAocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIEdyb3VwKTtcblxuICAgICAgdmFyIF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoR3JvdXAuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihHcm91cCkpLmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpKTtcblxuICAgICAgX3RoaXMuY2xhc3NOYW1lID0gbmFtZSArICctJyArIHVuaXF1ZUlkKCk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgY3JlYXRlQ2xhc3MoR3JvdXAsIFt7XG4gICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgICBjaGlsZHJlbiA9IF9wcm9wcy5jaGlsZHJlbixcbiAgICAgICAgICAgIG1vcmVDbGFzc05hbWUgPSBfcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgZ29UbyA9IF9wcm9wcy5nb1RvLFxuICAgICAgICAgICAgc3R5bGUgPSBfcHJvcHMuc3R5bGUsXG4gICAgICAgICAgICB0ZWxlcG9ydFRvID0gX3Byb3BzLnRlbGVwb3J0VG8sXG4gICAgICAgICAgICBwcm9wcyA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9wcm9wcywgWydjaGlsZHJlbicsICdjbGFzc05hbWUnLCAnZ29UbycsICdzdHlsZScsICd0ZWxlcG9ydFRvJ10pO1xuICAgICAgICB2YXIgY2xhc3NOYW1lID0gdGhpcy5jbGFzc05hbWU7XG4gICAgICAgIHZhciBwYWdlcyA9IHRoaXMuY29udGV4dC5wYWdlcztcblxuXG4gICAgICAgIHZhciBmaW5hbFN0eWxlID0gX2V4dGVuZHMoe30sIGdyb3VwU3R5bGUsIHN0eWxlKTtcblxuICAgICAgICB2YXIgQmFzZSA9IHZvaWQgMDtcbiAgICAgICAgaWYgKHRlbGVwb3J0VG8pIHtcbiAgICAgICAgICBCYXNlID0gVGVsZXBvcnQ7XG4gICAgICAgICAgcHJvcHMudG8gPSB0ZWxlcG9ydFRvO1xuICAgICAgICB9IGVsc2UgaWYgKGdvVG8pIHtcbiAgICAgICAgICBCYXNlID0gR29UbztcbiAgICAgICAgICBwcm9wcy5ocmVmID0gZ29UbztcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wcy5vbkNsaWNrKSB7XG4gICAgICAgICAgQmFzZSA9IE9uQ2xpY2s7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIF9yZWYgPSBwcm9wcy5fcmVmLFxuICAgICAgICAgICAgICBzdHlsZUFjdGl2ZSA9IHByb3BzLnN0eWxlQWN0aXZlLFxuICAgICAgICAgICAgICBzdHlsZUhvdmVyID0gcHJvcHMuc3R5bGVIb3ZlcixcbiAgICAgICAgICAgICAgcmVzdCA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHByb3BzLCBbJ19yZWYnLCAnc3R5bGVBY3RpdmUnLCAnc3R5bGVIb3ZlciddKTtcblxuXG4gICAgICAgICAgdmFyIGlubGluZVN0eWxlID0gbnVsbDtcbiAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoc3R5bGVIb3ZlcikubGVuZ3RoKSB7XG4gICAgICAgICAgICBpbmxpbmVTdHlsZSA9IFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICdzdHlsZScsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBfX3NvdXJjZToge1xuICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IF9qc3hGaWxlTmFtZSQxLFxuICAgICAgICAgICAgICAgICAgbGluZU51bWJlcjogNDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF9fc2VsZjogdGhpc1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAnLicgKyBjbGFzc05hbWUgKyAnOmhvdmVyIHsnICsgdG9DU1Moc3R5bGVIb3ZlcikgKyAnfSdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgIF9leHRlbmRzKHt9LCByZXN0LCB7XG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lICsgJyAnICsgbW9yZUNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgcmVmOiBfcmVmLFxuICAgICAgICAgICAgICBzdHlsZTogZmluYWxTdHlsZSxcbiAgICAgICAgICAgICAgX19zb3VyY2U6IHtcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lJDEsXG4gICAgICAgICAgICAgICAgbGluZU51bWJlcjogNDRcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgX19zZWxmOiB0aGlzXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGlubGluZVN0eWxlLFxuICAgICAgICAgICAgY2hpbGRyZW5cbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhZ2VzICYmIHBhZ2VzLmlzU2VsZWN0aW5nKSB7XG4gICAgICAgICAgcHJvcHMub25DbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgQmFzZSxcbiAgICAgICAgICBfZXh0ZW5kcyh7fSwgcHJvcHMsIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgICAgICAgc3R5bGU6IGZpbmFsU3R5bGUsXG4gICAgICAgICAgICBfX3NvdXJjZToge1xuICAgICAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lJDEsXG4gICAgICAgICAgICAgIGxpbmVOdW1iZXI6IDY2XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX19zZWxmOiB0aGlzXG4gICAgICAgICAgfSksXG4gICAgICAgICAgY2hpbGRyZW5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XSk7XG4gICAgcmV0dXJuIEdyb3VwO1xuICB9KFJlYWN0LkNvbXBvbmVudCk7XG5cbiAgR3JvdXAuY29udGV4dFR5cGVzID0ge1xuICAgIHBhZ2VzOiBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgaXNTZWxlY3Rpbmc6IFJlYWN0LlByb3BUeXBlcy5ib29sXG4gICAgfSlcbiAgfTtcblxuICBHcm91cC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICBzdHlsZToge30sXG4gICAgc3R5bGVBY3RpdmU6IHt9LFxuICAgIHN0eWxlSG92ZXI6IHt9XG4gIH07XG5cbiAgR3JvdXAuZGlzcGxheU5hbWUgPSBuYW1lO1xuXG4gIEdyb3VwLnByb3BUeXBlcyA9IHtcbiAgICBibG9ja3M6IFJlYWN0LlByb3BUeXBlcy5hbnksXG4gICAgZ29UbzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgUmVhY3QuUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICBfcmVmOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBzdHlsZUFjdGl2ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBzdHlsZUhvdmVyOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHRlbGVwb3J0VG86IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgfTtcblxuICByZXR1cm4gR3JvdXA7XG59XG5cbnZhciBIb3Jpem9udGFsID0gY3JlYXRlR3JvdXAoJ0hvcml6b250YWwnLCB7IGZsZXhEaXJlY3Rpb246ICdyb3cnIH0pO1xuXG52YXIgVmVydGljYWwgPSBjcmVhdGVHcm91cCgnVmVydGljYWwnLCB7IGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nIH0pO1xuXG52YXIgX2pzeEZpbGVOYW1lID0gJy9Vc2Vycy9jcmF2ZXJvZC91c2VwYWdlcy9wYW5lbHMvcGxheWdyb3VuZC9ub3Rlcy5kZXYvc3JjLmpzLnRtcCc7XG52YXIgX3RoaXMgPSB1bmRlZmluZWQ7XG52YXIgTm90ZXMgPSBmdW5jdGlvbiBOb3RlcyhfcmVmKSB7XG4gIHZhciB3aWR0aCA9IF9yZWYud2lkdGg7XG4gIHJldHVybiBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgIFZlcnRpY2FsLFxuICAgIHsgc3R5bGU6IHsgYmFja2dyb3VuZENvbG9yOiAnIzAwZmYwMCcsIGZvbnRGYW1pbHk6ICdzYW5zLXNlcmlmJywgZm9udFNpemU6IDEyNSwgcGFkZGluZzogMjAsIHdpZHRoOiB3aWR0aCB9LCBfX3NvdXJjZToge1xuICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lLFxuICAgICAgICBsaW5lTnVtYmVyOiA2XG4gICAgICB9LFxuICAgICAgX19zZWxmOiBfdGhpc1xuICAgIH0sXG4gICAgJ05vdGVzJyxcbiAgICBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgSG9yaXpvbnRhbCxcbiAgICAgIHsgc3R5bGU6IHN0eWxlQWN0aW9uLCB0ZWxlcG9ydFRvOiAnLi4vY29udGVudC0xL25vdGUtMScsIF9fc291cmNlOiB7XG4gICAgICAgICAgZmlsZU5hbWU6IF9qc3hGaWxlTmFtZSxcbiAgICAgICAgICBsaW5lTnVtYmVyOiA5XG4gICAgICAgIH0sXG4gICAgICAgIF9fc2VsZjogX3RoaXNcbiAgICAgIH0sXG4gICAgICAnTm90ZSAxIGluIENvbnRlbnQgMSdcbiAgICApLFxuICAgIFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICBIb3Jpem9udGFsLFxuICAgICAgeyBzdHlsZTogc3R5bGVBY3Rpb24sIHRlbGVwb3J0VG86ICcuLi9jb250ZW50LTEvbm90ZS0yJywgX19zb3VyY2U6IHtcbiAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lLFxuICAgICAgICAgIGxpbmVOdW1iZXI6IDEwXG4gICAgICAgIH0sXG4gICAgICAgIF9fc2VsZjogX3RoaXNcbiAgICAgIH0sXG4gICAgICAnTm90ZSAyIGluIENvbnRlbnQgMSdcbiAgICApLFxuICAgIFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICBIb3Jpem9udGFsLFxuICAgICAgeyBzdHlsZTogc3R5bGVBY3Rpb24sIHRlbGVwb3J0VG86ICcuLi9jb250ZW50LTIvbm90ZS0zJywgX19zb3VyY2U6IHtcbiAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lLFxuICAgICAgICAgIGxpbmVOdW1iZXI6IDExXG4gICAgICAgIH0sXG4gICAgICAgIF9fc2VsZjogX3RoaXNcbiAgICAgIH0sXG4gICAgICAnTm90ZSAzIGluIENvbnRlbnQgMidcbiAgICApLFxuICAgIFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICBIb3Jpem9udGFsLFxuICAgICAgeyBzdHlsZTogc3R5bGVBY3Rpb24sIHRlbGVwb3J0VG86ICcuLi9jb250ZW50LTIvbm90ZS00JywgX19zb3VyY2U6IHtcbiAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lLFxuICAgICAgICAgIGxpbmVOdW1iZXI6IDEyXG4gICAgICAgIH0sXG4gICAgICAgIF9fc2VsZjogX3RoaXNcbiAgICAgIH0sXG4gICAgICAnTm90ZSA0IGluIENvbnRlbnQgMidcbiAgICApLFxuICAgIFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICBIb3Jpem9udGFsLFxuICAgICAgeyBzdHlsZTogc3R5bGVBY3Rpb24sIHRlbGVwb3J0VG86ICcuLi9jb250ZW50LTIvbm90ZS01JywgX19zb3VyY2U6IHtcbiAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lLFxuICAgICAgICAgIGxpbmVOdW1iZXI6IDEzXG4gICAgICAgIH0sXG4gICAgICAgIF9fc2VsZjogX3RoaXNcbiAgICAgIH0sXG4gICAgICAnTm90ZSA1IGluIENvbnRlbnQgMidcbiAgICApXG4gICk7XG59O1xuXG52YXIgTm90ZSA9IGZ1bmN0aW9uIE5vdGUoX3JlZjIpIHtcbiAgdmFyIG5vdGUgPSBfcmVmMi5ub3RlLFxuICAgICAgd2lkdGggPSBfcmVmMi53aWR0aDtcbiAgcmV0dXJuIFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgVmVydGljYWwsXG4gICAgeyBzdHlsZTogeyBiYWNrZ3JvdW5kQ29sb3I6ICcjMDBmZjAwJywgZm9udEZhbWlseTogJ3NhbnMtc2VyaWYnLCBmb250U2l6ZTogMTI1LCBwYWRkaW5nOiAyMCwgd2lkdGg6IHdpZHRoIH0sIF9fc291cmNlOiB7XG4gICAgICAgIGZpbGVOYW1lOiBfanN4RmlsZU5hbWUsXG4gICAgICAgIGxpbmVOdW1iZXI6IDE4XG4gICAgICB9LFxuICAgICAgX19zZWxmOiBfdGhpc1xuICAgIH0sXG4gICAgbm90ZVxuICApO1xufTtcblxudmFyIHR5cGVzID0ge1xuICBOb3RlOiBOb3RlLFxuICBOb3RlczogTm90ZXNcbn07XG5cbnZhciBwYW5lbHMgPSB7XG4gICcvJzoge1xuICAgIGRvY2tMZWZ0OiBmYWxzZSxcbiAgICB0eXBlOiAnTm90ZXMnLFxuICAgIHdpZHRoOiAzNjBcbiAgfSxcbiAgJy86bm90ZSc6IHtcbiAgICBkb2NrTGVmdDogZmFsc2UsXG4gICAgdHlwZTogJ05vdGUnLFxuICAgIHdpZHRoOiAzNjBcbiAgfVxufTtcblxudmFyIGxvb2t1cCA9IFsnLzpub3RlJ107XG5cbnZhciBzdHlsZUFjdGlvbiA9IHtcbiAgYmFja2dyb3VuZENvbG9yOiAnI2YwZjBmMCcsXG4gIGJvcmRlclJhZGl1czogNSxcbiAgY29sb3I6ICcjMDAwMDAwJyxcbiAgY3Vyc29yOiAncG9pbnRlcicsXG4gIGZvbnRGYW1pbHk6ICdzYW5zLXNlcmlmJyxcbiAgZm9udFNpemU6IDIwLFxuICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gIG1hcmdpbjogMi41LFxuICBwYWRkaW5nOiAnMTBweCAyMHB4JyxcbiAgdGV4dERlY29yYXRpb246ICdub25lJyxcbiAgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZSdcbn07XG5cbmV4cG9ydHMudHlwZXMgPSB0eXBlcztcbmV4cG9ydHMucGFuZWxzID0gcGFuZWxzO1xuZXhwb3J0cy5sb29rdXAgPSBsb29rdXA7Il19
