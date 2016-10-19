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
var hasSeparator = /[\W_]/
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
      var _props = this.props;
      var context = _props.context;
      var children = _props.children;
      var focus = _props.focus;
      var loose = _props.loose;
      var onClick = _props.onClick;
      var _ref = _props._ref;
      var style = _props.style;
      var styleActive = _props.styleActive;
      var styleHover = _props.styleHover;
      var title = _props.title;
      var to = _props.to;
      var rest = objectWithoutProperties(_props, ['context', 'children', 'focus', 'loose', 'onClick', '_ref', 'style', 'styleActive', 'styleHover', 'title', 'to']);
      var _context = this.context;
      var isActive = _context.isActive;
      var navigate = _context.navigate;
      var route = _context.route;

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
      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var _ref = _props._ref;
      var styleActive = _props.styleActive;
      var styleHover = _props.styleHover;
      var props = objectWithoutProperties(_props, ['children', 'className', '_ref', 'styleActive', 'styleHover']);


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

      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var _isActive = _props.isActive;
      var _ref = _props._ref;
      var style = _props.style;
      var styleActive = _props.styleActive;
      var styleActiveTimeout = _props.styleActiveTimeout;
      var styleHover = _props.styleHover;
      var rest = objectWithoutProperties(_props, ['children', 'className', 'isActive', '_ref', 'style', 'styleActive', 'styleActiveTimeout', 'styleHover']);


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
        var _props = this.props;
        var children = _props.children;
        var moreClassName = _props.className;
        var goTo = _props.goTo;
        var style = _props.style;
        var teleportTo = _props.teleportTo;
        var props = objectWithoutProperties(_props, ['children', 'className', 'goTo', 'style', 'teleportTo']);
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
          var _ref = props._ref;
          var styleActive = props.styleActive;
          var styleHover = props.styleHover;
          var rest = objectWithoutProperties(props, ['_ref', 'styleActive', 'styleHover']);


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
  var note = _ref2.note;
  var width = _ref2.width;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbWluaS11bmlxdWUtaWQvaW5kZXguY2pzLmpzIiwibm9kZV9tb2R1bGVzL3N0eWxlLXRvLWNzcy9kaXN0L2Nqcy5qcyIsIm5vZGVfbW9kdWxlcy90by1uby1jYXNlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3RvLXNsdWctY2FzZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy90by1zcGFjZS1jYXNlL2luZGV4LmpzIiwicGxheWdyb3VuZC9ub3Rlcy5kZXYvc3JjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaWQgPSAxO1xuXG5mdW5jdGlvbiBpbmRleCAoKSB7XG4gIHJldHVybiBcIlwiICsgaWQrKztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbmRleDsiLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wRGVmYXVsdCAoZXgpIHsgcmV0dXJuICdkZWZhdWx0JyBpbiBleCA/IGV4WydkZWZhdWx0J10gOiBleDsgfVxuXG52YXIgdG9TbHVnQ2FzZSA9IF9pbnRlcm9wRGVmYXVsdChyZXF1aXJlKCd0by1zbHVnLWNhc2UnKSk7XG5cbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBDU1NQcm9wZXJ0eVxuICovXG5cbi8vIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9mYWNlYm9vay9yZWFjdC8zYjk2NjUwZTM5ZGRkYTViYTQ5MjQ1NzEzZWYxNmRiYzUyZDI1ZTllL3NyYy9yZW5kZXJlcnMvZG9tL3NoYXJlZC9DU1NQcm9wZXJ0eS5qc1xuXG4vKipcbiAqIENTUyBwcm9wZXJ0aWVzIHdoaWNoIGFjY2VwdCBudW1iZXJzIGJ1dCBhcmUgbm90IGluIHVuaXRzIG9mIFwicHhcIi5cbiAqL1xudmFyIGlzVW5pdGxlc3NOdW1iZXIgPSB7XG4gIGFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50OiB0cnVlLFxuICBib3hGbGV4OiB0cnVlLFxuICBib3hGbGV4R3JvdXA6IHRydWUsXG4gIGJveE9yZGluYWxHcm91cDogdHJ1ZSxcbiAgY29sdW1uQ291bnQ6IHRydWUsXG4gIGZsZXg6IHRydWUsXG4gIGZsZXhHcm93OiB0cnVlLFxuICBmbGV4UG9zaXRpdmU6IHRydWUsXG4gIGZsZXhTaHJpbms6IHRydWUsXG4gIGZsZXhOZWdhdGl2ZTogdHJ1ZSxcbiAgZmxleE9yZGVyOiB0cnVlLFxuICBncmlkUm93OiB0cnVlLFxuICBncmlkQ29sdW1uOiB0cnVlLFxuICBmb250V2VpZ2h0OiB0cnVlLFxuICBsaW5lQ2xhbXA6IHRydWUsXG4gIGxpbmVIZWlnaHQ6IHRydWUsXG4gIG9wYWNpdHk6IHRydWUsXG4gIG9yZGVyOiB0cnVlLFxuICBvcnBoYW5zOiB0cnVlLFxuICB0YWJTaXplOiB0cnVlLFxuICB3aWRvd3M6IHRydWUsXG4gIHpJbmRleDogdHJ1ZSxcbiAgem9vbTogdHJ1ZSxcblxuICAvLyBTVkctcmVsYXRlZCBwcm9wZXJ0aWVzXG4gIGZpbGxPcGFjaXR5OiB0cnVlLFxuICBzdG9wT3BhY2l0eTogdHJ1ZSxcbiAgc3Ryb2tlRGFzaG9mZnNldDogdHJ1ZSxcbiAgc3Ryb2tlT3BhY2l0eTogdHJ1ZSxcbiAgc3Ryb2tlV2lkdGg6IHRydWVcbn07XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeCB2ZW5kb3Itc3BlY2lmaWMgcHJlZml4LCBlZzogV2Via2l0XG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHN0eWxlIG5hbWUsIGVnOiB0cmFuc2l0aW9uRHVyYXRpb25cbiAqIEByZXR1cm4ge3N0cmluZ30gc3R5bGUgbmFtZSBwcmVmaXhlZCB3aXRoIGBwcmVmaXhgLCBwcm9wZXJseSBjYW1lbENhc2VkLCBlZzpcbiAqIFdlYmtpdFRyYW5zaXRpb25EdXJhdGlvblxuICovXG5mdW5jdGlvbiBwcmVmaXhLZXkocHJlZml4LCBrZXkpIHtcbiAgcmV0dXJuIHByZWZpeCArIGtleS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGtleS5zdWJzdHJpbmcoMSk7XG59XG5cbi8qKlxuICogU3VwcG9ydCBzdHlsZSBuYW1lcyB0aGF0IG1heSBjb21lIHBhc3NlZCBpbiBwcmVmaXhlZCBieSBhZGRpbmcgcGVybXV0YXRpb25zXG4gKiBvZiB2ZW5kb3IgcHJlZml4ZXMuXG4gKi9cbnZhciBwcmVmaXhlcyA9IFsnV2Via2l0JywgJ21zJywgJ01veicsICdPJ107XG5cbi8vIFVzaW5nIE9iamVjdC5rZXlzIGhlcmUsIG9yIGVsc2UgdGhlIHZhbmlsbGEgZm9yLWluIGxvb3AgbWFrZXMgSUU4IGdvIGludG8gYW5cbi8vIGluZmluaXRlIGxvb3AsIGJlY2F1c2UgaXQgaXRlcmF0ZXMgb3ZlciB0aGUgbmV3bHkgYWRkZWQgcHJvcHMgdG9vLlxuT2JqZWN0LmtleXMoaXNVbml0bGVzc051bWJlcikuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuICBwcmVmaXhlcy5mb3JFYWNoKGZ1bmN0aW9uIChwcmVmaXgpIHtcbiAgICBpc1VuaXRsZXNzTnVtYmVyW3ByZWZpeEtleShwcmVmaXgsIHByb3ApXSA9IGlzVW5pdGxlc3NOdW1iZXJbcHJvcF07XG4gIH0pO1xufSk7XG5cbmZ1bmN0aW9uIHRvQ1NTKG9iaikge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoZnVuY3Rpb24gKHJhd0tleSkge1xuICAgIHZhciBrZXkgPSB0b1NsdWdDYXNlKHJhd0tleSk7XG4gICAgaWYgKC9ed2Via2l0Ly50ZXN0KGtleSkgfHwgL15tb3ovLnRlc3Qoa2V5KSB8fCAvXm1zLy50ZXN0KGtleSkpIHtcbiAgICAgIGtleSA9ICctJyArIGtleTtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWUgPSBvYmpbcmF3S2V5XTtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiAhKGlzVW5pdGxlc3NOdW1iZXIuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBpc1VuaXRsZXNzTnVtYmVyW2tleV0pKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlICsgJ3B4JztcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5ICsgJzonICsgdmFsdWUgKyAnICFpbXBvcnRhbnQ7JztcbiAgfSkuam9pbignJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9DU1M7IiwiXG4vKipcbiAqIEV4cG9ydC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRvTm9DYXNlXG5cbi8qKlxuICogVGVzdCB3aGV0aGVyIGEgc3RyaW5nIGlzIGNhbWVsLWNhc2UuXG4gKi9cblxudmFyIGhhc1NwYWNlID0gL1xccy9cbnZhciBoYXNTZXBhcmF0b3IgPSAvW1xcV19dL1xudmFyIGhhc0NhbWVsID0gLyhbYS16XVtBLVpdfFtBLVpdW2Etel0pL1xuXG4vKipcbiAqIFJlbW92ZSBhbnkgc3RhcnRpbmcgY2FzZSBmcm9tIGEgYHN0cmluZ2AsIGxpa2UgY2FtZWwgb3Igc25ha2UsIGJ1dCBrZWVwXG4gKiBzcGFjZXMgYW5kIHB1bmN0dWF0aW9uIHRoYXQgbWF5IGJlIGltcG9ydGFudCBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5cbmZ1bmN0aW9uIHRvTm9DYXNlKHN0cmluZykge1xuICBpZiAoaGFzU3BhY2UudGVzdChzdHJpbmcpKSByZXR1cm4gc3RyaW5nLnRvTG93ZXJDYXNlKClcbiAgaWYgKGhhc1NlcGFyYXRvci50ZXN0KHN0cmluZykpIHJldHVybiAodW5zZXBhcmF0ZShzdHJpbmcpIHx8IHN0cmluZykudG9Mb3dlckNhc2UoKVxuICBpZiAoaGFzQ2FtZWwudGVzdChzdHJpbmcpKSByZXR1cm4gdW5jYW1lbGl6ZShzdHJpbmcpLnRvTG93ZXJDYXNlKClcbiAgcmV0dXJuIHN0cmluZy50b0xvd2VyQ2FzZSgpXG59XG5cbi8qKlxuICogU2VwYXJhdG9yIHNwbGl0dGVyLlxuICovXG5cbnZhciBzZXBhcmF0b3JTcGxpdHRlciA9IC9bXFxXX10rKC58JCkvZ1xuXG4vKipcbiAqIFVuLXNlcGFyYXRlIGEgYHN0cmluZ2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5cbmZ1bmN0aW9uIHVuc2VwYXJhdGUoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZShzZXBhcmF0b3JTcGxpdHRlciwgZnVuY3Rpb24gKG0sIG5leHQpIHtcbiAgICByZXR1cm4gbmV4dCA/ICcgJyArIG5leHQgOiAnJ1xuICB9KVxufVxuXG4vKipcbiAqIENhbWVsY2FzZSBzcGxpdHRlci5cbiAqL1xuXG52YXIgY2FtZWxTcGxpdHRlciA9IC8oLikoW0EtWl0rKS9nXG5cbi8qKlxuICogVW4tY2FtZWxjYXNlIGEgYHN0cmluZ2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5cbmZ1bmN0aW9uIHVuY2FtZWxpemUoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZShjYW1lbFNwbGl0dGVyLCBmdW5jdGlvbiAobSwgcHJldmlvdXMsIHVwcGVycykge1xuICAgIHJldHVybiBwcmV2aW91cyArICcgJyArIHVwcGVycy50b0xvd2VyQ2FzZSgpLnNwbGl0KCcnKS5qb2luKCcgJylcbiAgfSlcbn1cbiIsIlxudmFyIHRvU3BhY2UgPSByZXF1aXJlKCd0by1zcGFjZS1jYXNlJylcblxuLyoqXG4gKiBFeHBvcnQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB0b1NsdWdDYXNlXG5cbi8qKlxuICogQ29udmVydCBhIGBzdHJpbmdgIHRvIHNsdWcgY2FzZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuZnVuY3Rpb24gdG9TbHVnQ2FzZShzdHJpbmcpIHtcbiAgcmV0dXJuIHRvU3BhY2Uoc3RyaW5nKS5yZXBsYWNlKC9cXHMvZywgJy0nKVxufVxuIiwiXG52YXIgY2xlYW4gPSByZXF1aXJlKCd0by1uby1jYXNlJylcblxuLyoqXG4gKiBFeHBvcnQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB0b1NwYWNlQ2FzZVxuXG4vKipcbiAqIENvbnZlcnQgYSBgc3RyaW5nYCB0byBzcGFjZSBjYXNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuXG5mdW5jdGlvbiB0b1NwYWNlQ2FzZShzdHJpbmcpIHtcbiAgcmV0dXJuIGNsZWFuKHN0cmluZykucmVwbGFjZSgvW1xcV19dKygufCQpL2csIGZ1bmN0aW9uIChtYXRjaGVzLCBtYXRjaCkge1xuICAgIHJldHVybiBtYXRjaCA/ICcgJyArIG1hdGNoIDogJydcbiAgfSkudHJpbSgpXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wRGVmYXVsdCAoZXgpIHsgcmV0dXJuIChleCAmJiAodHlwZW9mIGV4ID09PSAnb2JqZWN0JykgJiYgJ2RlZmF1bHQnIGluIGV4KSA/IGV4WydkZWZhdWx0J10gOiBleDsgfVxuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJlYWN0X19kZWZhdWx0ID0gX2ludGVyb3BEZWZhdWx0KFJlYWN0KTtcbnZhciB0b0NTUyA9IF9pbnRlcm9wRGVmYXVsdChyZXF1aXJlKCdzdHlsZS10by1jc3MnKSk7XG52YXIgdW5pcXVlSWQgPSBfaW50ZXJvcERlZmF1bHQocmVxdWlyZSgnbWluaS11bmlxdWUtaWQnKSk7XG5cbi8vIG9yaWdpbmFsIHNyYzogaHR0cHM6Ly9naXRodWIuY29tL3N1YnN0YWNrL3BhdGgtYnJvd3NlcmlmeVxuZnVuY3Rpb24gbm9ybWFsaXNlQXJyYXkocGFydHMsIGFsbG93QWJvdmVSb290KSB7XG4gIC8vIGlmIHRoZSBwYXRoIHRyaWVzIHRvIGdvIGFib3ZlIHRoZSByb290LCBgdXBgIGVuZHMgdXAgPiAwXG4gIHZhciB1cCA9IDA7XG4gIGZvciAodmFyIGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHZhciBsYXN0ID0gcGFydHNbaV07XG4gICAgaWYgKGxhc3QgPT09ICcuJykge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgIH0gZWxzZSBpZiAobGFzdCA9PT0gJy4uJykge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgICAgdXArKztcbiAgICB9IGVsc2UgaWYgKHVwKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZSBwYXRoIGlzIGFsbG93ZWQgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIHJlc3RvcmUgbGVhZGluZyAuLnNcbiAgaWYgKGFsbG93QWJvdmVSb290KSB7XG4gICAgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgICBwYXJ0cy51bnNoaWZ0KCcuLicpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYXJ0cztcbn1cblxuLy8gb3JpZ2luYWwgc3JjOiBodHRwczovL2dpdGh1Yi5jb20vc3Vic3RhY2svcGF0aC1icm93c2VyaWZ5XG5mdW5jdGlvbiBub3JtYWxpc2VQYXRoKHJhd1BhdGgpIHtcbiAgdmFyIGlzQWJzb2x1dGUgPSByYXdQYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xuICB2YXIgdHJhaWxpbmdTbGFzaCA9IHJhd1BhdGguc3Vic3RyKC0xKSA9PT0gJy8nO1xuXG4gIC8vIG5vcm1hbGlzZSB0aGUgcGF0aFxuICB2YXIgcGF0aCA9IG5vcm1hbGlzZUFycmF5KHJhd1BhdGguc3BsaXQoJy8nKS5maWx0ZXIoZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gISFwO1xuICB9KSwgIWlzQWJzb2x1dGUpLmpvaW4oJy8nKTtcblxuICBpZiAoIXBhdGggJiYgIWlzQWJzb2x1dGUpIHtcbiAgICBwYXRoID0gJy4nO1xuICB9XG4gIGlmIChwYXRoICYmIHRyYWlsaW5nU2xhc2gpIHtcbiAgICBwYXRoICs9ICcvJztcbiAgfVxuXG4gIHJldHVybiAoaXNBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHBhdGg7XG59XG5cbnZhciBUUkFJTElOR19TTEFTSF9SRUdFWCA9IC9cXC8kLztcblxuZnVuY3Rpb24gd2l0aFRyYWlsaW5nU2xhc2godXJpKSB7XG4gIHJldHVybiBUUkFJTElOR19TTEFTSF9SRUdFWC50ZXN0KHVyaSkgPyB1cmkgOiB1cmkgKyBcIi9cIjtcbn1cblxudmFyIGRlY29kZVNjaGVtYSA9IGZ1bmN0aW9uIGRlY29kZVNjaGVtYShzKSB7XG4gIHJldHVybiBzLnJlcGxhY2UoLzw8SFRUUD4+L2csICdodHRwOi8vJykucmVwbGFjZSgvPDxIVFRQUz4+L2csICdodHRwczovLycpO1xufTtcbnZhciBlbmNvZGVTY2hlbWEgPSBmdW5jdGlvbiBlbmNvZGVTY2hlbWEocykge1xuICByZXR1cm4gcy5yZXBsYWNlKC9odHRwOlxcL1xcLy9nLCAnPDxIVFRQPj4nKS5yZXBsYWNlKC9odHRwczpcXC9cXC8vZywgJzw8SFRUUFM+PicpO1xufTtcblxudmFyIG5vcm1hbGlzZVVyaSA9IChmdW5jdGlvbiAodXJpKSB7XG4gIHJldHVybiBkZWNvZGVTY2hlbWEobm9ybWFsaXNlUGF0aCh3aXRoVHJhaWxpbmdTbGFzaChlbmNvZGVTY2hlbWEodXJpKSkpKTtcbn0pO1xuXG52YXIgYXN5bmNHZW5lcmF0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEF3YWl0VmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBBc3luY0dlbmVyYXRvcihnZW4pIHtcbiAgICB2YXIgZnJvbnQsIGJhY2s7XG5cbiAgICBmdW5jdGlvbiBzZW5kKGtleSwgYXJnKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgcmVxdWVzdCA9IHtcbiAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICBhcmc6IGFyZyxcbiAgICAgICAgICByZXNvbHZlOiByZXNvbHZlLFxuICAgICAgICAgIHJlamVjdDogcmVqZWN0LFxuICAgICAgICAgIG5leHQ6IG51bGxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYmFjaykge1xuICAgICAgICAgIGJhY2sgPSBiYWNrLm5leHQgPSByZXF1ZXN0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZyb250ID0gYmFjayA9IHJlcXVlc3Q7XG4gICAgICAgICAgcmVzdW1lKGtleSwgYXJnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzdW1lKGtleSwgYXJnKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gZ2VuW2tleV0oYXJnKTtcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuXG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEF3YWl0VmFsdWUpIHtcbiAgICAgICAgICBQcm9taXNlLnJlc29sdmUodmFsdWUudmFsdWUpLnRoZW4oZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgcmVzdW1lKFwibmV4dFwiLCBhcmcpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgIHJlc3VtZShcInRocm93XCIsIGFyZyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0dGxlKHJlc3VsdC5kb25lID8gXCJyZXR1cm5cIiA6IFwibm9ybWFsXCIsIHJlc3VsdC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBzZXR0bGUoXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHRsZSh0eXBlLCB2YWx1ZSkge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJyZXR1cm5cIjpcbiAgICAgICAgICBmcm9udC5yZXNvbHZlKHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIGRvbmU6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFwidGhyb3dcIjpcbiAgICAgICAgICBmcm9udC5yZWplY3QodmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgZnJvbnQucmVzb2x2ZSh7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBkb25lOiBmYWxzZVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBmcm9udCA9IGZyb250Lm5leHQ7XG5cbiAgICAgIGlmIChmcm9udCkge1xuICAgICAgICByZXN1bWUoZnJvbnQua2V5LCBmcm9udC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYmFjayA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5faW52b2tlID0gc2VuZDtcblxuICAgIGlmICh0eXBlb2YgZ2VuLnJldHVybiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aGlzLnJldHVybiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5hc3luY0l0ZXJhdG9yKSB7XG4gICAgQXN5bmNHZW5lcmF0b3IucHJvdG90eXBlW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gIH1cblxuICBBc3luY0dlbmVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4gdGhpcy5faW52b2tlKFwibmV4dFwiLCBhcmcpO1xuICB9O1xuXG4gIEFzeW5jR2VuZXJhdG9yLnByb3RvdHlwZS50aHJvdyA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4gdGhpcy5faW52b2tlKFwidGhyb3dcIiwgYXJnKTtcbiAgfTtcblxuICBBc3luY0dlbmVyYXRvci5wcm90b3R5cGUucmV0dXJuID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiB0aGlzLl9pbnZva2UoXCJyZXR1cm5cIiwgYXJnKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHdyYXA6IGZ1bmN0aW9uIChmbikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBc3luY0dlbmVyYXRvcihmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBhd2FpdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gbmV3IEF3YWl0VmFsdWUodmFsdWUpO1xuICAgIH1cbiAgfTtcbn0oKTtcblxudmFyIGNsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07XG5cbnZhciBjcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbnZhciBpbmhlcml0cyA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07XG5cbnZhciBvYmplY3RXaXRob3V0UHJvcGVydGllcyA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgdmFyIHRhcmdldCA9IHt9O1xuXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTtcbiAgICB0YXJnZXRbaV0gPSBvYmpbaV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxudmFyIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4gPSBmdW5jdGlvbiAoc2VsZiwgY2FsbCkge1xuICBpZiAoIXNlbGYpIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjtcbn07XG5cbnZhciBfanN4RmlsZU5hbWUkMiA9ICcvVXNlcnMvY3JhdmVyb2QvdXNlcGFnZXMvcGFuZWxzL2Jsb2Nrcy90ZWxlcG9ydC5qcyc7XG52YXIgVGVsZXBvcnQgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBpbmhlcml0cyhUZWxlcG9ydCwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gVGVsZXBvcnQocHJvcHMsIGNvbnRleHQpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBUZWxlcG9ydCk7XG5cbiAgICB2YXIgX3RoaXMgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChUZWxlcG9ydC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFRlbGVwb3J0KSkuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkpO1xuXG4gICAgX3RoaXMuY2xhc3NOYW1lID0gJ1RlbGVwb3J0LScgKyB1bmlxdWVJZCgpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIGNyZWF0ZUNsYXNzKFRlbGVwb3J0LCBbe1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBjbGFzc05hbWUgPSB0aGlzLmNsYXNzTmFtZTtcbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNvbnRleHQgPSBfcHJvcHMuY29udGV4dDtcbiAgICAgIHZhciBjaGlsZHJlbiA9IF9wcm9wcy5jaGlsZHJlbjtcbiAgICAgIHZhciBmb2N1cyA9IF9wcm9wcy5mb2N1cztcbiAgICAgIHZhciBsb29zZSA9IF9wcm9wcy5sb29zZTtcbiAgICAgIHZhciBvbkNsaWNrID0gX3Byb3BzLm9uQ2xpY2s7XG4gICAgICB2YXIgX3JlZiA9IF9wcm9wcy5fcmVmO1xuICAgICAgdmFyIHN0eWxlID0gX3Byb3BzLnN0eWxlO1xuICAgICAgdmFyIHN0eWxlQWN0aXZlID0gX3Byb3BzLnN0eWxlQWN0aXZlO1xuICAgICAgdmFyIHN0eWxlSG92ZXIgPSBfcHJvcHMuc3R5bGVIb3ZlcjtcbiAgICAgIHZhciB0aXRsZSA9IF9wcm9wcy50aXRsZTtcbiAgICAgIHZhciB0byA9IF9wcm9wcy50bztcbiAgICAgIHZhciByZXN0ID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3Byb3BzLCBbJ2NvbnRleHQnLCAnY2hpbGRyZW4nLCAnZm9jdXMnLCAnbG9vc2UnLCAnb25DbGljaycsICdfcmVmJywgJ3N0eWxlJywgJ3N0eWxlQWN0aXZlJywgJ3N0eWxlSG92ZXInLCAndGl0bGUnLCAndG8nXSk7XG4gICAgICB2YXIgX2NvbnRleHQgPSB0aGlzLmNvbnRleHQ7XG4gICAgICB2YXIgaXNBY3RpdmUgPSBfY29udGV4dC5pc0FjdGl2ZTtcbiAgICAgIHZhciBuYXZpZ2F0ZSA9IF9jb250ZXh0Lm5hdmlnYXRlO1xuICAgICAgdmFyIHJvdXRlID0gX2NvbnRleHQucm91dGU7XG5cbiAgICAgIHZhciBhY3RpdmUgPSBpc0FjdGl2ZSh0bywgbG9vc2UpO1xuICAgICAgdmFyIGhyZWYgPSBub3JtYWxpc2VVcmkoJycgKyByb3V0ZS5jb250ZXh0ICsgdG8pO1xuXG4gICAgICB2YXIgaW5saW5lU3R5bGUgPSBzdHlsZUhvdmVyID8gJy4nICsgY2xhc3NOYW1lICsgJzpob3ZlciB7JyArIHRvQ1NTKHN0eWxlSG92ZXIpICsgJ30nIDogJyc7XG4gICAgICB2YXIgZmluYWxTdHlsZSA9IGFjdGl2ZSA/IF9leHRlbmRzKHt9LCBzdHlsZSwgc3R5bGVBY3RpdmUpIDogc3R5bGU7XG5cbiAgICAgIHZhciBmaW5hbE9uQ2xpY2sgPSBmdW5jdGlvbiBmaW5hbE9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyIHByZXZlbnROYXZpZ2F0ZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygb25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHByZXZlbnROYXZpZ2F0ZSA9IG9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByZXZlbnROYXZpZ2F0ZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIG5hdmlnYXRlKHRvLCBmb2N1cywgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGlmIChfcmVmKSB7XG4gICAgICAgIHJlc3QucmVmID0gX3JlZjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdhJyxcbiAgICAgICAgX2V4dGVuZHMoe30sIHJlc3QsIHtcbiAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgICAgICBocmVmOiBocmVmLFxuICAgICAgICAgIG9uQ2xpY2s6IGZpbmFsT25DbGljayxcbiAgICAgICAgICBzdHlsZTogZmluYWxTdHlsZSxcbiAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgX19zb3VyY2U6IHtcbiAgICAgICAgICAgIGZpbGVOYW1lOiBfanN4RmlsZU5hbWUkMixcbiAgICAgICAgICAgIGxpbmVOdW1iZXI6IDQzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBfX3NlbGY6IHRoaXNcbiAgICAgICAgfSksXG4gICAgICAgIFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgJ3N0eWxlJyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBfX3NvdXJjZToge1xuICAgICAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lJDIsXG4gICAgICAgICAgICAgIGxpbmVOdW1iZXI6IDUxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX19zZWxmOiB0aGlzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbmxpbmVTdHlsZVxuICAgICAgICApLFxuICAgICAgICBjaGlsZHJlblxuICAgICAgKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFRlbGVwb3J0O1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5UZWxlcG9ydC5jb250ZXh0VHlwZXMgPSB7XG4gIGlzQWN0aXZlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBuYXZpZ2F0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgcm91dGU6IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgY29udGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXG4gIH0pLmlzUmVxdWlyZWRcbn07XG5cblRlbGVwb3J0LnByb3BUeXBlcyA9IHtcbiAgX3JlZjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIHN0eWxlQWN0aXZlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICBzdHlsZUhvdmVyOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICB0bzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvbkNsaWNrOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgc3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gIHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG59O1xuXG52YXIgX2pzeEZpbGVOYW1lJDMgPSAnL1VzZXJzL2NyYXZlcm9kL3VzZXBhZ2VzL3BhbmVscy9ibG9ja3MvZ28tdG8uanMnO1xudmFyIEdvVG8gPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBpbmhlcml0cyhHb1RvLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBHb1RvKCkge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIEdvVG8pO1xuICAgIHJldHVybiBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChHb1RvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoR29UbykpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgY3JlYXRlQ2xhc3MoR29UbywgW3tcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjaGlsZHJlbiA9IF9wcm9wcy5jaGlsZHJlbjtcbiAgICAgIHZhciBjbGFzc05hbWUgPSBfcHJvcHMuY2xhc3NOYW1lO1xuICAgICAgdmFyIF9yZWYgPSBfcHJvcHMuX3JlZjtcbiAgICAgIHZhciBzdHlsZUFjdGl2ZSA9IF9wcm9wcy5zdHlsZUFjdGl2ZTtcbiAgICAgIHZhciBzdHlsZUhvdmVyID0gX3Byb3BzLnN0eWxlSG92ZXI7XG4gICAgICB2YXIgcHJvcHMgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhfcHJvcHMsIFsnY2hpbGRyZW4nLCAnY2xhc3NOYW1lJywgJ19yZWYnLCAnc3R5bGVBY3RpdmUnLCAnc3R5bGVIb3ZlciddKTtcblxuXG4gICAgICB2YXIgaW5saW5lU3R5bGUgPSBudWxsO1xuICAgICAgaWYgKE9iamVjdC5rZXlzKHN0eWxlSG92ZXIpLmxlbmd0aCkge1xuICAgICAgICBpbmxpbmVTdHlsZSA9IFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgJ3N0eWxlJyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBfX3NvdXJjZToge1xuICAgICAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lJDMsXG4gICAgICAgICAgICAgIGxpbmVOdW1iZXI6IDExXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX19zZWxmOiB0aGlzXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnLicgKyBjbGFzc05hbWUgKyAnOmhvdmVyIHsnICsgdG9DU1Moc3R5bGVIb3ZlcikgKyAnfSdcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKF9yZWYpIHtcbiAgICAgICAgcHJvcHMucmVmID0gX3JlZjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdhJyxcbiAgICAgICAgX2V4dGVuZHMoe30sIHByb3BzLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lLCB0YXJnZXQ6ICdfYmxhbmsnLCBfX3NvdXJjZToge1xuICAgICAgICAgICAgZmlsZU5hbWU6IF9qc3hGaWxlTmFtZSQzLFxuICAgICAgICAgICAgbGluZU51bWJlcjogMTlcbiAgICAgICAgICB9LFxuICAgICAgICAgIF9fc2VsZjogdGhpc1xuICAgICAgICB9KSxcbiAgICAgICAgaW5saW5lU3R5bGUsXG4gICAgICAgIGNoaWxkcmVuXG4gICAgICApO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gR29Ubztcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuR29Uby5wcm9wVHlwZXMgPSB7XG4gIGhyZWY6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgX3JlZjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIHN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICBzdHlsZUFjdGl2ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgc3R5bGVIb3ZlcjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxufTtcblxudmFyIF9qc3hGaWxlTmFtZSQ0ID0gJy9Vc2Vycy9jcmF2ZXJvZC91c2VwYWdlcy9wYW5lbHMvYmxvY2tzL29uLWNsaWNrLmpzJztcbnZhciBPbkNsaWNrID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgaW5oZXJpdHMoT25DbGljaywgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gT25DbGljaygpIHtcbiAgICB2YXIgX3JlZjI7XG5cbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBPbkNsaWNrKTtcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHZhciBfdGhpcyA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKF9yZWYyID0gT25DbGljay5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE9uQ2xpY2spKS5jYWxsLmFwcGx5KF9yZWYyLCBbdGhpc10uY29uY2F0KGFyZ3MpKSk7XG5cbiAgICBfdGhpcy5zdGF0ZSA9IHt9O1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIGNyZWF0ZUNsYXNzKE9uQ2xpY2ssIFt7XG4gICAga2V5OiAnY29tcG9uZW50V2lsbE1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgdmFyIHByb3BzID0gdGhpcy5wcm9wcztcblxuXG4gICAgICB2YXIgbWFudWFsQWN0aXZlID0gdHlwZW9mIHByb3BzLmlzQWN0aXZlID09PSAnYm9vbGVhbic7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaXNBY3RpdmU6IG1hbnVhbEFjdGl2ZSA/IHByb3BzLmlzQWN0aXZlIDogZmFsc2UsXG4gICAgICAgIG1hbnVhbEFjdGl2ZTogbWFudWFsQWN0aXZlXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5iaW5kT25DbGljayhwcm9wcy5vbkNsaWNrKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgIHRoaXMuYmluZE9uQ2xpY2sobmV4dFByb3BzLm9uQ2xpY2spO1xuXG4gICAgICB2YXIgbWFudWFsQWN0aXZlID0gdHlwZW9mIG5leHRQcm9wcy5pc0FjdGl2ZSA9PT0gJ2Jvb2xlYW4nO1xuXG4gICAgICBpZiAobWFudWFsQWN0aXZlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGlzQWN0aXZlOiBuZXh0UHJvcHMuaXNBY3RpdmUsXG4gICAgICAgICAgbWFudWFsQWN0aXZlOiBtYW51YWxBY3RpdmVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50V2lsbFVubW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIGlmICh0aGlzLm9uQ2xpY2tUaW1lb3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm9uQ2xpY2tUaW1lb3V0KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdiaW5kT25DbGljaycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJpbmRPbkNsaWNrKG9uQ2xpY2spIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gICAgICB2YXIgZmluYWxPbkNsaWNrID0gdHlwZW9mIG9uQ2xpY2sgPT09ICdmdW5jdGlvbicgPyBvbkNsaWNrIDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY29uc29sZS5sb2cob25DbGljayk7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLm9uQ2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZmluYWxPbkNsaWNrKGV2ZW50KTtcblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAoIV90aGlzMi5zdGF0ZS5tYW51YWxBY3RpdmUpIHtcbiAgICAgICAgICBfdGhpczIuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXNBY3RpdmU6IHRydWVcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIF90aGlzMi5vbkNsaWNrVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMyLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgaXNBY3RpdmU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF90aGlzMi5vbkNsaWNrVGltZW91dCA9IG51bGw7XG4gICAgICAgICAgfSwgX3RoaXMyLnByb3BzLnN0eWxlQWN0aXZlVGltZW91dCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIGlzQWN0aXZlID0gdGhpcy5zdGF0ZS5pc0FjdGl2ZTtcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNoaWxkcmVuID0gX3Byb3BzLmNoaWxkcmVuO1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IF9wcm9wcy5jbGFzc05hbWU7XG4gICAgICB2YXIgX2lzQWN0aXZlID0gX3Byb3BzLmlzQWN0aXZlO1xuICAgICAgdmFyIF9yZWYgPSBfcHJvcHMuX3JlZjtcbiAgICAgIHZhciBzdHlsZSA9IF9wcm9wcy5zdHlsZTtcbiAgICAgIHZhciBzdHlsZUFjdGl2ZSA9IF9wcm9wcy5zdHlsZUFjdGl2ZTtcbiAgICAgIHZhciBzdHlsZUFjdGl2ZVRpbWVvdXQgPSBfcHJvcHMuc3R5bGVBY3RpdmVUaW1lb3V0O1xuICAgICAgdmFyIHN0eWxlSG92ZXIgPSBfcHJvcHMuc3R5bGVIb3ZlcjtcbiAgICAgIHZhciByZXN0ID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3Byb3BzLCBbJ2NoaWxkcmVuJywgJ2NsYXNzTmFtZScsICdpc0FjdGl2ZScsICdfcmVmJywgJ3N0eWxlJywgJ3N0eWxlQWN0aXZlJywgJ3N0eWxlQWN0aXZlVGltZW91dCcsICdzdHlsZUhvdmVyJ10pO1xuXG5cbiAgICAgIHZhciBpbmxpbmVTdHlsZSA9IG51bGw7XG4gICAgICBpZiAoIWlzQWN0aXZlICYmIE9iamVjdC5rZXlzKHN0eWxlSG92ZXIpLmxlbmd0aCkge1xuICAgICAgICBpbmxpbmVTdHlsZSA9IFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgJ3N0eWxlJyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBfX3NvdXJjZToge1xuICAgICAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lJDQsXG4gICAgICAgICAgICAgIGxpbmVOdW1iZXI6IDc2XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX19zZWxmOiB0aGlzXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnLicgKyBjbGFzc05hbWUgKyAnOmhvdmVyIHsnICsgdG9DU1Moc3R5bGVIb3ZlcikgKyAnfSdcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGZpbmFsU3R5bGUgPSBpc0FjdGl2ZSA/IF9leHRlbmRzKHt9LCBzdHlsZSwgc3R5bGVBY3RpdmUsIHtcbiAgICAgICAgb3V0bGluZTogMFxuICAgICAgfSkgOiBfZXh0ZW5kcyh7fSwgc3R5bGUsIHtcbiAgICAgICAgb3V0bGluZTogMCxcbiAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoX3JlZikge1xuICAgICAgICByZXN0LnJlZiA9IF9yZWY7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnYnV0dG9uJyxcbiAgICAgICAgX2V4dGVuZHMoe30sIHJlc3QsIHtcbiAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgICAgICBkaXNhYmxlZDogaXNBY3RpdmUsXG4gICAgICAgICAgb25DbGljazogdGhpcy5vbkNsaWNrLFxuICAgICAgICAgIHN0eWxlOiBmaW5hbFN0eWxlLFxuICAgICAgICAgIF9fc291cmNlOiB7XG4gICAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lJDQsXG4gICAgICAgICAgICBsaW5lTnVtYmVyOiA5NFxuICAgICAgICAgIH0sXG4gICAgICAgICAgX19zZWxmOiB0aGlzXG4gICAgICAgIH0pLFxuICAgICAgICBpbmxpbmVTdHlsZSxcbiAgICAgICAgY2hpbGRyZW5cbiAgICAgICk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBPbkNsaWNrO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5PbkNsaWNrLmRlZmF1bHRQcm9wcyA9IHtcbiAgc3R5bGVBY3RpdmVUaW1lb3V0OiAxMDAwXG59O1xuT25DbGljay5wcm9wVHlwZXMgPSB7XG4gIGlzQWN0aXZlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbUmVhY3QuUHJvcFR5cGVzLmZ1bmMsIFJlYWN0LlByb3BUeXBlcy5zdHJpbmddKSxcbiAgX3JlZjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gIHN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICBzdHlsZUFjdGl2ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgc3R5bGVBY3RpdmVUaW1lb3V0OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIHN0eWxlSG92ZXI6IFJlYWN0LlByb3BUeXBlcy5vYmplY3Rcbn07XG5cbnZhciBfanN4RmlsZU5hbWUkMSA9ICcvVXNlcnMvY3JhdmVyb2QvdXNlcGFnZXMvcGFuZWxzL2Jsb2Nrcy9jcmVhdGUtZ3JvdXAuanMnO1xuZnVuY3Rpb24gY3JlYXRlR3JvdXAobmFtZSwgZ3JvdXBTdHlsZSkge1xuICB2YXIgR3JvdXAgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAgIGluaGVyaXRzKEdyb3VwLCBfQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIEdyb3VwKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBHcm91cCk7XG5cbiAgICAgIHZhciBfdGhpcyA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKEdyb3VwLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoR3JvdXApKS5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICAgIF90aGlzLmNsYXNzTmFtZSA9IG5hbWUgKyAnLScgKyB1bmlxdWVJZCgpO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIGNyZWF0ZUNsYXNzKEdyb3VwLCBbe1xuICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgICB2YXIgY2hpbGRyZW4gPSBfcHJvcHMuY2hpbGRyZW47XG4gICAgICAgIHZhciBtb3JlQ2xhc3NOYW1lID0gX3Byb3BzLmNsYXNzTmFtZTtcbiAgICAgICAgdmFyIGdvVG8gPSBfcHJvcHMuZ29UbztcbiAgICAgICAgdmFyIHN0eWxlID0gX3Byb3BzLnN0eWxlO1xuICAgICAgICB2YXIgdGVsZXBvcnRUbyA9IF9wcm9wcy50ZWxlcG9ydFRvO1xuICAgICAgICB2YXIgcHJvcHMgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhfcHJvcHMsIFsnY2hpbGRyZW4nLCAnY2xhc3NOYW1lJywgJ2dvVG8nLCAnc3R5bGUnLCAndGVsZXBvcnRUbyddKTtcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9IHRoaXMuY2xhc3NOYW1lO1xuICAgICAgICB2YXIgcGFnZXMgPSB0aGlzLmNvbnRleHQucGFnZXM7XG5cblxuICAgICAgICB2YXIgZmluYWxTdHlsZSA9IF9leHRlbmRzKHt9LCBncm91cFN0eWxlLCBzdHlsZSk7XG5cbiAgICAgICAgdmFyIEJhc2UgPSB2b2lkIDA7XG4gICAgICAgIGlmICh0ZWxlcG9ydFRvKSB7XG4gICAgICAgICAgQmFzZSA9IFRlbGVwb3J0O1xuICAgICAgICAgIHByb3BzLnRvID0gdGVsZXBvcnRUbztcbiAgICAgICAgfSBlbHNlIGlmIChnb1RvKSB7XG4gICAgICAgICAgQmFzZSA9IEdvVG87XG4gICAgICAgICAgcHJvcHMuaHJlZiA9IGdvVG87XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcHMub25DbGljaykge1xuICAgICAgICAgIEJhc2UgPSBPbkNsaWNrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBfcmVmID0gcHJvcHMuX3JlZjtcbiAgICAgICAgICB2YXIgc3R5bGVBY3RpdmUgPSBwcm9wcy5zdHlsZUFjdGl2ZTtcbiAgICAgICAgICB2YXIgc3R5bGVIb3ZlciA9IHByb3BzLnN0eWxlSG92ZXI7XG4gICAgICAgICAgdmFyIHJlc3QgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhwcm9wcywgWydfcmVmJywgJ3N0eWxlQWN0aXZlJywgJ3N0eWxlSG92ZXInXSk7XG5cblxuICAgICAgICAgIHZhciBpbmxpbmVTdHlsZSA9IG51bGw7XG4gICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHN0eWxlSG92ZXIpLmxlbmd0aCkge1xuICAgICAgICAgICAgaW5saW5lU3R5bGUgPSBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAnc3R5bGUnLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgX19zb3VyY2U6IHtcbiAgICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBfanN4RmlsZU5hbWUkMSxcbiAgICAgICAgICAgICAgICAgIGxpbmVOdW1iZXI6IDQwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBfX3NlbGY6IHRoaXNcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgJy4nICsgY2xhc3NOYW1lICsgJzpob3ZlciB7JyArIHRvQ1NTKHN0eWxlSG92ZXIpICsgJ30nXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICBfZXh0ZW5kcyh7fSwgcmVzdCwge1xuICAgICAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSArICcgJyArIG1vcmVDbGFzc05hbWUsXG4gICAgICAgICAgICAgIHJlZjogX3JlZixcbiAgICAgICAgICAgICAgc3R5bGU6IGZpbmFsU3R5bGUsXG4gICAgICAgICAgICAgIF9fc291cmNlOiB7XG4gICAgICAgICAgICAgICAgZmlsZU5hbWU6IF9qc3hGaWxlTmFtZSQxLFxuICAgICAgICAgICAgICAgIGxpbmVOdW1iZXI6IDQ0XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF9fc2VsZjogdGhpc1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBpbmxpbmVTdHlsZSxcbiAgICAgICAgICAgIGNoaWxkcmVuXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYWdlcyAmJiBwYWdlcy5pc1NlbGVjdGluZykge1xuICAgICAgICAgIHByb3BzLm9uQ2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgIEJhc2UsXG4gICAgICAgICAgX2V4dGVuZHMoe30sIHByb3BzLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgICAgICAgIHN0eWxlOiBmaW5hbFN0eWxlLFxuICAgICAgICAgICAgX19zb3VyY2U6IHtcbiAgICAgICAgICAgICAgZmlsZU5hbWU6IF9qc3hGaWxlTmFtZSQxLFxuICAgICAgICAgICAgICBsaW5lTnVtYmVyOiA2NlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9fc2VsZjogdGhpc1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIGNoaWxkcmVuXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfV0pO1xuICAgIHJldHVybiBHcm91cDtcbiAgfShSZWFjdC5Db21wb25lbnQpO1xuXG4gIEdyb3VwLmNvbnRleHRUeXBlcyA9IHtcbiAgICBwYWdlczogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGlzU2VsZWN0aW5nOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbFxuICAgIH0pXG4gIH07XG5cbiAgR3JvdXAuZGVmYXVsdFByb3BzID0ge1xuICAgIGNsYXNzTmFtZTogJycsXG4gICAgc3R5bGU6IHt9LFxuICAgIHN0eWxlQWN0aXZlOiB7fSxcbiAgICBzdHlsZUhvdmVyOiB7fVxuICB9O1xuXG4gIEdyb3VwLmRpc3BsYXlOYW1lID0gbmFtZTtcblxuICBHcm91cC5wcm9wVHlwZXMgPSB7XG4gICAgYmxvY2tzOiBSZWFjdC5Qcm9wVHlwZXMuYW55LFxuICAgIGdvVG86IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbUmVhY3QuUHJvcFR5cGVzLmJvb2wsIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsIFJlYWN0LlByb3BUeXBlcy5mdW5jXSksXG4gICAgX3JlZjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgc3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgc3R5bGVBY3RpdmU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgc3R5bGVIb3ZlcjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB0ZWxlcG9ydFRvOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gIH07XG5cbiAgcmV0dXJuIEdyb3VwO1xufVxuXG52YXIgSG9yaXpvbnRhbCA9IGNyZWF0ZUdyb3VwKCdIb3Jpem9udGFsJywgeyBmbGV4RGlyZWN0aW9uOiAncm93JyB9KTtcblxudmFyIFZlcnRpY2FsID0gY3JlYXRlR3JvdXAoJ1ZlcnRpY2FsJywgeyBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyB9KTtcblxudmFyIF9qc3hGaWxlTmFtZSA9ICcvVXNlcnMvY3JhdmVyb2QvdXNlcGFnZXMvcGFuZWxzL3BsYXlncm91bmQvbm90ZXMuZGV2L3NyYy5qcy50bXAnO1xudmFyIF90aGlzID0gdW5kZWZpbmVkO1xudmFyIE5vdGVzID0gZnVuY3Rpb24gTm90ZXMoX3JlZikge1xuICB2YXIgd2lkdGggPSBfcmVmLndpZHRoO1xuICByZXR1cm4gUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICBWZXJ0aWNhbCxcbiAgICB7IHN0eWxlOiB7IGJhY2tncm91bmRDb2xvcjogJyMwMGZmMDAnLCBmb250RmFtaWx5OiAnc2Fucy1zZXJpZicsIGZvbnRTaXplOiAxMjUsIHBhZGRpbmc6IDIwLCB3aWR0aDogd2lkdGggfSwgX19zb3VyY2U6IHtcbiAgICAgICAgZmlsZU5hbWU6IF9qc3hGaWxlTmFtZSxcbiAgICAgICAgbGluZU51bWJlcjogNlxuICAgICAgfSxcbiAgICAgIF9fc2VsZjogX3RoaXNcbiAgICB9LFxuICAgICdOb3RlcycsXG4gICAgUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgIEhvcml6b250YWwsXG4gICAgICB7IHN0eWxlOiBzdHlsZUFjdGlvbiwgdGVsZXBvcnRUbzogJy4uL2NvbnRlbnQtMS9ub3RlLTEnLCBfX3NvdXJjZToge1xuICAgICAgICAgIGZpbGVOYW1lOiBfanN4RmlsZU5hbWUsXG4gICAgICAgICAgbGluZU51bWJlcjogOVxuICAgICAgICB9LFxuICAgICAgICBfX3NlbGY6IF90aGlzXG4gICAgICB9LFxuICAgICAgJ05vdGUgMSBpbiBDb250ZW50IDEnXG4gICAgKSxcbiAgICBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgSG9yaXpvbnRhbCxcbiAgICAgIHsgc3R5bGU6IHN0eWxlQWN0aW9uLCB0ZWxlcG9ydFRvOiAnLi4vY29udGVudC0xL25vdGUtMicsIF9fc291cmNlOiB7XG4gICAgICAgICAgZmlsZU5hbWU6IF9qc3hGaWxlTmFtZSxcbiAgICAgICAgICBsaW5lTnVtYmVyOiAxMFxuICAgICAgICB9LFxuICAgICAgICBfX3NlbGY6IF90aGlzXG4gICAgICB9LFxuICAgICAgJ05vdGUgMiBpbiBDb250ZW50IDEnXG4gICAgKSxcbiAgICBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgSG9yaXpvbnRhbCxcbiAgICAgIHsgc3R5bGU6IHN0eWxlQWN0aW9uLCB0ZWxlcG9ydFRvOiAnLi4vY29udGVudC0yL25vdGUtMycsIF9fc291cmNlOiB7XG4gICAgICAgICAgZmlsZU5hbWU6IF9qc3hGaWxlTmFtZSxcbiAgICAgICAgICBsaW5lTnVtYmVyOiAxMVxuICAgICAgICB9LFxuICAgICAgICBfX3NlbGY6IF90aGlzXG4gICAgICB9LFxuICAgICAgJ05vdGUgMyBpbiBDb250ZW50IDInXG4gICAgKSxcbiAgICBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgSG9yaXpvbnRhbCxcbiAgICAgIHsgc3R5bGU6IHN0eWxlQWN0aW9uLCB0ZWxlcG9ydFRvOiAnLi4vY29udGVudC0yL25vdGUtNCcsIF9fc291cmNlOiB7XG4gICAgICAgICAgZmlsZU5hbWU6IF9qc3hGaWxlTmFtZSxcbiAgICAgICAgICBsaW5lTnVtYmVyOiAxMlxuICAgICAgICB9LFxuICAgICAgICBfX3NlbGY6IF90aGlzXG4gICAgICB9LFxuICAgICAgJ05vdGUgNCBpbiBDb250ZW50IDInXG4gICAgKSxcbiAgICBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgSG9yaXpvbnRhbCxcbiAgICAgIHsgc3R5bGU6IHN0eWxlQWN0aW9uLCB0ZWxlcG9ydFRvOiAnLi4vY29udGVudC0yL25vdGUtNScsIF9fc291cmNlOiB7XG4gICAgICAgICAgZmlsZU5hbWU6IF9qc3hGaWxlTmFtZSxcbiAgICAgICAgICBsaW5lTnVtYmVyOiAxM1xuICAgICAgICB9LFxuICAgICAgICBfX3NlbGY6IF90aGlzXG4gICAgICB9LFxuICAgICAgJ05vdGUgNSBpbiBDb250ZW50IDInXG4gICAgKVxuICApO1xufTtcblxudmFyIE5vdGUgPSBmdW5jdGlvbiBOb3RlKF9yZWYyKSB7XG4gIHZhciBub3RlID0gX3JlZjIubm90ZTtcbiAgdmFyIHdpZHRoID0gX3JlZjIud2lkdGg7XG4gIHJldHVybiBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgIFZlcnRpY2FsLFxuICAgIHsgc3R5bGU6IHsgYmFja2dyb3VuZENvbG9yOiAnIzAwZmYwMCcsIGZvbnRGYW1pbHk6ICdzYW5zLXNlcmlmJywgZm9udFNpemU6IDEyNSwgcGFkZGluZzogMjAsIHdpZHRoOiB3aWR0aCB9LCBfX3NvdXJjZToge1xuICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lLFxuICAgICAgICBsaW5lTnVtYmVyOiAxOFxuICAgICAgfSxcbiAgICAgIF9fc2VsZjogX3RoaXNcbiAgICB9LFxuICAgIG5vdGVcbiAgKTtcbn07XG5cbnZhciB0eXBlcyA9IHtcbiAgTm90ZTogTm90ZSxcbiAgTm90ZXM6IE5vdGVzXG59O1xuXG52YXIgcGFuZWxzID0ge1xuICAnLyc6IHtcbiAgICBkb2NrTGVmdDogZmFsc2UsXG4gICAgdHlwZTogJ05vdGVzJyxcbiAgICB3aWR0aDogMzYwXG4gIH0sXG4gICcvOm5vdGUnOiB7XG4gICAgZG9ja0xlZnQ6IGZhbHNlLFxuICAgIHR5cGU6ICdOb3RlJyxcbiAgICB3aWR0aDogMzYwXG4gIH1cbn07XG5cbnZhciBsb29rdXAgPSBbJy86bm90ZSddO1xuXG52YXIgc3R5bGVBY3Rpb24gPSB7XG4gIGJhY2tncm91bmRDb2xvcjogJyNmMGYwZjAnLFxuICBib3JkZXJSYWRpdXM6IDUsXG4gIGNvbG9yOiAnIzAwMDAwMCcsXG4gIGN1cnNvcjogJ3BvaW50ZXInLFxuICBmb250RmFtaWx5OiAnc2Fucy1zZXJpZicsXG4gIGZvbnRTaXplOiAyMCxcbiAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICBtYXJnaW46IDIuNSxcbiAgcGFkZGluZzogJzEwcHggMjBweCcsXG4gIHRleHREZWNvcmF0aW9uOiAnbm9uZScsXG4gIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnXG59O1xuXG5leHBvcnRzLnR5cGVzID0gdHlwZXM7XG5leHBvcnRzLnBhbmVscyA9IHBhbmVscztcbmV4cG9ydHMubG9va3VwID0gbG9va3VwOyJdfQ==
