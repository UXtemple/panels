import { connect } from 'react-redux';
import { flexDirectionRow } from 'browser-vendor-prefix';
import { reset } from '../runtime/actions';
import WrapPanelIfNeeded from './wrap-panel-if-needed';
import React from 'react';

// TODO isVisible is also a "do I fit on the viewport" calc
const Panels = props => {
  const finalStyle = {
    ...style,
    paddingLeft: props.snapPoint,
    width: props.width
  };

  return (
    <div style={finalStyle}>
      {props.routes.map((route, i) => (
        <WrapPanelIfNeeded
          isContext={i >= props.context}
          isFocus={i === props.focus}
          isVisible={route.visible}
          key={route.context}
          route={route}
          shouldWrap={i === props.routes.length - 1}
          width={props.widths[i]} />
      ))}
    </div>
  );
}
export default Panels;

const style = {
  ...flexDirectionRow,
  height: '100vh'
};

function mapStateToProps(state, props) {
  const { router, runtime } = state;

  return {
    context: router.context,
    focus: router.focus,
    routes: router.routes,
    snapPoint: runtime.snapPoint,
    width: runtime.width,
    widths: runtime.widths
  };
}
export default connect(mapStateToProps)(Panels);
