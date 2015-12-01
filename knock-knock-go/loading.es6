import React from 'react';

const Loading = props => (
  <div style={style.wrapper}>
    <style>
    {`@keyframes scaleout {
      0% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
      } 100% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
        opacity: 0;
      }
    }`}
    </style>
    <div style={style.pulse} />
  </div>
);

const style = {
  wrapper: {
    animation: 'fade-in 2s',
    marginTop: 50
  },
  pulse: {
    animation: 'scaleout 1.0s infinite ease-in-out',
    backgroundColor: '#333',
    borderRadius: '100%',
    height: 32,
    width: 32
  }
}

export default Loading;
