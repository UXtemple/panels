import React from 'react';

const DisplayError = props => {
  console.error('DisplayError', props.error);

  return (
    <div style={style.wrapper}>
      <div style={style.line}>Something bad happened. Sorry.</div>
      {
        props.error && (
          <div>
            <div style={style.line}>{props.error.message}</div>
            {props.error.stack && props.error.stack.split("\n").map((line, i) => <div key={i} style={style.line}>{line.toString()}</div>)}
          </div>
        )
      }
      <div style={style.line}>The error is also logged on the console.</div>
      <div style={style.line}>You can click to the source from there.</div>
    </div>
  );
};
export default DisplayError;

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
