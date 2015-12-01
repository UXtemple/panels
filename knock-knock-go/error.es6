import React from 'react';

const ErrorComponent = props => (
  <div style={style.wrapper}>
    {props.message.message}
    {props.message.stack.split('\n').map(line => <div>{line}</div>)}
  </div>
);

const style = {
  wrapper: {
    margin: 50
  }
}

export default ErrorComponent;
