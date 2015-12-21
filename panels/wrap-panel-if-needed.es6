import Panel from './panel';
import React from 'react';

const WrapPanelIfNeeded = props => {
  const {shouldWrap, ...rest} = props;
  const panel = <Panel {...rest} />;

  return shouldWrap ? (
    <div style={{...style, width: props.width}}>
      {panel}
    </div>
  ) : panel;
};
export default WrapPanelIfNeeded;

const style = {
  flex: 1,
  WebkitFlex: 1,
  overflowY: 'auto'
};
