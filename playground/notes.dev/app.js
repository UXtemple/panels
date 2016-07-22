require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"notes.dev":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var panelsUi = require('panels-ui');
var React = _interopDefault(require('react'));

var Notes = function Notes(_ref) {
  var note = _ref.note;
  var route = _ref.panels.route;
  return React.createElement(
    panelsUi.Panel,
    { style: { backgroundColor: '#00ff00', fontFamily: 'sans-serif', fontSize: 125, padding: 20, width: route.width } },
    'Notes',
    React.createElement(
      panelsUi.Teleport,
      { style: styleAction, to: '../content-1/note-1' },
      'Note 1 in Content 1'
    ),
    React.createElement(
      panelsUi.Teleport,
      { style: styleAction, to: '../content-1/note-2' },
      'Note 2 in Content 1'
    ),
    React.createElement(
      panelsUi.Teleport,
      { style: styleAction, to: '../content-2/note-3' },
      'Note 3 in Content 2'
    ),
    React.createElement(
      panelsUi.Teleport,
      { style: styleAction, to: '../content-2/note-4' },
      'Note 4 in Content 2'
    ),
    React.createElement(
      panelsUi.Teleport,
      { style: styleAction, to: '../content-2/note-5' },
      'Note 5 in Content 2'
    )
  );
};

var Note = function Note(_ref2) {
  var note = _ref2.note;
  var route = _ref2.panels.route;
  return React.createElement(
    panelsUi.Panel,
    { style: { backgroundColor: '#00ff00', fontFamily: 'sans-serif', fontSize: 125, padding: 20, width: route.width } },
    note
  );
};

var types = {
  'Note': panelsUi.wrap(Note),
  'Notes': panelsUi.wrap(Notes)
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
},{"panels-ui":"panels-ui","react":"react"}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwbGF5Z3JvdW5kL25vdGVzLmRldi9zcmMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wRGVmYXVsdCAoZXgpIHsgcmV0dXJuIChleCAmJiAodHlwZW9mIGV4ID09PSAnb2JqZWN0JykgJiYgJ2RlZmF1bHQnIGluIGV4KSA/IGV4WydkZWZhdWx0J10gOiBleDsgfVxuXG52YXIgcGFuZWxzVWkgPSByZXF1aXJlKCdwYW5lbHMtdWknKTtcbnZhciBSZWFjdCA9IF9pbnRlcm9wRGVmYXVsdChyZXF1aXJlKCdyZWFjdCcpKTtcblxudmFyIE5vdGVzID0gZnVuY3Rpb24gTm90ZXMoX3JlZikge1xuICB2YXIgbm90ZSA9IF9yZWYubm90ZTtcbiAgdmFyIHJvdXRlID0gX3JlZi5wYW5lbHMucm91dGU7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgIHBhbmVsc1VpLlBhbmVsLFxuICAgIHsgc3R5bGU6IHsgYmFja2dyb3VuZENvbG9yOiAnIzAwZmYwMCcsIGZvbnRGYW1pbHk6ICdzYW5zLXNlcmlmJywgZm9udFNpemU6IDEyNSwgcGFkZGluZzogMjAsIHdpZHRoOiByb3V0ZS53aWR0aCB9IH0sXG4gICAgJ05vdGVzJyxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgcGFuZWxzVWkuVGVsZXBvcnQsXG4gICAgICB7IHN0eWxlOiBzdHlsZUFjdGlvbiwgdG86ICcuLi9jb250ZW50LTEvbm90ZS0xJyB9LFxuICAgICAgJ05vdGUgMSBpbiBDb250ZW50IDEnXG4gICAgKSxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgcGFuZWxzVWkuVGVsZXBvcnQsXG4gICAgICB7IHN0eWxlOiBzdHlsZUFjdGlvbiwgdG86ICcuLi9jb250ZW50LTEvbm90ZS0yJyB9LFxuICAgICAgJ05vdGUgMiBpbiBDb250ZW50IDEnXG4gICAgKSxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgcGFuZWxzVWkuVGVsZXBvcnQsXG4gICAgICB7IHN0eWxlOiBzdHlsZUFjdGlvbiwgdG86ICcuLi9jb250ZW50LTIvbm90ZS0zJyB9LFxuICAgICAgJ05vdGUgMyBpbiBDb250ZW50IDInXG4gICAgKSxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgcGFuZWxzVWkuVGVsZXBvcnQsXG4gICAgICB7IHN0eWxlOiBzdHlsZUFjdGlvbiwgdG86ICcuLi9jb250ZW50LTIvbm90ZS00JyB9LFxuICAgICAgJ05vdGUgNCBpbiBDb250ZW50IDInXG4gICAgKSxcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgcGFuZWxzVWkuVGVsZXBvcnQsXG4gICAgICB7IHN0eWxlOiBzdHlsZUFjdGlvbiwgdG86ICcuLi9jb250ZW50LTIvbm90ZS01JyB9LFxuICAgICAgJ05vdGUgNSBpbiBDb250ZW50IDInXG4gICAgKVxuICApO1xufTtcblxudmFyIE5vdGUgPSBmdW5jdGlvbiBOb3RlKF9yZWYyKSB7XG4gIHZhciBub3RlID0gX3JlZjIubm90ZTtcbiAgdmFyIHJvdXRlID0gX3JlZjIucGFuZWxzLnJvdXRlO1xuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICBwYW5lbHNVaS5QYW5lbCxcbiAgICB7IHN0eWxlOiB7IGJhY2tncm91bmRDb2xvcjogJyMwMGZmMDAnLCBmb250RmFtaWx5OiAnc2Fucy1zZXJpZicsIGZvbnRTaXplOiAxMjUsIHBhZGRpbmc6IDIwLCB3aWR0aDogcm91dGUud2lkdGggfSB9LFxuICAgIG5vdGVcbiAgKTtcbn07XG5cbnZhciB0eXBlcyA9IHtcbiAgJ05vdGUnOiBwYW5lbHNVaS53cmFwKE5vdGUpLFxuICAnTm90ZXMnOiBwYW5lbHNVaS53cmFwKE5vdGVzKVxufTtcblxudmFyIHBhbmVscyA9IHtcbiAgJy8nOiB7XG4gICAgZG9ja0xlZnQ6IGZhbHNlLFxuICAgIHR5cGU6ICdOb3RlcycsXG4gICAgd2lkdGg6IDM2MFxuICB9LFxuICAnLzpub3RlJzoge1xuICAgIGRvY2tMZWZ0OiBmYWxzZSxcbiAgICB0eXBlOiAnTm90ZScsXG4gICAgd2lkdGg6IDM2MFxuICB9XG59O1xuXG52YXIgbG9va3VwID0gWycvOm5vdGUnXTtcblxudmFyIHN0eWxlQWN0aW9uID0ge1xuICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjBmMGYwJyxcbiAgYm9yZGVyUmFkaXVzOiA1LFxuICBjb2xvcjogJyMwMDAwMDAnLFxuICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgZm9udEZhbWlseTogJ3NhbnMtc2VyaWYnLFxuICBmb250U2l6ZTogMjAsXG4gIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgbWFyZ2luOiAyLjUsXG4gIHBhZGRpbmc6ICcxMHB4IDIwcHgnLFxuICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJ1xufTtcblxuZXhwb3J0cy50eXBlcyA9IHR5cGVzO1xuZXhwb3J0cy5wYW5lbHMgPSBwYW5lbHM7XG5leHBvcnRzLmxvb2t1cCA9IGxvb2t1cDsiXX0=
