require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopDefault (ex) { return 'default' in ex ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var uniqueId = _interopDefault(require('mini-unique-id'));
var Waiting = _interopDefault(require('waiting'));
var toCSS = _interopDefault(require('style-to-css'));
var panelsUi = require('panels-ui');

var babelHelpers = {};
babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
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

babelHelpers.extends = Object.assign || function (target) {
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

babelHelpers.inherits = function (subClass, superClass) {
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

babelHelpers.objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

var Code = function (_Component) {
  babelHelpers.inherits(Code, _Component);

  function Code(props) {
    babelHelpers.classCallCheck(this, Code);

    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Code).call(this, props));

    var id = 'code-' + uniqueId();
    _this.id = id;
    _this.setHeight = _this.setHeight.bind(_this);
    _this.state = {
      height: 16
    };
    _this.style = React__default.createElement(
      'style',
      null,
      '\n        #' + id + ' span {\n          display: inline;\n        }\n        #' + id + ' div {\n          display: block;\n        }\n        #' + id + ' .ace_gutter-cell span {\n          display: inline-block;\n        }'
    );
    return _this;
  }

  babelHelpers.createClass(Code, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var props = this.props;

      var editor = ace.edit(this.id);
      this.editor = editor;

      var session = editor.getSession();

      session.setMode('ace/mode/' + props.mode);
      session.setTabSize(2);
      session.setUseSoftTabs(true);
      session.setUseWrapMode(true);

      editor.$blockScrolling = Infinity;
      editor.setDisplayIndentGuides(false);
      editor.setFontSize(12);
      editor.setHighlightActiveLine(props.highlightActiveLine);
      editor.setTheme('ace/theme/' + props.theme);
      editor.setOption('readOnly', props.readOnly);
      editor.setOption('wrap', props.wrap);
      editor.renderer.setShowGutter(props.gutter);

      session.on('change', this.setHeight);

      if (props.src) {
        fetch(props.src).then(function (res) {
          return res.text();
        }).then(function (code) {
          return _this2.editor.setValue(code, -1);
        });
      } else if (props.code) {
        editor.setValue(props.code, -1);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var editor = this.editor;
      var props = this.props;

      var session = editor.getSession();

      if (prevProps.mode !== props.mode) {
        session.setMode('ace/mode/' + props.mode);
      }
      if (prevProps.code !== props.code) {
        editor.setValue(props.code, -1);
      }
      if (prevProps.gutter !== props.gutter) {
        editor.renderer.setShowGutter(props.gutter);
      }
      if (prevProps.highlightActiveLine !== props.highlightActiveLine) {
        editor.setHighlightActiveLine(props.highlightActiveLine);
      }

      if (prevProps.readyOnly !== props.readOnly) {
        editor.setOption('readOnly', props.readOnly);
      }
      if (prevProps.src !== props.src) {
        fetch(props.src).then(function (res) {
          return res.text();
        }).then(function (code) {
          return editor.setValue(code, -1);
        });
      }
      if (prevProps.theme !== props.theme) {
        editor.setTheme('ace/theme/' + props.theme);
      }
      if (prevProps.wrap !== props.wrap) {
        editor.setOption('wrap', props.wrap);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.editor.getSession().off('change', this.setHeight);
    }
  }, {
    key: 'setHeight',
    value: function setHeight() {
      var editor = this.editor;

      var session = editor.getSession();

      editor.setOption('minLines', session.getLength());
      editor.setOption('maxLines', session.getLength());

      this.setState({
        height: editor.renderer.scrollBarV.inner.style.height // editor.renderer.layerConfig.minHeight
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var id = this.id;
      var props = this.props;
      var state = this.state;


      return React__default.createElement(
        'div',
        { id: props.id, 'data-block': props['data-block'] },
        this.style,
        React__default.createElement('div', { id: id, ref: 'code', style: babelHelpers.extends({}, props.style, { height: state.height }) })
      );
    }
  }]);
  return Code;
}(React.Component);

Code.defaultProps = {
  gutter: true,
  highlightActiveLine: true,
  mode: 'json',
  style: {
    width: '100%'
  },
  theme: 'idle_fingers',
  wrap: 40
};

var OverCover = function OverCover(props) {
  var overCoverStyle = babelHelpers.extends({}, style.overCover, {
    height: props.height,
    left: 'calc(50% - ' + props.width / 2 + 'px)',
    top: 'calc(50% - ' + props.height / 2 + 'px)',
    width: props.width
  });

  return React__default.createElement('img', { src: props.src, style: props.style });
};

var Embed = function (_Component) {
  babelHelpers.inherits(Embed, _Component);

  function Embed(props) {
    babelHelpers.classCallCheck(this, Embed);

    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Embed).call(this, props));

    _this.state = {
      error: !!props.src === false,
      isLoading: !!props.src,
      isReady: false
    };
    return _this;
  }

  babelHelpers.createClass(Embed, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getEmbed(this.props.src);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.src !== nextProps.src) {
        this.getEmbed(nextProps.src);
      }
    }
  }, {
    key: 'getEmbed',
    value: function getEmbed(src) {
      var _this2 = this;

      fetch(src).then(function (res) {
        return res.json();
      }).then(function (data) {
        _this2.setState({
          data: data,
          isLoading: false,
          isReady: true,
          showCover: !!data.thumbnail_url
        });
      }).catch(function (err) {
        _this2.setState({
          error: true,
          message: err
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state;
      var data = _state.data;
      var error = _state.error;
      var isLoading = _state.isLoading;
      var isReady = _state.isReady;
      var showCover = _state.showCover;
      var _props = this.props;
      var height = _props.height;
      var overCover = _props.overCover;
      var _props$_pages = _props._pages;

      var _pages = _props$_pages === undefined ? {} : _props$_pages;

      var width = _props.width;

      var embedStyle = babelHelpers.extends({
        height: height,
        width: width
      }, this.props.style);
      var ret = void 0;

      if (isLoading) {
        ret = React__default.createElement(Waiting, null);
      } else if (isReady) {
        if (showCover) {
          ret = React__default.createElement(
            'div',
            { onClick: function onClick() {
                return _this3.setState({ showCover: false });
              }, style: style.cover },
            overCover && React__default.createElement(OverCover, overCover),
            React__default.createElement('img', { src: data.thumbnail_url, style: style.coverImage })
          );
        } else {
          ret = React__default.createElement('div', { dangerouslySetInnerHTML: { __html: data.html } });
        }
      } else if (error) {
        ret = React__default.createElement(
          'div',
          null,
          typeof message === 'undefined' ? 'Do you src in your props?' : message
        );
      }

      return React__default.createElement(
        'div',
        babelHelpers.extends({ style: embedStyle }, _pages),
        ret
      );
    }
  }]);
  return Embed;
}(React.Component);

Embed.defaultProps = {
  overCover: false
};

var style = {
  cover: {
    cursor: 'pointer',
    position: 'relative'
  },
  overCover: {
    position: 'absolute',
    zIndex: 1
  }
};

var blockShape = React.PropTypes.shape({
  block: React.PropTypes.string.isRequired,
  props: React.PropTypes.object,
  when: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.string])
});

var GoTo = function GoTo(props) {
  var styleHover = props.styleHover;
  var rest = babelHelpers.objectWithoutProperties(props, ['styleHover']);

  var className = 'GoTo-' + uniqueId();

  var inlineStyle = props.styleHover ? '.' + className + ':hover {' + toCSS(styleHover) + '}' : '';

  return React__default.createElement(
    'a',
    babelHelpers.extends({}, rest, { className: className, target: '_blank' }),
    props.children,
    React__default.createElement(
      'style',
      null,
      inlineStyle
    )
  );
};

var OnClick = function (_Component) {
  babelHelpers.inherits(OnClick, _Component);

  function OnClick(props) {
    babelHelpers.classCallCheck(this, OnClick);

    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(OnClick).call(this, props));

    _this.className = 'OnClick-' + uniqueId();
    _this.state = {
      active: false
    };
    return _this;
  }

  babelHelpers.createClass(OnClick, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.bindOnClick(this.props.onClick, this.props._inPages);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      this.bindOnClick(nextProps.onClick, nextProps._inPages);
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
    value: function bindOnClick(onClick, _inPages) {
      var _this2 = this;

      var finalOnClick = typeof onClick === 'function' ? onClick : function () {
        return console.log(onClick);
      };

      this.onClick = function (event) {
        finalOnClick(event);

        if (!_inPages) {
          event.stopPropagation();

          _this2.setState({
            active: true
          });

          _this2.onClickTimeout = setTimeout(function () {
            _this2.setState({
              active: false
            });
            _this2.onClickTimeout = null;
          }, _this2.props.styleActiveTimeout);
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var active = this.state.active;
      var _props = this.props;
      var children = _props.children;
      var style = _props.style;
      var styleActive = _props.styleActive;
      var styleHover = _props.styleHover;
      var rest = babelHelpers.objectWithoutProperties(_props, ['children', 'style', 'styleActive', 'styleHover']);
      var className = this.className;


      var inlineStyle = !active && styleHover ? '.' + className + ':hover {' + toCSS(styleHover) + '}' : '';

      var finalStyle = active ? babelHelpers.extends({}, style, styleActive, {
        outline: 0
      }) : babelHelpers.extends({}, style, {
        outline: 0,
        cursor: 'pointer'
      });

      return React__default.createElement(
        'button',
        babelHelpers.extends({}, rest, {
          className: className,
          disabled: active,
          onClick: this.onClick,
          style: finalStyle
        }),
        React__default.createElement(
          'style',
          null,
          inlineStyle
        ),
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
  children: React.PropTypes.array,
  _inPages: React.PropTypes.bool,
  onClick: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.string]),
  style: React.PropTypes.object,
  styleActive: React.PropTypes.object,
  styleActiveTimeout: React.PropTypes.number.isRequired,
  styleHover: React.PropTypes.object
};

function createGroup(name, groupStyle) {
  var Group = function (_Component) {
    babelHelpers.inherits(Group, _Component);

    function Group() {
      babelHelpers.classCallCheck(this, Group);
      return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Group).apply(this, arguments));
    }

    babelHelpers.createClass(Group, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props;
        var children = _props.children;
        var goTo = _props.goTo;
        var onClick = _props.onClick;
        var style = _props.style;
        var teleportTo = _props.teleportTo;
        var rest = babelHelpers.objectWithoutProperties(_props, ['children', 'goTo', 'onClick', 'style', 'teleportTo']);
        var _pagesIsSelecting = this.context._pagesIsSelecting;

        var baseProps = {};
        if (_pagesIsSelecting) {
          baseProps._pagesIsSelecting = true;
          baseProps.onClick = function (event) {
            if (event) {
              event.preventDefault();
            }
            return true;
          };
        }

        var Base = void 0;
        if (teleportTo) {
          Base = panelsUi.Teleport;
          baseProps.to = teleportTo;
        } else if (goTo) {
          Base = GoTo;
          baseProps.href = goTo;
          baseProps.target = '_blank';
        } else if (onClick) {
          Base = OnClick;
          if (!baseProps.onClick) {
            baseProps.onClick = onClick;
          }
        } else {
          baseProps.ref = function ($e) {
            _this2.$e = $e;
          };
          Base = 'div';
        }

        var finalStyle = babelHelpers.extends({
          flexWrap: 'wrap'
        }, groupStyle, style);

        return React__default.createElement(
          Base,
          babelHelpers.extends({ style: finalStyle }, rest, baseProps),
          children
        );
      }
    }]);
    return Group;
  }(React.Component);

  Group.contextTypes = {
    _pagesIsSelecting: React.PropTypes.bool
  };

  Group.defaultProps = {
    blocks: [],
    style: {},
    styleActive: {},
    styleHover: {}
  };

  Group.displayName = name;

  Group.propTypes = {
    blocks: React.PropTypes.arrayOf(blockShape).isRequired,
    children: React.PropTypes.any,
    goTo: React.PropTypes.string,
    onClick: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.func]),
    style: React.PropTypes.object,
    styleActive: React.PropTypes.object,
    styleHover: React.PropTypes.object,
    teleportTo: React.PropTypes.string
  };

  return Group;
}

var _Horizontal = createGroup('Horizontal', { flexDirection: 'row' });

var Knocking = function Knocking(_ref) {
  var _ref$_pages = _ref._pages;

  var _pages = _ref$_pages === undefined ? {} : _ref$_pages;

  var _ref$style = _ref.style;
  var style = _ref$style === undefined ? {} : _ref$style;
  var size = _ref.size;
  return React__default.createElement(
    'div',
    babelHelpers.extends({ style: style }, _pages),
    React__default.createElement(Waiting, { color: style.color, size: size })
  );
};

Knocking.defaultProps = {
  style: {
    color: '#323232'
  },
  size: 20
};

Knocking.description = 'A handy loading indicator ;)';

Knocking.propTypes = {
  style: React.PropTypes.object,
  size: React.PropTypes.number.isRequired
};

var Image = function (_Component) {
  babelHelpers.inherits(Image, _Component);

  function Image(props) {
    babelHelpers.classCallCheck(this, Image);

    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Image).call(this, props));

    _this.onLoad = _this.onLoad.bind(_this);
    _this.state = {
      isLoading: true
    };
    return _this;
  }

  babelHelpers.createClass(Image, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.src !== nextProps.src) {
        this.setState({
          isLoading: true
        });
      }
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.setState({
        isLoading: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var isLoading = this.state.isLoading;
      var _props = this.props;
      var text = _props.text;
      var src = _props.src;
      var style = _props.style;
      var styleLoading = _props.styleLoading;
      var styleWrapper = _props.styleWrapper;


      return React__default.createElement(
        'div',
        { style: styleWrapper, 'data-block': this.props['data-block'] },
        isLoading && React__default.createElement(Knocking, { style: styleLoading }),
        React__default.createElement('img', {
          alt: text,
          onLoad: this.onLoad,
          src: src,
          style: style,
          title: text
        })
      );
    }
  }]);
  return Image;
}(React.Component);

Image.defaultProps = {
  src: 'https://files.usepages.today/usepages.today/image-placeholder.svg',
  style: {},
  styleLoading: {
    position: 'absolute'
  },
  styleWrapper: {},
  text: 'Alternative text'
};

Image.description = "Add some text for when the image can't be displayed.";

Image.propTypes = {
  'data-block': React.PropTypes.string,
  src: React.PropTypes.string.isRequired,
  style: React.PropTypes.object,
  styleLoading: React.PropTypes.object,
  styleWrapper: React.PropTypes.object,
  text: React.PropTypes.string
};

var Input = function (_Component) {
  babelHelpers.inherits(Input, _Component);

  function Input(props) {
    babelHelpers.classCallCheck(this, Input);

    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Input).call(this, props));

    _this.className = 'Input-' + uniqueId();
    return _this;
  }

  babelHelpers.createClass(Input, [{
    key: 'render',
    value: function render() {
      var className = this.className;
      var _props = this.props;
      var onEnter = _props.onEnter;
      var style = _props.style;
      var styleHover = _props.styleHover;
      var styleWrapper = _props.styleWrapper;
      var rest = babelHelpers.objectWithoutProperties(_props, ['onEnter', 'style', 'styleHover', 'styleWrapper']);


      var backgroundColor = style && style.backgroundColor || 'transparent';
      var color = style && style.color || 'black';
      var inlineStyle = '.' + className + ':-webkit-autofill {\n      background-color: ' + backgroundColor + ' !important;\n      box-shadow: 0 0 0px 1000px ' + backgroundColor + ' inset;\n      color: ' + color + ' !important;\n    }';

      if (styleHover) {
        inlineStyle = inlineStyle + ' .' + className + ':hover {' + toCSS(styleHover) + '}';
      }

      var onKeyUp = void 0;
      if (typeof onEnter !== 'undefined') {
        (function () {
          var finalOnEnter = typeof onEnter === 'function' ? onEnter : function () {
            return console.log(onEnter);
          };
          onKeyUp = function onKeyUp(event) {
            return event.key === 'Enter' && finalOnEnter(event);
          };
        })();
      }

      return React__default.createElement(
        'div',
        { style: styleWrapper },
        React__default.createElement('input', babelHelpers.extends({}, rest, {
          autoComplete: 'off',
          className: className,
          onKeyUp: onKeyUp,
          ref: 'input',
          style: style
        })),
        React__default.createElement(
          'style',
          null,
          inlineStyle
        )
      );
    }
  }]);
  return Input;
}(React.Component);

Input.defaultProps = {
  placeholder: '',
  style: {},
  styleHover: {},
  styleWrapper: {},
  type: 'text'
};

Input.propTypes = {
  placeholder: React.PropTypes.string,
  style: React.PropTypes.object,
  styleHover: React.PropTypes.object,
  styleWrapper: React.PropTypes.object,
  type: React.PropTypes.string.isRequired
};

var List = function List() {
  return null;
};

var Text = function Text(_ref) {
  var dataBlock = _ref['data-block'];
  var _ref$element = _ref.element;
  var Element = _ref$element === undefined ? 'div' : _ref$element;
  var lineBreak = _ref.lineBreak;
  var style = _ref.style;
  var text = _ref.text;

  var styleLine = { marginTop: lineBreak };

  return React__default.createElement(
    Element,
    { 'data-block': dataBlock, style: style },
    ('' + text).split('\n').map(function (t, i) {
      return React__default.createElement(
        'div',
        { key: i, style: i ? styleLine : undefined },
        t
      );
    })
  );
};

Text.defaultProps = {
  lineBreak: 10,
  style: {},
  text: 'Write some text'
};

Text.propTypes = {
  'data-block': React.PropTypes.string,
  element: React.PropTypes.any,
  lineBreak: React.PropTypes.number,
  style: React.PropTypes.object,
  text: React.PropTypes.string.isRequired
};

var Preview = function Preview(_ref) {
  var Block = _ref.block;
  var _ref$_pages = _ref._pages;

  var _pages = _ref$_pages === undefined ? {} : _ref$_pages;

  var _ref$props = _ref.props;
  var props = _ref$props === undefined ? {} : _ref$props;

  if (typeof Block === 'function') {
    return React__default.createElement(Block, props);
  } else {
    return React__default.createElement(
      'div',
      babelHelpers.extends({ style: styles.preview }, _pages),
      React__default.createElement(Text, { style: styles.text, text: 'In an ideal world I\'d be rendering "' + Block + '" with these props:' }),
      React__default.createElement(Code, { code: JSON.stringify(props),
        gutter: false,
        highlightActiveLine: false,
        readOnly: true,
        theme: 'github',
        style: styles.code,
        wrap: 40 }),
      React__default.createElement(Text, { style: styles.text,
        text: 'However we got a ' + (typeof Block === 'undefined' ? 'undefined' : babelHelpers.typeof(Block)) + ' instead of a React element.\nThis is ok if you\'re using the Preview block in Pages to build Pages though :) (inception style :P). ¯\\_(ツ)_/¯' })
    );
  }
};

Preview.propTypes = {
  block: React.PropTypes.any,

  props: React.PropTypes.object
};

var styles = {
  code: {
    height: 100,
    marginTop: 20
  },
  text: {
    marginTop: 20
  },
  preview: {
    fontSize: 12,
    margin: 20
  }
};

var _Unknown = (function (_ref) {
  var dataBlock = _ref['data-block'];
  var props = babelHelpers.objectWithoutProperties(_ref, ['data-block']);

  var code = JSON.stringify(props, { space: '\t' });

  return React__default.createElement(
    'div',
    { 'data-block': dataBlock, style: style$1.wrapper },
    React__default.createElement(
      'div',
      null,
      'Sorry but I don\'t know how to render this block :/'
    ),
    React__default.createElement(Code, { code: code, gutter: false, readOnly: true, highlightActiveLine: false, style: style$1.code })
  );
})

var style$1 = {
  code: {
    marginTop: 10
  },
  wrapper: {
    backgroundColor: '#323232',
    color: 'white',
    fontSize: 12,
    padding: 20
  }
};

var _Vertical = createGroup('Vertical', { flexDirection: 'column' });

var whitelist = ['autopause', 'autoplay', 'byline', 'color', 'height', 'loop', 'maxheight', 'maxwidth', 'portrait', 'title', 'width'];

function asParams(params) {
  return Object.keys(params).map(function (k) {
    return k + '=' + params[k];
  }).join('&');
}

function createSrc(props) {
  var video = props.video;
  var rest = babelHelpers.objectWithoutProperties(props, ['video']);


  var config = {
    autoplay: true,
    byline: false,
    title: false,
    url: 'https%3A//vimeo.com/' + video,
    width: 360
  };

  Object.keys(rest).forEach(function (key) {
    if (whitelist.indexOf(key) > -1) {
      config[key] = rest[key];
    }
  });

  return 'https://vimeo.com/api/oembed.json?' + asParams(config);
}

var _Vimeo = (function (props) {
  return React__default.createElement(Embed, babelHelpers.extends({ src: createSrc(props) }, props));
})

exports.Code = Code;
exports.Embed = Embed;
exports.Horizontal = _Horizontal;
exports.Image = Image;
exports.Input = Input;
exports.Knocking = Knocking;
exports.List = List;
exports.Preview = Preview;
exports.Text = Text;
exports.Unknown = _Unknown;
exports.Vertical = _Vertical;
exports.Vimeo = _Vimeo;
},{"mini-unique-id":"mini-unique-id","panels-ui":"panels-ui","react":"react","style-to-css":"style-to-css","waiting":"waiting"}],"launchpad-floating.panels.dev":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var panelsUi = require('panels-ui');
var usepagesBlocks = require('usepages-blocks');
var React = _interopDefault(require('react'));

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

var Content = function Content(_ref) {
  var content = _ref.content;
  return React.createElement(
    panelsUi.Panel,
    { style: { backgroundColor: '#000000', color: '#ffffff', fontFamily: 'sans-serif', fontSize: 125, padding: 20 } },
    content,
    React.createElement(
      panelsUi.Teleport,
      { style: styleAction, to: 'http://notes.dev/note-1' },
      'Note 1'
    ),
    React.createElement(
      panelsUi.Teleport,
      { style: styleAction, to: 'http://notes.dev/note-2' },
      'Note 2'
    )
  );
};

var Launchpad = function Launchpad(_ref2) {
  var _ref2$panels = _ref2.panels;
  var router = _ref2$panels.router;
  var runtime = _ref2$panels.runtime;
  var _router$routes$items = router.routes.items;
  var _router$routes$items$ = _router$routes$items[0];
  var lCtx = _router$routes$items$ === undefined ? '' : _router$routes$items$;
  var _router$routes$items$2 = _router$routes$items[1];
  var mCtx = _router$routes$items$2 === undefined ? '' : _router$routes$items$2;
  var _router$routes$items$3 = _router$routes$items[2];
  var dCtx = _router$routes$items$3 === undefined ? '' : _router$routes$items$3;

  var base = mCtx.replace(lCtx, '');

  var notes = base + 'http://notes.dev/';
  var toc = base + 'http://toc.dev/';

  if (dCtx.indexOf(notes) !== -1) {
    notes = base;
  }
  if (dCtx.indexOf(toc) !== -1) {
    toc = base;
  }

  return React.createElement(
    usepagesBlocks.Horizontal,
    { style: { position: 'absolute', zIndex: 1 } },
    React.createElement(
      usepagesBlocks.Horizontal,
      {
        style: _extends({}, styleNext, {
          position: 'absolute',
          top: 'calc(100vh - ' + (SIZE + 20) + 'px)',
          left: 20
        }),
        styleActive: styleNextActive,
        styleHover: styleNextActive,
        teleportTo: toc
      },
      'Toc'
    ),
    React.createElement(
      usepagesBlocks.Horizontal,
      {
        style: _extends({}, styleNext, {
          position: 'absolute',
          left: 'calc(100vw - ' + (SIZE + 20) + 'px)',
          top: 'calc(100vh - ' + (SIZE + 20) + 'px)'
        }),
        styleActive: styleNextActive,
        styleHover: styleNextActive,
        teleportTo: notes
      },
      'Notes'
    )
  );
};

var types = {
  'Content': panelsUi.wrap(Content),
  'Launchpad': panelsUi.wrap(Launchpad)
};

var panels = {
  '/': {
    default: function _default() {
      return 'cover';
    },
    style: {
      overflowY: 'none',
      position: 'absolute',
      zIndex: 1
    },
    type: 'Launchpad'
  },
  '/:content': {
    type: 'Content',
    width: '100%'
  }
};

var lookup = ['/:content'];

var SIZE = 64;

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
var styleNext = {
  alignItems: 'center',
  backgroundColor: '#5eb75e',
  borderRadius: SIZE,
  boxShadow: '0px 0px 10px transparent',
  color: '#ffffff',
  cursor: 'pointer',
  fontFamily: 'sans-serif',
  fontSize: 16,
  height: SIZE,
  justifyContent: 'center',
  margin: 2.5,
  textAlign: 'center',
  textDecoration: 'none',
  textTransform: 'uppercase',
  width: SIZE
};
var styleNextActive = {
  boxShadow: '0px 0px 10px #f2f2f2'
};

exports.types = types;
exports.panels = panels;
exports.lookup = lookup;
},{"panels-ui":"panels-ui","react":"react","usepages-blocks":1}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdXNlcGFnZXMtYmxvY2tzL2Nqcy5qcyIsInBsYXlncm91bmQvbGF1bmNocGFkLWZsb2F0aW5nLnBhbmVscy5kZXYvc3JjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzM4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2ludGVyb3BEZWZhdWx0IChleCkgeyByZXR1cm4gJ2RlZmF1bHQnIGluIGV4ID8gZXhbJ2RlZmF1bHQnXSA6IGV4OyB9XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVhY3RfX2RlZmF1bHQgPSBfaW50ZXJvcERlZmF1bHQoUmVhY3QpO1xudmFyIHVuaXF1ZUlkID0gX2ludGVyb3BEZWZhdWx0KHJlcXVpcmUoJ21pbmktdW5pcXVlLWlkJykpO1xudmFyIFdhaXRpbmcgPSBfaW50ZXJvcERlZmF1bHQocmVxdWlyZSgnd2FpdGluZycpKTtcbnZhciB0b0NTUyA9IF9pbnRlcm9wRGVmYXVsdChyZXF1aXJlKCdzdHlsZS10by1jc3MnKSk7XG52YXIgcGFuZWxzVWkgPSByZXF1aXJlKCdwYW5lbHMtdWknKTtcblxudmFyIGJhYmVsSGVscGVycyA9IHt9O1xuYmFiZWxIZWxwZXJzLnR5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iajtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG59O1xuXG5iYWJlbEhlbHBlcnMuY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxuYmFiZWxIZWxwZXJzLmNyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG5iYWJlbEhlbHBlcnMuZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5iYWJlbEhlbHBlcnMuaW5oZXJpdHMgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59O1xuXG5iYWJlbEhlbHBlcnMub2JqZWN0V2l0aG91dFByb3BlcnRpZXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gIHZhciB0YXJnZXQgPSB7fTtcblxuICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgIGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7XG4gICAgdGFyZ2V0W2ldID0gb2JqW2ldO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbmJhYmVsSGVscGVycy5wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59O1xuXG5iYWJlbEhlbHBlcnM7XG5cbnZhciBDb2RlID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgYmFiZWxIZWxwZXJzLmluaGVyaXRzKENvZGUsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIENvZGUocHJvcHMpIHtcbiAgICBiYWJlbEhlbHBlcnMuY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29kZSk7XG5cbiAgICB2YXIgX3RoaXMgPSBiYWJlbEhlbHBlcnMucG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29kZSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG4gICAgdmFyIGlkID0gJ2NvZGUtJyArIHVuaXF1ZUlkKCk7XG4gICAgX3RoaXMuaWQgPSBpZDtcbiAgICBfdGhpcy5zZXRIZWlnaHQgPSBfdGhpcy5zZXRIZWlnaHQuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICBoZWlnaHQ6IDE2XG4gICAgfTtcbiAgICBfdGhpcy5zdHlsZSA9IFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAnc3R5bGUnLFxuICAgICAgbnVsbCxcbiAgICAgICdcXG4gICAgICAgICMnICsgaWQgKyAnIHNwYW4ge1xcbiAgICAgICAgICBkaXNwbGF5OiBpbmxpbmU7XFxuICAgICAgICB9XFxuICAgICAgICAjJyArIGlkICsgJyBkaXYge1xcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIH1cXG4gICAgICAgICMnICsgaWQgKyAnIC5hY2VfZ3V0dGVyLWNlbGwgc3BhbiB7XFxuICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICAgIH0nXG4gICAgKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBiYWJlbEhlbHBlcnMuY3JlYXRlQ2xhc3MoQ29kZSwgW3tcbiAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBwcm9wcyA9IHRoaXMucHJvcHM7XG5cbiAgICAgIHZhciBlZGl0b3IgPSBhY2UuZWRpdCh0aGlzLmlkKTtcbiAgICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yO1xuXG4gICAgICB2YXIgc2Vzc2lvbiA9IGVkaXRvci5nZXRTZXNzaW9uKCk7XG5cbiAgICAgIHNlc3Npb24uc2V0TW9kZSgnYWNlL21vZGUvJyArIHByb3BzLm1vZGUpO1xuICAgICAgc2Vzc2lvbi5zZXRUYWJTaXplKDIpO1xuICAgICAgc2Vzc2lvbi5zZXRVc2VTb2Z0VGFicyh0cnVlKTtcbiAgICAgIHNlc3Npb24uc2V0VXNlV3JhcE1vZGUodHJ1ZSk7XG5cbiAgICAgIGVkaXRvci4kYmxvY2tTY3JvbGxpbmcgPSBJbmZpbml0eTtcbiAgICAgIGVkaXRvci5zZXREaXNwbGF5SW5kZW50R3VpZGVzKGZhbHNlKTtcbiAgICAgIGVkaXRvci5zZXRGb250U2l6ZSgxMik7XG4gICAgICBlZGl0b3Iuc2V0SGlnaGxpZ2h0QWN0aXZlTGluZShwcm9wcy5oaWdobGlnaHRBY3RpdmVMaW5lKTtcbiAgICAgIGVkaXRvci5zZXRUaGVtZSgnYWNlL3RoZW1lLycgKyBwcm9wcy50aGVtZSk7XG4gICAgICBlZGl0b3Iuc2V0T3B0aW9uKCdyZWFkT25seScsIHByb3BzLnJlYWRPbmx5KTtcbiAgICAgIGVkaXRvci5zZXRPcHRpb24oJ3dyYXAnLCBwcm9wcy53cmFwKTtcbiAgICAgIGVkaXRvci5yZW5kZXJlci5zZXRTaG93R3V0dGVyKHByb3BzLmd1dHRlcik7XG5cbiAgICAgIHNlc3Npb24ub24oJ2NoYW5nZScsIHRoaXMuc2V0SGVpZ2h0KTtcblxuICAgICAgaWYgKHByb3BzLnNyYykge1xuICAgICAgICBmZXRjaChwcm9wcy5zcmMpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIHJldHVybiByZXMudGV4dCgpO1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChjb2RlKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMi5lZGl0b3Iuc2V0VmFsdWUoY29kZSwgLTEpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAocHJvcHMuY29kZSkge1xuICAgICAgICBlZGl0b3Iuc2V0VmFsdWUocHJvcHMuY29kZSwgLTEpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudERpZFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgIHZhciBlZGl0b3IgPSB0aGlzLmVkaXRvcjtcbiAgICAgIHZhciBwcm9wcyA9IHRoaXMucHJvcHM7XG5cbiAgICAgIHZhciBzZXNzaW9uID0gZWRpdG9yLmdldFNlc3Npb24oKTtcblxuICAgICAgaWYgKHByZXZQcm9wcy5tb2RlICE9PSBwcm9wcy5tb2RlKSB7XG4gICAgICAgIHNlc3Npb24uc2V0TW9kZSgnYWNlL21vZGUvJyArIHByb3BzLm1vZGUpO1xuICAgICAgfVxuICAgICAgaWYgKHByZXZQcm9wcy5jb2RlICE9PSBwcm9wcy5jb2RlKSB7XG4gICAgICAgIGVkaXRvci5zZXRWYWx1ZShwcm9wcy5jb2RlLCAtMSk7XG4gICAgICB9XG4gICAgICBpZiAocHJldlByb3BzLmd1dHRlciAhPT0gcHJvcHMuZ3V0dGVyKSB7XG4gICAgICAgIGVkaXRvci5yZW5kZXJlci5zZXRTaG93R3V0dGVyKHByb3BzLmd1dHRlcik7XG4gICAgICB9XG4gICAgICBpZiAocHJldlByb3BzLmhpZ2hsaWdodEFjdGl2ZUxpbmUgIT09IHByb3BzLmhpZ2hsaWdodEFjdGl2ZUxpbmUpIHtcbiAgICAgICAgZWRpdG9yLnNldEhpZ2hsaWdodEFjdGl2ZUxpbmUocHJvcHMuaGlnaGxpZ2h0QWN0aXZlTGluZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmV2UHJvcHMucmVhZHlPbmx5ICE9PSBwcm9wcy5yZWFkT25seSkge1xuICAgICAgICBlZGl0b3Iuc2V0T3B0aW9uKCdyZWFkT25seScsIHByb3BzLnJlYWRPbmx5KTtcbiAgICAgIH1cbiAgICAgIGlmIChwcmV2UHJvcHMuc3JjICE9PSBwcm9wcy5zcmMpIHtcbiAgICAgICAgZmV0Y2gocHJvcHMuc3JjKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnRleHQoKTtcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoY29kZSkge1xuICAgICAgICAgIHJldHVybiBlZGl0b3Iuc2V0VmFsdWUoY29kZSwgLTEpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChwcmV2UHJvcHMudGhlbWUgIT09IHByb3BzLnRoZW1lKSB7XG4gICAgICAgIGVkaXRvci5zZXRUaGVtZSgnYWNlL3RoZW1lLycgKyBwcm9wcy50aGVtZSk7XG4gICAgICB9XG4gICAgICBpZiAocHJldlByb3BzLndyYXAgIT09IHByb3BzLndyYXApIHtcbiAgICAgICAgZWRpdG9yLnNldE9wdGlvbignd3JhcCcsIHByb3BzLndyYXApO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxVbm1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICB0aGlzLmVkaXRvci5nZXRTZXNzaW9uKCkub2ZmKCdjaGFuZ2UnLCB0aGlzLnNldEhlaWdodCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2V0SGVpZ2h0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0SGVpZ2h0KCkge1xuICAgICAgdmFyIGVkaXRvciA9IHRoaXMuZWRpdG9yO1xuXG4gICAgICB2YXIgc2Vzc2lvbiA9IGVkaXRvci5nZXRTZXNzaW9uKCk7XG5cbiAgICAgIGVkaXRvci5zZXRPcHRpb24oJ21pbkxpbmVzJywgc2Vzc2lvbi5nZXRMZW5ndGgoKSk7XG4gICAgICBlZGl0b3Iuc2V0T3B0aW9uKCdtYXhMaW5lcycsIHNlc3Npb24uZ2V0TGVuZ3RoKCkpO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaGVpZ2h0OiBlZGl0b3IucmVuZGVyZXIuc2Nyb2xsQmFyVi5pbm5lci5zdHlsZS5oZWlnaHQgLy8gZWRpdG9yLnJlbmRlcmVyLmxheWVyQ29uZmlnLm1pbkhlaWdodFxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIGlkID0gdGhpcy5pZDtcbiAgICAgIHZhciBwcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgc3RhdGUgPSB0aGlzLnN0YXRlO1xuXG5cbiAgICAgIHJldHVybiBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgeyBpZDogcHJvcHMuaWQsICdkYXRhLWJsb2NrJzogcHJvcHNbJ2RhdGEtYmxvY2snXSB9LFxuICAgICAgICB0aGlzLnN0eWxlLFxuICAgICAgICBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IGlkOiBpZCwgcmVmOiAnY29kZScsIHN0eWxlOiBiYWJlbEhlbHBlcnMuZXh0ZW5kcyh7fSwgcHJvcHMuc3R5bGUsIHsgaGVpZ2h0OiBzdGF0ZS5oZWlnaHQgfSkgfSlcbiAgICAgICk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBDb2RlO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5Db2RlLmRlZmF1bHRQcm9wcyA9IHtcbiAgZ3V0dGVyOiB0cnVlLFxuICBoaWdobGlnaHRBY3RpdmVMaW5lOiB0cnVlLFxuICBtb2RlOiAnanNvbicsXG4gIHN0eWxlOiB7XG4gICAgd2lkdGg6ICcxMDAlJ1xuICB9LFxuICB0aGVtZTogJ2lkbGVfZmluZ2VycycsXG4gIHdyYXA6IDQwXG59O1xuXG52YXIgT3ZlckNvdmVyID0gZnVuY3Rpb24gT3ZlckNvdmVyKHByb3BzKSB7XG4gIHZhciBvdmVyQ292ZXJTdHlsZSA9IGJhYmVsSGVscGVycy5leHRlbmRzKHt9LCBzdHlsZS5vdmVyQ292ZXIsIHtcbiAgICBoZWlnaHQ6IHByb3BzLmhlaWdodCxcbiAgICBsZWZ0OiAnY2FsYyg1MCUgLSAnICsgcHJvcHMud2lkdGggLyAyICsgJ3B4KScsXG4gICAgdG9wOiAnY2FsYyg1MCUgLSAnICsgcHJvcHMuaGVpZ2h0IC8gMiArICdweCknLFxuICAgIHdpZHRoOiBwcm9wcy53aWR0aFxuICB9KTtcblxuICByZXR1cm4gUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudCgnaW1nJywgeyBzcmM6IHByb3BzLnNyYywgc3R5bGU6IHByb3BzLnN0eWxlIH0pO1xufTtcblxudmFyIEVtYmVkID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgYmFiZWxIZWxwZXJzLmluaGVyaXRzKEVtYmVkLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBFbWJlZChwcm9wcykge1xuICAgIGJhYmVsSGVscGVycy5jbGFzc0NhbGxDaGVjayh0aGlzLCBFbWJlZCk7XG5cbiAgICB2YXIgX3RoaXMgPSBiYWJlbEhlbHBlcnMucG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRW1iZWQpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgZXJyb3I6ICEhcHJvcHMuc3JjID09PSBmYWxzZSxcbiAgICAgIGlzTG9hZGluZzogISFwcm9wcy5zcmMsXG4gICAgICBpc1JlYWR5OiBmYWxzZVxuICAgIH07XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgYmFiZWxIZWxwZXJzLmNyZWF0ZUNsYXNzKEVtYmVkLCBbe1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgIHRoaXMuZ2V0RW1iZWQodGhpcy5wcm9wcy5zcmMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgaWYgKHRoaXMucHJvcHMuc3JjICE9PSBuZXh0UHJvcHMuc3JjKSB7XG4gICAgICAgIHRoaXMuZ2V0RW1iZWQobmV4dFByb3BzLnNyYyk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0RW1iZWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRFbWJlZChzcmMpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICBmZXRjaChzcmMpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgX3RoaXMyLnNldFN0YXRlKHtcbiAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgaXNSZWFkeTogdHJ1ZSxcbiAgICAgICAgICBzaG93Q292ZXI6ICEhZGF0YS50aHVtYm5haWxfdXJsXG4gICAgICAgIH0pO1xuICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICBfdGhpczIuc2V0U3RhdGUoe1xuICAgICAgICAgIGVycm9yOiB0cnVlLFxuICAgICAgICAgIG1lc3NhZ2U6IGVyclxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICB2YXIgX3N0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgIHZhciBkYXRhID0gX3N0YXRlLmRhdGE7XG4gICAgICB2YXIgZXJyb3IgPSBfc3RhdGUuZXJyb3I7XG4gICAgICB2YXIgaXNMb2FkaW5nID0gX3N0YXRlLmlzTG9hZGluZztcbiAgICAgIHZhciBpc1JlYWR5ID0gX3N0YXRlLmlzUmVhZHk7XG4gICAgICB2YXIgc2hvd0NvdmVyID0gX3N0YXRlLnNob3dDb3ZlcjtcbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGhlaWdodCA9IF9wcm9wcy5oZWlnaHQ7XG4gICAgICB2YXIgb3ZlckNvdmVyID0gX3Byb3BzLm92ZXJDb3ZlcjtcbiAgICAgIHZhciBfcHJvcHMkX3BhZ2VzID0gX3Byb3BzLl9wYWdlcztcblxuICAgICAgdmFyIF9wYWdlcyA9IF9wcm9wcyRfcGFnZXMgPT09IHVuZGVmaW5lZCA/IHt9IDogX3Byb3BzJF9wYWdlcztcblxuICAgICAgdmFyIHdpZHRoID0gX3Byb3BzLndpZHRoO1xuXG4gICAgICB2YXIgZW1iZWRTdHlsZSA9IGJhYmVsSGVscGVycy5leHRlbmRzKHtcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgIHdpZHRoOiB3aWR0aFxuICAgICAgfSwgdGhpcy5wcm9wcy5zdHlsZSk7XG4gICAgICB2YXIgcmV0ID0gdm9pZCAwO1xuXG4gICAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICAgIHJldCA9IFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoV2FpdGluZywgbnVsbCk7XG4gICAgICB9IGVsc2UgaWYgKGlzUmVhZHkpIHtcbiAgICAgICAgaWYgKHNob3dDb3Zlcikge1xuICAgICAgICAgIHJldCA9IFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgIHsgb25DbGljazogZnVuY3Rpb24gb25DbGljaygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMzLnNldFN0YXRlKHsgc2hvd0NvdmVyOiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgfSwgc3R5bGU6IHN0eWxlLmNvdmVyIH0sXG4gICAgICAgICAgICBvdmVyQ292ZXIgJiYgUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChPdmVyQ292ZXIsIG92ZXJDb3ZlciksXG4gICAgICAgICAgICBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdpbWcnLCB7IHNyYzogZGF0YS50aHVtYm5haWxfdXJsLCBzdHlsZTogc3R5bGUuY292ZXJJbWFnZSB9KVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0ID0gUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBkYW5nZXJvdXNseVNldElubmVySFRNTDogeyBfX2h0bWw6IGRhdGEuaHRtbCB9IH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGVycm9yKSB7XG4gICAgICAgIHJldCA9IFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICB0eXBlb2YgbWVzc2FnZSA9PT0gJ3VuZGVmaW5lZCcgPyAnRG8geW91IHNyYyBpbiB5b3VyIHByb3BzPycgOiBtZXNzYWdlXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgYmFiZWxIZWxwZXJzLmV4dGVuZHMoeyBzdHlsZTogZW1iZWRTdHlsZSB9LCBfcGFnZXMpLFxuICAgICAgICByZXRcbiAgICAgICk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBFbWJlZDtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuRW1iZWQuZGVmYXVsdFByb3BzID0ge1xuICBvdmVyQ292ZXI6IGZhbHNlXG59O1xuXG52YXIgc3R5bGUgPSB7XG4gIGNvdmVyOiB7XG4gICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgfSxcbiAgb3ZlckNvdmVyOiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgekluZGV4OiAxXG4gIH1cbn07XG5cbnZhciBibG9ja1NoYXBlID0gUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgYmxvY2s6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgcHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gIHdoZW46IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1JlYWN0LlByb3BUeXBlcy5mdW5jLCBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXSlcbn0pO1xuXG52YXIgR29UbyA9IGZ1bmN0aW9uIEdvVG8ocHJvcHMpIHtcbiAgdmFyIHN0eWxlSG92ZXIgPSBwcm9wcy5zdHlsZUhvdmVyO1xuICB2YXIgcmVzdCA9IGJhYmVsSGVscGVycy5vYmplY3RXaXRob3V0UHJvcGVydGllcyhwcm9wcywgWydzdHlsZUhvdmVyJ10pO1xuXG4gIHZhciBjbGFzc05hbWUgPSAnR29Uby0nICsgdW5pcXVlSWQoKTtcblxuICB2YXIgaW5saW5lU3R5bGUgPSBwcm9wcy5zdHlsZUhvdmVyID8gJy4nICsgY2xhc3NOYW1lICsgJzpob3ZlciB7JyArIHRvQ1NTKHN0eWxlSG92ZXIpICsgJ30nIDogJyc7XG5cbiAgcmV0dXJuIFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgJ2EnLFxuICAgIGJhYmVsSGVscGVycy5leHRlbmRzKHt9LCByZXN0LCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lLCB0YXJnZXQ6ICdfYmxhbmsnIH0pLFxuICAgIHByb3BzLmNoaWxkcmVuLFxuICAgIFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAnc3R5bGUnLFxuICAgICAgbnVsbCxcbiAgICAgIGlubGluZVN0eWxlXG4gICAgKVxuICApO1xufTtcblxudmFyIE9uQ2xpY2sgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBiYWJlbEhlbHBlcnMuaW5oZXJpdHMoT25DbGljaywgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gT25DbGljayhwcm9wcykge1xuICAgIGJhYmVsSGVscGVycy5jbGFzc0NhbGxDaGVjayh0aGlzLCBPbkNsaWNrKTtcblxuICAgIHZhciBfdGhpcyA9IGJhYmVsSGVscGVycy5wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihPbkNsaWNrKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICBfdGhpcy5jbGFzc05hbWUgPSAnT25DbGljay0nICsgdW5pcXVlSWQoKTtcbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGFjdGl2ZTogZmFsc2VcbiAgICB9O1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIGJhYmVsSGVscGVycy5jcmVhdGVDbGFzcyhPbkNsaWNrLCBbe1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgIHRoaXMuYmluZE9uQ2xpY2sodGhpcy5wcm9wcy5vbkNsaWNrLCB0aGlzLnByb3BzLl9pblBhZ2VzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnRXaWxsVXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMpIHtcbiAgICAgIHRoaXMuYmluZE9uQ2xpY2sobmV4dFByb3BzLm9uQ2xpY2ssIG5leHRQcm9wcy5faW5QYWdlcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50V2lsbFVubW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIGlmICh0aGlzLm9uQ2xpY2tUaW1lb3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm9uQ2xpY2tUaW1lb3V0KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdiaW5kT25DbGljaycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJpbmRPbkNsaWNrKG9uQ2xpY2ssIF9pblBhZ2VzKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIGZpbmFsT25DbGljayA9IHR5cGVvZiBvbkNsaWNrID09PSAnZnVuY3Rpb24nID8gb25DbGljayA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKG9uQ2xpY2spO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5vbkNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGZpbmFsT25DbGljayhldmVudCk7XG5cbiAgICAgICAgaWYgKCFfaW5QYWdlcykge1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgX3RoaXMyLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgX3RoaXMyLm9uQ2xpY2tUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpczIuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICBhY3RpdmU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF90aGlzMi5vbkNsaWNrVGltZW91dCA9IG51bGw7XG4gICAgICAgICAgfSwgX3RoaXMyLnByb3BzLnN0eWxlQWN0aXZlVGltZW91dCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIGFjdGl2ZSA9IHRoaXMuc3RhdGUuYWN0aXZlO1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBfcHJvcHMuY2hpbGRyZW47XG4gICAgICB2YXIgc3R5bGUgPSBfcHJvcHMuc3R5bGU7XG4gICAgICB2YXIgc3R5bGVBY3RpdmUgPSBfcHJvcHMuc3R5bGVBY3RpdmU7XG4gICAgICB2YXIgc3R5bGVIb3ZlciA9IF9wcm9wcy5zdHlsZUhvdmVyO1xuICAgICAgdmFyIHJlc3QgPSBiYWJlbEhlbHBlcnMub2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3Byb3BzLCBbJ2NoaWxkcmVuJywgJ3N0eWxlJywgJ3N0eWxlQWN0aXZlJywgJ3N0eWxlSG92ZXInXSk7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gdGhpcy5jbGFzc05hbWU7XG5cblxuICAgICAgdmFyIGlubGluZVN0eWxlID0gIWFjdGl2ZSAmJiBzdHlsZUhvdmVyID8gJy4nICsgY2xhc3NOYW1lICsgJzpob3ZlciB7JyArIHRvQ1NTKHN0eWxlSG92ZXIpICsgJ30nIDogJyc7XG5cbiAgICAgIHZhciBmaW5hbFN0eWxlID0gYWN0aXZlID8gYmFiZWxIZWxwZXJzLmV4dGVuZHMoe30sIHN0eWxlLCBzdHlsZUFjdGl2ZSwge1xuICAgICAgICBvdXRsaW5lOiAwXG4gICAgICB9KSA6IGJhYmVsSGVscGVycy5leHRlbmRzKHt9LCBzdHlsZSwge1xuICAgICAgICBvdXRsaW5lOiAwLFxuICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnYnV0dG9uJyxcbiAgICAgICAgYmFiZWxIZWxwZXJzLmV4dGVuZHMoe30sIHJlc3QsIHtcbiAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgICAgICBkaXNhYmxlZDogYWN0aXZlLFxuICAgICAgICAgIG9uQ2xpY2s6IHRoaXMub25DbGljayxcbiAgICAgICAgICBzdHlsZTogZmluYWxTdHlsZVxuICAgICAgICB9KSxcbiAgICAgICAgUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAnc3R5bGUnLFxuICAgICAgICAgIG51bGwsXG4gICAgICAgICAgaW5saW5lU3R5bGVcbiAgICAgICAgKSxcbiAgICAgICAgY2hpbGRyZW5cbiAgICAgICk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBPbkNsaWNrO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5PbkNsaWNrLmRlZmF1bHRQcm9wcyA9IHtcbiAgc3R5bGVBY3RpdmVUaW1lb3V0OiAxMDAwXG59O1xuT25DbGljay5wcm9wVHlwZXMgPSB7XG4gIGNoaWxkcmVuOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG4gIF9pblBhZ2VzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgb25DbGljazogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbUmVhY3QuUHJvcFR5cGVzLmZ1bmMsIFJlYWN0LlByb3BUeXBlcy5zdHJpbmddKSxcbiAgc3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gIHN0eWxlQWN0aXZlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICBzdHlsZUFjdGl2ZVRpbWVvdXQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgc3R5bGVIb3ZlcjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxufTtcblxuZnVuY3Rpb24gY3JlYXRlR3JvdXAobmFtZSwgZ3JvdXBTdHlsZSkge1xuICB2YXIgR3JvdXAgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAgIGJhYmVsSGVscGVycy5pbmhlcml0cyhHcm91cCwgX0NvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBHcm91cCgpIHtcbiAgICAgIGJhYmVsSGVscGVycy5jbGFzc0NhbGxDaGVjayh0aGlzLCBHcm91cCk7XG4gICAgICByZXR1cm4gYmFiZWxIZWxwZXJzLnBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKEdyb3VwKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICB9XG5cbiAgICBiYWJlbEhlbHBlcnMuY3JlYXRlQ2xhc3MoR3JvdXAsIFt7XG4gICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IF9wcm9wcy5jaGlsZHJlbjtcbiAgICAgICAgdmFyIGdvVG8gPSBfcHJvcHMuZ29UbztcbiAgICAgICAgdmFyIG9uQ2xpY2sgPSBfcHJvcHMub25DbGljaztcbiAgICAgICAgdmFyIHN0eWxlID0gX3Byb3BzLnN0eWxlO1xuICAgICAgICB2YXIgdGVsZXBvcnRUbyA9IF9wcm9wcy50ZWxlcG9ydFRvO1xuICAgICAgICB2YXIgcmVzdCA9IGJhYmVsSGVscGVycy5vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcHJvcHMsIFsnY2hpbGRyZW4nLCAnZ29UbycsICdvbkNsaWNrJywgJ3N0eWxlJywgJ3RlbGVwb3J0VG8nXSk7XG4gICAgICAgIHZhciBfcGFnZXNJc1NlbGVjdGluZyA9IHRoaXMuY29udGV4dC5fcGFnZXNJc1NlbGVjdGluZztcblxuICAgICAgICB2YXIgYmFzZVByb3BzID0ge307XG4gICAgICAgIGlmIChfcGFnZXNJc1NlbGVjdGluZykge1xuICAgICAgICAgIGJhc2VQcm9wcy5fcGFnZXNJc1NlbGVjdGluZyA9IHRydWU7XG4gICAgICAgICAgYmFzZVByb3BzLm9uQ2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBCYXNlID0gdm9pZCAwO1xuICAgICAgICBpZiAodGVsZXBvcnRUbykge1xuICAgICAgICAgIEJhc2UgPSBwYW5lbHNVaS5UZWxlcG9ydDtcbiAgICAgICAgICBiYXNlUHJvcHMudG8gPSB0ZWxlcG9ydFRvO1xuICAgICAgICB9IGVsc2UgaWYgKGdvVG8pIHtcbiAgICAgICAgICBCYXNlID0gR29UbztcbiAgICAgICAgICBiYXNlUHJvcHMuaHJlZiA9IGdvVG87XG4gICAgICAgICAgYmFzZVByb3BzLnRhcmdldCA9ICdfYmxhbmsnO1xuICAgICAgICB9IGVsc2UgaWYgKG9uQ2xpY2spIHtcbiAgICAgICAgICBCYXNlID0gT25DbGljaztcbiAgICAgICAgICBpZiAoIWJhc2VQcm9wcy5vbkNsaWNrKSB7XG4gICAgICAgICAgICBiYXNlUHJvcHMub25DbGljayA9IG9uQ2xpY2s7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJhc2VQcm9wcy5yZWYgPSBmdW5jdGlvbiAoJGUpIHtcbiAgICAgICAgICAgIF90aGlzMi4kZSA9ICRlO1xuICAgICAgICAgIH07XG4gICAgICAgICAgQmFzZSA9ICdkaXYnO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZpbmFsU3R5bGUgPSBiYWJlbEhlbHBlcnMuZXh0ZW5kcyh7XG4gICAgICAgICAgZmxleFdyYXA6ICd3cmFwJ1xuICAgICAgICB9LCBncm91cFN0eWxlLCBzdHlsZSk7XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgQmFzZSxcbiAgICAgICAgICBiYWJlbEhlbHBlcnMuZXh0ZW5kcyh7IHN0eWxlOiBmaW5hbFN0eWxlIH0sIHJlc3QsIGJhc2VQcm9wcyksXG4gICAgICAgICAgY2hpbGRyZW5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XSk7XG4gICAgcmV0dXJuIEdyb3VwO1xuICB9KFJlYWN0LkNvbXBvbmVudCk7XG5cbiAgR3JvdXAuY29udGV4dFR5cGVzID0ge1xuICAgIF9wYWdlc0lzU2VsZWN0aW5nOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbFxuICB9O1xuXG4gIEdyb3VwLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBibG9ja3M6IFtdLFxuICAgIHN0eWxlOiB7fSxcbiAgICBzdHlsZUFjdGl2ZToge30sXG4gICAgc3R5bGVIb3Zlcjoge31cbiAgfTtcblxuICBHcm91cC5kaXNwbGF5TmFtZSA9IG5hbWU7XG5cbiAgR3JvdXAucHJvcFR5cGVzID0ge1xuICAgIGJsb2NrczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoYmxvY2tTaGFwZSkuaXNSZXF1aXJlZCxcbiAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLmFueSxcbiAgICBnb1RvOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uQ2xpY2s6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1JlYWN0LlByb3BUeXBlcy5zdHJpbmcsIFJlYWN0LlByb3BUeXBlcy5mdW5jXSksXG4gICAgc3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgc3R5bGVBY3RpdmU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgc3R5bGVIb3ZlcjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICB0ZWxlcG9ydFRvOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gIH07XG5cbiAgcmV0dXJuIEdyb3VwO1xufVxuXG52YXIgX0hvcml6b250YWwgPSBjcmVhdGVHcm91cCgnSG9yaXpvbnRhbCcsIHsgZmxleERpcmVjdGlvbjogJ3JvdycgfSk7XG5cbnZhciBLbm9ja2luZyA9IGZ1bmN0aW9uIEtub2NraW5nKF9yZWYpIHtcbiAgdmFyIF9yZWYkX3BhZ2VzID0gX3JlZi5fcGFnZXM7XG5cbiAgdmFyIF9wYWdlcyA9IF9yZWYkX3BhZ2VzID09PSB1bmRlZmluZWQgPyB7fSA6IF9yZWYkX3BhZ2VzO1xuXG4gIHZhciBfcmVmJHN0eWxlID0gX3JlZi5zdHlsZTtcbiAgdmFyIHN0eWxlID0gX3JlZiRzdHlsZSA9PT0gdW5kZWZpbmVkID8ge30gOiBfcmVmJHN0eWxlO1xuICB2YXIgc2l6ZSA9IF9yZWYuc2l6ZTtcbiAgcmV0dXJuIFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgJ2RpdicsXG4gICAgYmFiZWxIZWxwZXJzLmV4dGVuZHMoeyBzdHlsZTogc3R5bGUgfSwgX3BhZ2VzKSxcbiAgICBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFdhaXRpbmcsIHsgY29sb3I6IHN0eWxlLmNvbG9yLCBzaXplOiBzaXplIH0pXG4gICk7XG59O1xuXG5Lbm9ja2luZy5kZWZhdWx0UHJvcHMgPSB7XG4gIHN0eWxlOiB7XG4gICAgY29sb3I6ICcjMzIzMjMyJ1xuICB9LFxuICBzaXplOiAyMFxufTtcblxuS25vY2tpbmcuZGVzY3JpcHRpb24gPSAnQSBoYW5keSBsb2FkaW5nIGluZGljYXRvciA7KSc7XG5cbktub2NraW5nLnByb3BUeXBlcyA9IHtcbiAgc3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gIHNpemU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxufTtcblxudmFyIEltYWdlID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgYmFiZWxIZWxwZXJzLmluaGVyaXRzKEltYWdlLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBJbWFnZShwcm9wcykge1xuICAgIGJhYmVsSGVscGVycy5jbGFzc0NhbGxDaGVjayh0aGlzLCBJbWFnZSk7XG5cbiAgICB2YXIgX3RoaXMgPSBiYWJlbEhlbHBlcnMucG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoSW1hZ2UpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgIF90aGlzLm9uTG9hZCA9IF90aGlzLm9uTG9hZC5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzTG9hZGluZzogdHJ1ZVxuICAgIH07XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgYmFiZWxIZWxwZXJzLmNyZWF0ZUNsYXNzKEltYWdlLCBbe1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgaWYgKHRoaXMucHJvcHMuc3JjICE9PSBuZXh0UHJvcHMuc3JjKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGlzTG9hZGluZzogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbkxvYWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaXNMb2FkaW5nOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIGlzTG9hZGluZyA9IHRoaXMuc3RhdGUuaXNMb2FkaW5nO1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgdGV4dCA9IF9wcm9wcy50ZXh0O1xuICAgICAgdmFyIHNyYyA9IF9wcm9wcy5zcmM7XG4gICAgICB2YXIgc3R5bGUgPSBfcHJvcHMuc3R5bGU7XG4gICAgICB2YXIgc3R5bGVMb2FkaW5nID0gX3Byb3BzLnN0eWxlTG9hZGluZztcbiAgICAgIHZhciBzdHlsZVdyYXBwZXIgPSBfcHJvcHMuc3R5bGVXcmFwcGVyO1xuXG5cbiAgICAgIHJldHVybiBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgeyBzdHlsZTogc3R5bGVXcmFwcGVyLCAnZGF0YS1ibG9jayc6IHRoaXMucHJvcHNbJ2RhdGEtYmxvY2snXSB9LFxuICAgICAgICBpc0xvYWRpbmcgJiYgUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChLbm9ja2luZywgeyBzdHlsZTogc3R5bGVMb2FkaW5nIH0pLFxuICAgICAgICBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XG4gICAgICAgICAgYWx0OiB0ZXh0LFxuICAgICAgICAgIG9uTG9hZDogdGhpcy5vbkxvYWQsXG4gICAgICAgICAgc3JjOiBzcmMsXG4gICAgICAgICAgc3R5bGU6IHN0eWxlLFxuICAgICAgICAgIHRpdGxlOiB0ZXh0XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gSW1hZ2U7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbkltYWdlLmRlZmF1bHRQcm9wcyA9IHtcbiAgc3JjOiAnaHR0cHM6Ly9maWxlcy51c2VwYWdlcy50b2RheS91c2VwYWdlcy50b2RheS9pbWFnZS1wbGFjZWhvbGRlci5zdmcnLFxuICBzdHlsZToge30sXG4gIHN0eWxlTG9hZGluZzoge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4gIH0sXG4gIHN0eWxlV3JhcHBlcjoge30sXG4gIHRleHQ6ICdBbHRlcm5hdGl2ZSB0ZXh0J1xufTtcblxuSW1hZ2UuZGVzY3JpcHRpb24gPSBcIkFkZCBzb21lIHRleHQgZm9yIHdoZW4gdGhlIGltYWdlIGNhbid0IGJlIGRpc3BsYXllZC5cIjtcblxuSW1hZ2UucHJvcFR5cGVzID0ge1xuICAnZGF0YS1ibG9jayc6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIHNyYzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgc3R5bGVMb2FkaW5nOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICBzdHlsZVdyYXBwZXI6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gIHRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbn07XG5cbnZhciBJbnB1dCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIGJhYmVsSGVscGVycy5pbmhlcml0cyhJbnB1dCwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gSW5wdXQocHJvcHMpIHtcbiAgICBiYWJlbEhlbHBlcnMuY2xhc3NDYWxsQ2hlY2sodGhpcywgSW5wdXQpO1xuXG4gICAgdmFyIF90aGlzID0gYmFiZWxIZWxwZXJzLnBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKElucHV0KS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICBfdGhpcy5jbGFzc05hbWUgPSAnSW5wdXQtJyArIHVuaXF1ZUlkKCk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgYmFiZWxIZWxwZXJzLmNyZWF0ZUNsYXNzKElucHV0LCBbe1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBjbGFzc05hbWUgPSB0aGlzLmNsYXNzTmFtZTtcbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIG9uRW50ZXIgPSBfcHJvcHMub25FbnRlcjtcbiAgICAgIHZhciBzdHlsZSA9IF9wcm9wcy5zdHlsZTtcbiAgICAgIHZhciBzdHlsZUhvdmVyID0gX3Byb3BzLnN0eWxlSG92ZXI7XG4gICAgICB2YXIgc3R5bGVXcmFwcGVyID0gX3Byb3BzLnN0eWxlV3JhcHBlcjtcbiAgICAgIHZhciByZXN0ID0gYmFiZWxIZWxwZXJzLm9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9wcm9wcywgWydvbkVudGVyJywgJ3N0eWxlJywgJ3N0eWxlSG92ZXInLCAnc3R5bGVXcmFwcGVyJ10pO1xuXG5cbiAgICAgIHZhciBiYWNrZ3JvdW5kQ29sb3IgPSBzdHlsZSAmJiBzdHlsZS5iYWNrZ3JvdW5kQ29sb3IgfHwgJ3RyYW5zcGFyZW50JztcbiAgICAgIHZhciBjb2xvciA9IHN0eWxlICYmIHN0eWxlLmNvbG9yIHx8ICdibGFjayc7XG4gICAgICB2YXIgaW5saW5lU3R5bGUgPSAnLicgKyBjbGFzc05hbWUgKyAnOi13ZWJraXQtYXV0b2ZpbGwge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICcgKyBiYWNrZ3JvdW5kQ29sb3IgKyAnICFpbXBvcnRhbnQ7XFxuICAgICAgYm94LXNoYWRvdzogMCAwIDBweCAxMDAwcHggJyArIGJhY2tncm91bmRDb2xvciArICcgaW5zZXQ7XFxuICAgICAgY29sb3I6ICcgKyBjb2xvciArICcgIWltcG9ydGFudDtcXG4gICAgfSc7XG5cbiAgICAgIGlmIChzdHlsZUhvdmVyKSB7XG4gICAgICAgIGlubGluZVN0eWxlID0gaW5saW5lU3R5bGUgKyAnIC4nICsgY2xhc3NOYW1lICsgJzpob3ZlciB7JyArIHRvQ1NTKHN0eWxlSG92ZXIpICsgJ30nO1xuICAgICAgfVxuXG4gICAgICB2YXIgb25LZXlVcCA9IHZvaWQgMDtcbiAgICAgIGlmICh0eXBlb2Ygb25FbnRlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgZmluYWxPbkVudGVyID0gdHlwZW9mIG9uRW50ZXIgPT09ICdmdW5jdGlvbicgPyBvbkVudGVyIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKG9uRW50ZXIpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgb25LZXlVcCA9IGZ1bmN0aW9uIG9uS2V5VXAoZXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBldmVudC5rZXkgPT09ICdFbnRlcicgJiYgZmluYWxPbkVudGVyKGV2ZW50KTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KSgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHsgc3R5bGU6IHN0eWxlV3JhcHBlciB9LFxuICAgICAgICBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdpbnB1dCcsIGJhYmVsSGVscGVycy5leHRlbmRzKHt9LCByZXN0LCB7XG4gICAgICAgICAgYXV0b0NvbXBsZXRlOiAnb2ZmJyxcbiAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgICAgICBvbktleVVwOiBvbktleVVwLFxuICAgICAgICAgIHJlZjogJ2lucHV0JyxcbiAgICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgICAgfSkpLFxuICAgICAgICBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICdzdHlsZScsXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICBpbmxpbmVTdHlsZVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gSW5wdXQ7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbklucHV0LmRlZmF1bHRQcm9wcyA9IHtcbiAgcGxhY2Vob2xkZXI6ICcnLFxuICBzdHlsZToge30sXG4gIHN0eWxlSG92ZXI6IHt9LFxuICBzdHlsZVdyYXBwZXI6IHt9LFxuICB0eXBlOiAndGV4dCdcbn07XG5cbklucHV0LnByb3BUeXBlcyA9IHtcbiAgcGxhY2Vob2xkZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIHN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICBzdHlsZUhvdmVyOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICBzdHlsZVdyYXBwZXI6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gIHR5cGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxufTtcblxudmFyIExpc3QgPSBmdW5jdGlvbiBMaXN0KCkge1xuICByZXR1cm4gbnVsbDtcbn07XG5cbnZhciBUZXh0ID0gZnVuY3Rpb24gVGV4dChfcmVmKSB7XG4gIHZhciBkYXRhQmxvY2sgPSBfcmVmWydkYXRhLWJsb2NrJ107XG4gIHZhciBfcmVmJGVsZW1lbnQgPSBfcmVmLmVsZW1lbnQ7XG4gIHZhciBFbGVtZW50ID0gX3JlZiRlbGVtZW50ID09PSB1bmRlZmluZWQgPyAnZGl2JyA6IF9yZWYkZWxlbWVudDtcbiAgdmFyIGxpbmVCcmVhayA9IF9yZWYubGluZUJyZWFrO1xuICB2YXIgc3R5bGUgPSBfcmVmLnN0eWxlO1xuICB2YXIgdGV4dCA9IF9yZWYudGV4dDtcblxuICB2YXIgc3R5bGVMaW5lID0geyBtYXJnaW5Ub3A6IGxpbmVCcmVhayB9O1xuXG4gIHJldHVybiBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgIEVsZW1lbnQsXG4gICAgeyAnZGF0YS1ibG9jayc6IGRhdGFCbG9jaywgc3R5bGU6IHN0eWxlIH0sXG4gICAgKCcnICsgdGV4dCkuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbiAodCwgaSkge1xuICAgICAgcmV0dXJuIFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7IGtleTogaSwgc3R5bGU6IGkgPyBzdHlsZUxpbmUgOiB1bmRlZmluZWQgfSxcbiAgICAgICAgdFxuICAgICAgKTtcbiAgICB9KVxuICApO1xufTtcblxuVGV4dC5kZWZhdWx0UHJvcHMgPSB7XG4gIGxpbmVCcmVhazogMTAsXG4gIHN0eWxlOiB7fSxcbiAgdGV4dDogJ1dyaXRlIHNvbWUgdGV4dCdcbn07XG5cblRleHQucHJvcFR5cGVzID0ge1xuICAnZGF0YS1ibG9jayc6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGVsZW1lbnQ6IFJlYWN0LlByb3BUeXBlcy5hbnksXG4gIGxpbmVCcmVhazogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgc3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gIHRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxufTtcblxudmFyIFByZXZpZXcgPSBmdW5jdGlvbiBQcmV2aWV3KF9yZWYpIHtcbiAgdmFyIEJsb2NrID0gX3JlZi5ibG9jaztcbiAgdmFyIF9yZWYkX3BhZ2VzID0gX3JlZi5fcGFnZXM7XG5cbiAgdmFyIF9wYWdlcyA9IF9yZWYkX3BhZ2VzID09PSB1bmRlZmluZWQgPyB7fSA6IF9yZWYkX3BhZ2VzO1xuXG4gIHZhciBfcmVmJHByb3BzID0gX3JlZi5wcm9wcztcbiAgdmFyIHByb3BzID0gX3JlZiRwcm9wcyA9PT0gdW5kZWZpbmVkID8ge30gOiBfcmVmJHByb3BzO1xuXG4gIGlmICh0eXBlb2YgQmxvY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChCbG9jaywgcHJvcHMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgJ2RpdicsXG4gICAgICBiYWJlbEhlbHBlcnMuZXh0ZW5kcyh7IHN0eWxlOiBzdHlsZXMucHJldmlldyB9LCBfcGFnZXMpLFxuICAgICAgUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChUZXh0LCB7IHN0eWxlOiBzdHlsZXMudGV4dCwgdGV4dDogJ0luIGFuIGlkZWFsIHdvcmxkIElcXCdkIGJlIHJlbmRlcmluZyBcIicgKyBCbG9jayArICdcIiB3aXRoIHRoZXNlIHByb3BzOicgfSksXG4gICAgICBSZWFjdF9fZGVmYXVsdC5jcmVhdGVFbGVtZW50KENvZGUsIHsgY29kZTogSlNPTi5zdHJpbmdpZnkocHJvcHMpLFxuICAgICAgICBndXR0ZXI6IGZhbHNlLFxuICAgICAgICBoaWdobGlnaHRBY3RpdmVMaW5lOiBmYWxzZSxcbiAgICAgICAgcmVhZE9ubHk6IHRydWUsXG4gICAgICAgIHRoZW1lOiAnZ2l0aHViJyxcbiAgICAgICAgc3R5bGU6IHN0eWxlcy5jb2RlLFxuICAgICAgICB3cmFwOiA0MCB9KSxcbiAgICAgIFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBzdHlsZTogc3R5bGVzLnRleHQsXG4gICAgICAgIHRleHQ6ICdIb3dldmVyIHdlIGdvdCBhICcgKyAodHlwZW9mIEJsb2NrID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogYmFiZWxIZWxwZXJzLnR5cGVvZihCbG9jaykpICsgJyBpbnN0ZWFkIG9mIGEgUmVhY3QgZWxlbWVudC5cXG5UaGlzIGlzIG9rIGlmIHlvdVxcJ3JlIHVzaW5nIHRoZSBQcmV2aWV3IGJsb2NrIGluIFBhZ2VzIHRvIGJ1aWxkIFBhZ2VzIHRob3VnaCA6KSAoaW5jZXB0aW9uIHN0eWxlIDpQKS4gwq9cXFxcXyjjg4QpXy/CrycgfSlcbiAgICApO1xuICB9XG59O1xuXG5QcmV2aWV3LnByb3BUeXBlcyA9IHtcbiAgYmxvY2s6IFJlYWN0LlByb3BUeXBlcy5hbnksXG5cbiAgcHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3Rcbn07XG5cbnZhciBzdHlsZXMgPSB7XG4gIGNvZGU6IHtcbiAgICBoZWlnaHQ6IDEwMCxcbiAgICBtYXJnaW5Ub3A6IDIwXG4gIH0sXG4gIHRleHQ6IHtcbiAgICBtYXJnaW5Ub3A6IDIwXG4gIH0sXG4gIHByZXZpZXc6IHtcbiAgICBmb250U2l6ZTogMTIsXG4gICAgbWFyZ2luOiAyMFxuICB9XG59O1xuXG52YXIgX1Vua25vd24gPSAoZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIGRhdGFCbG9jayA9IF9yZWZbJ2RhdGEtYmxvY2snXTtcbiAgdmFyIHByb3BzID0gYmFiZWxIZWxwZXJzLm9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsnZGF0YS1ibG9jayddKTtcblxuICB2YXIgY29kZSA9IEpTT04uc3RyaW5naWZ5KHByb3BzLCB7IHNwYWNlOiAnXFx0JyB9KTtcblxuICByZXR1cm4gUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAnZGl2JyxcbiAgICB7ICdkYXRhLWJsb2NrJzogZGF0YUJsb2NrLCBzdHlsZTogc3R5bGUkMS53cmFwcGVyIH0sXG4gICAgUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICdkaXYnLFxuICAgICAgbnVsbCxcbiAgICAgICdTb3JyeSBidXQgSSBkb25cXCd0IGtub3cgaG93IHRvIHJlbmRlciB0aGlzIGJsb2NrIDovJ1xuICAgICksXG4gICAgUmVhY3RfX2RlZmF1bHQuY3JlYXRlRWxlbWVudChDb2RlLCB7IGNvZGU6IGNvZGUsIGd1dHRlcjogZmFsc2UsIHJlYWRPbmx5OiB0cnVlLCBoaWdobGlnaHRBY3RpdmVMaW5lOiBmYWxzZSwgc3R5bGU6IHN0eWxlJDEuY29kZSB9KVxuICApO1xufSlcblxudmFyIHN0eWxlJDEgPSB7XG4gIGNvZGU6IHtcbiAgICBtYXJnaW5Ub3A6IDEwXG4gIH0sXG4gIHdyYXBwZXI6IHtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMzIzMjMyJyxcbiAgICBjb2xvcjogJ3doaXRlJyxcbiAgICBmb250U2l6ZTogMTIsXG4gICAgcGFkZGluZzogMjBcbiAgfVxufTtcblxudmFyIF9WZXJ0aWNhbCA9IGNyZWF0ZUdyb3VwKCdWZXJ0aWNhbCcsIHsgZmxleERpcmVjdGlvbjogJ2NvbHVtbicgfSk7XG5cbnZhciB3aGl0ZWxpc3QgPSBbJ2F1dG9wYXVzZScsICdhdXRvcGxheScsICdieWxpbmUnLCAnY29sb3InLCAnaGVpZ2h0JywgJ2xvb3AnLCAnbWF4aGVpZ2h0JywgJ21heHdpZHRoJywgJ3BvcnRyYWl0JywgJ3RpdGxlJywgJ3dpZHRoJ107XG5cbmZ1bmN0aW9uIGFzUGFyYW1zKHBhcmFtcykge1xuICByZXR1cm4gT2JqZWN0LmtleXMocGFyYW1zKS5tYXAoZnVuY3Rpb24gKGspIHtcbiAgICByZXR1cm4gayArICc9JyArIHBhcmFtc1trXTtcbiAgfSkuam9pbignJicpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTcmMocHJvcHMpIHtcbiAgdmFyIHZpZGVvID0gcHJvcHMudmlkZW87XG4gIHZhciByZXN0ID0gYmFiZWxIZWxwZXJzLm9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHByb3BzLCBbJ3ZpZGVvJ10pO1xuXG5cbiAgdmFyIGNvbmZpZyA9IHtcbiAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICBieWxpbmU6IGZhbHNlLFxuICAgIHRpdGxlOiBmYWxzZSxcbiAgICB1cmw6ICdodHRwcyUzQS8vdmltZW8uY29tLycgKyB2aWRlbyxcbiAgICB3aWR0aDogMzYwXG4gIH07XG5cbiAgT2JqZWN0LmtleXMocmVzdCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKHdoaXRlbGlzdC5pbmRleE9mKGtleSkgPiAtMSkge1xuICAgICAgY29uZmlnW2tleV0gPSByZXN0W2tleV07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gJ2h0dHBzOi8vdmltZW8uY29tL2FwaS9vZW1iZWQuanNvbj8nICsgYXNQYXJhbXMoY29uZmlnKTtcbn1cblxudmFyIF9WaW1lbyA9IChmdW5jdGlvbiAocHJvcHMpIHtcbiAgcmV0dXJuIFJlYWN0X19kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoRW1iZWQsIGJhYmVsSGVscGVycy5leHRlbmRzKHsgc3JjOiBjcmVhdGVTcmMocHJvcHMpIH0sIHByb3BzKSk7XG59KVxuXG5leHBvcnRzLkNvZGUgPSBDb2RlO1xuZXhwb3J0cy5FbWJlZCA9IEVtYmVkO1xuZXhwb3J0cy5Ib3Jpem9udGFsID0gX0hvcml6b250YWw7XG5leHBvcnRzLkltYWdlID0gSW1hZ2U7XG5leHBvcnRzLklucHV0ID0gSW5wdXQ7XG5leHBvcnRzLktub2NraW5nID0gS25vY2tpbmc7XG5leHBvcnRzLkxpc3QgPSBMaXN0O1xuZXhwb3J0cy5QcmV2aWV3ID0gUHJldmlldztcbmV4cG9ydHMuVGV4dCA9IFRleHQ7XG5leHBvcnRzLlVua25vd24gPSBfVW5rbm93bjtcbmV4cG9ydHMuVmVydGljYWwgPSBfVmVydGljYWw7XG5leHBvcnRzLlZpbWVvID0gX1ZpbWVvOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxuZnVuY3Rpb24gX2ludGVyb3BEZWZhdWx0IChleCkgeyByZXR1cm4gKGV4ICYmICh0eXBlb2YgZXggPT09ICdvYmplY3QnKSAmJiAnZGVmYXVsdCcgaW4gZXgpID8gZXhbJ2RlZmF1bHQnXSA6IGV4OyB9XG5cbnZhciBwYW5lbHNVaSA9IHJlcXVpcmUoJ3BhbmVscy11aScpO1xudmFyIHVzZXBhZ2VzQmxvY2tzID0gcmVxdWlyZSgndXNlcGFnZXMtYmxvY2tzJyk7XG52YXIgUmVhY3QgPSBfaW50ZXJvcERlZmF1bHQocmVxdWlyZSgncmVhY3QnKSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG52YXIgQ29udGVudCA9IGZ1bmN0aW9uIENvbnRlbnQoX3JlZikge1xuICB2YXIgY29udGVudCA9IF9yZWYuY29udGVudDtcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgcGFuZWxzVWkuUGFuZWwsXG4gICAgeyBzdHlsZTogeyBiYWNrZ3JvdW5kQ29sb3I6ICcjMDAwMDAwJywgY29sb3I6ICcjZmZmZmZmJywgZm9udEZhbWlseTogJ3NhbnMtc2VyaWYnLCBmb250U2l6ZTogMTI1LCBwYWRkaW5nOiAyMCB9IH0sXG4gICAgY29udGVudCxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgcGFuZWxzVWkuVGVsZXBvcnQsXG4gICAgICB7IHN0eWxlOiBzdHlsZUFjdGlvbiwgdG86ICdodHRwOi8vbm90ZXMuZGV2L25vdGUtMScgfSxcbiAgICAgICdOb3RlIDEnXG4gICAgKSxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgcGFuZWxzVWkuVGVsZXBvcnQsXG4gICAgICB7IHN0eWxlOiBzdHlsZUFjdGlvbiwgdG86ICdodHRwOi8vbm90ZXMuZGV2L25vdGUtMicgfSxcbiAgICAgICdOb3RlIDInXG4gICAgKVxuICApO1xufTtcblxudmFyIExhdW5jaHBhZCA9IGZ1bmN0aW9uIExhdW5jaHBhZChfcmVmMikge1xuICB2YXIgX3JlZjIkcGFuZWxzID0gX3JlZjIucGFuZWxzO1xuICB2YXIgcm91dGVyID0gX3JlZjIkcGFuZWxzLnJvdXRlcjtcbiAgdmFyIHJ1bnRpbWUgPSBfcmVmMiRwYW5lbHMucnVudGltZTtcbiAgdmFyIF9yb3V0ZXIkcm91dGVzJGl0ZW1zID0gcm91dGVyLnJvdXRlcy5pdGVtcztcbiAgdmFyIF9yb3V0ZXIkcm91dGVzJGl0ZW1zJCA9IF9yb3V0ZXIkcm91dGVzJGl0ZW1zWzBdO1xuICB2YXIgbEN0eCA9IF9yb3V0ZXIkcm91dGVzJGl0ZW1zJCA9PT0gdW5kZWZpbmVkID8gJycgOiBfcm91dGVyJHJvdXRlcyRpdGVtcyQ7XG4gIHZhciBfcm91dGVyJHJvdXRlcyRpdGVtcyQyID0gX3JvdXRlciRyb3V0ZXMkaXRlbXNbMV07XG4gIHZhciBtQ3R4ID0gX3JvdXRlciRyb3V0ZXMkaXRlbXMkMiA9PT0gdW5kZWZpbmVkID8gJycgOiBfcm91dGVyJHJvdXRlcyRpdGVtcyQyO1xuICB2YXIgX3JvdXRlciRyb3V0ZXMkaXRlbXMkMyA9IF9yb3V0ZXIkcm91dGVzJGl0ZW1zWzJdO1xuICB2YXIgZEN0eCA9IF9yb3V0ZXIkcm91dGVzJGl0ZW1zJDMgPT09IHVuZGVmaW5lZCA/ICcnIDogX3JvdXRlciRyb3V0ZXMkaXRlbXMkMztcblxuICB2YXIgYmFzZSA9IG1DdHgucmVwbGFjZShsQ3R4LCAnJyk7XG5cbiAgdmFyIG5vdGVzID0gYmFzZSArICdodHRwOi8vbm90ZXMuZGV2Lyc7XG4gIHZhciB0b2MgPSBiYXNlICsgJ2h0dHA6Ly90b2MuZGV2Lyc7XG5cbiAgaWYgKGRDdHguaW5kZXhPZihub3RlcykgIT09IC0xKSB7XG4gICAgbm90ZXMgPSBiYXNlO1xuICB9XG4gIGlmIChkQ3R4LmluZGV4T2YodG9jKSAhPT0gLTEpIHtcbiAgICB0b2MgPSBiYXNlO1xuICB9XG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgdXNlcGFnZXNCbG9ja3MuSG9yaXpvbnRhbCxcbiAgICB7IHN0eWxlOiB7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB6SW5kZXg6IDEgfSB9LFxuICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICB1c2VwYWdlc0Jsb2Nrcy5Ib3Jpem9udGFsLFxuICAgICAge1xuICAgICAgICBzdHlsZTogX2V4dGVuZHMoe30sIHN0eWxlTmV4dCwge1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIHRvcDogJ2NhbGMoMTAwdmggLSAnICsgKFNJWkUgKyAyMCkgKyAncHgpJyxcbiAgICAgICAgICBsZWZ0OiAyMFxuICAgICAgICB9KSxcbiAgICAgICAgc3R5bGVBY3RpdmU6IHN0eWxlTmV4dEFjdGl2ZSxcbiAgICAgICAgc3R5bGVIb3Zlcjogc3R5bGVOZXh0QWN0aXZlLFxuICAgICAgICB0ZWxlcG9ydFRvOiB0b2NcbiAgICAgIH0sXG4gICAgICAnVG9jJ1xuICAgICksXG4gICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgIHVzZXBhZ2VzQmxvY2tzLkhvcml6b250YWwsXG4gICAgICB7XG4gICAgICAgIHN0eWxlOiBfZXh0ZW5kcyh7fSwgc3R5bGVOZXh0LCB7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgbGVmdDogJ2NhbGMoMTAwdncgLSAnICsgKFNJWkUgKyAyMCkgKyAncHgpJyxcbiAgICAgICAgICB0b3A6ICdjYWxjKDEwMHZoIC0gJyArIChTSVpFICsgMjApICsgJ3B4KSdcbiAgICAgICAgfSksXG4gICAgICAgIHN0eWxlQWN0aXZlOiBzdHlsZU5leHRBY3RpdmUsXG4gICAgICAgIHN0eWxlSG92ZXI6IHN0eWxlTmV4dEFjdGl2ZSxcbiAgICAgICAgdGVsZXBvcnRUbzogbm90ZXNcbiAgICAgIH0sXG4gICAgICAnTm90ZXMnXG4gICAgKVxuICApO1xufTtcblxudmFyIHR5cGVzID0ge1xuICAnQ29udGVudCc6IHBhbmVsc1VpLndyYXAoQ29udGVudCksXG4gICdMYXVuY2hwYWQnOiBwYW5lbHNVaS53cmFwKExhdW5jaHBhZClcbn07XG5cbnZhciBwYW5lbHMgPSB7XG4gICcvJzoge1xuICAgIGRlZmF1bHQ6IGZ1bmN0aW9uIF9kZWZhdWx0KCkge1xuICAgICAgcmV0dXJuICdjb3Zlcic7XG4gICAgfSxcbiAgICBzdHlsZToge1xuICAgICAgb3ZlcmZsb3dZOiAnbm9uZScsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHpJbmRleDogMVxuICAgIH0sXG4gICAgdHlwZTogJ0xhdW5jaHBhZCdcbiAgfSxcbiAgJy86Y29udGVudCc6IHtcbiAgICB0eXBlOiAnQ29udGVudCcsXG4gICAgd2lkdGg6ICcxMDAlJ1xuICB9XG59O1xuXG52YXIgbG9va3VwID0gWycvOmNvbnRlbnQnXTtcblxudmFyIFNJWkUgPSA2NDtcblxudmFyIHN0eWxlQWN0aW9uID0ge1xuICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjBmMGYwJyxcbiAgYm9yZGVyUmFkaXVzOiA1LFxuICBjb2xvcjogJyMwMDAwMDAnLFxuICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgZm9udEZhbWlseTogJ3NhbnMtc2VyaWYnLFxuICBmb250U2l6ZTogMjAsXG4gIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgbWFyZ2luOiAyLjUsXG4gIHBhZGRpbmc6ICcxMHB4IDIwcHgnLFxuICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJ1xufTtcbnZhciBzdHlsZU5leHQgPSB7XG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICBiYWNrZ3JvdW5kQ29sb3I6ICcjNWViNzVlJyxcbiAgYm9yZGVyUmFkaXVzOiBTSVpFLFxuICBib3hTaGFkb3c6ICcwcHggMHB4IDEwcHggdHJhbnNwYXJlbnQnLFxuICBjb2xvcjogJyNmZmZmZmYnLFxuICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgZm9udEZhbWlseTogJ3NhbnMtc2VyaWYnLFxuICBmb250U2l6ZTogMTYsXG4gIGhlaWdodDogU0laRSxcbiAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICBtYXJnaW46IDIuNSxcbiAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgdGV4dERlY29yYXRpb246ICdub25lJyxcbiAgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScsXG4gIHdpZHRoOiBTSVpFXG59O1xudmFyIHN0eWxlTmV4dEFjdGl2ZSA9IHtcbiAgYm94U2hhZG93OiAnMHB4IDBweCAxMHB4ICNmMmYyZjInXG59O1xuXG5leHBvcnRzLnR5cGVzID0gdHlwZXM7XG5leHBvcnRzLnBhbmVscyA9IHBhbmVscztcbmV4cG9ydHMubG9va3VwID0gbG9va3VwOyJdfQ==
