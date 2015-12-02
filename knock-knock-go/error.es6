import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import React from 'react';
import ParsedErrorTrace from 'stacktrace-js';
import withState from 'recompose/withState';

const ErrorComponent = props => (
  <div style={style.wrapper}>
    <div style={style.line}>
      Something bad happened.
      Sorry.
    </div>
    <div style={style.line}>{props.message.message}</div>
    {props.parsedError.map((line, i) => <div key={i} style={style.line}>{line.toString()}</div>)}
    <div style={style.line}>The error is also logged on the console.</div>
    <div style={style.line}>You can click to the source from there.</div>
  </div>
);

const ParsedErrorTraceComponent = compose(
  withState('parsedError', 'setParsedError', ['Loading error...']),
  lifecycle(
    component => {
      const set = err => component.props.setParsedError(_ => {
        console.error('[original error]', component.props.message);
        const parsedError = typeof err.stack === 'undefined' ? err : err.stack.split('\n');
        console.error('[parsed error]', parsedError.toString());
        return parsedError;
      });
      ParsedErrorTrace.fromError(component.props.message).then(set).catch(set);
    },
    _ => _
  )
)(ErrorComponent);

const style = {
  line: {
    marginTop: 10
  },
  wrapper: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 12,
    margin: 50,
    width: 360
  }
}

export default ParsedErrorTraceComponent;
