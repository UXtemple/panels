import React from 'react';

const KnownError = props => (
  <div>{props.status}</div>
);

const UnknownError = props => {
  console.error(component.props.message);

  return (
    <div style={style.wrapper}>
      <div style={style.line}>
        Something bad happened.
        Sorry.
      </div>
      <div style={style.line}>{props.message.message}</div>
      {props.message.stack.split("\n").map((line, i) => <div key={i} style={style.line}>{line.toString()}</div>)}
      <div style={style.line}>The error is also logged on the console.</div>
      <div style={style.line}>You can click to the source from there.</div>
    </div>
  );
}

const ErrorComponent = props => props.message.status ?
  <KnownError status={props.message.status} /> :
  <UnknownError {...props} />;

const style = {
  line: {
    marginTop: 10
  },
  wrapper: {
    fontFamily: 'sans-serif',
    fontSize: 12,
    margin: 50,
    width: 360
  }
};

export default ErrorComponent;
