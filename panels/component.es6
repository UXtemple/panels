import { connect } from 'react-redux';
import { reset } from '../runtime/actions';
import Panel from './panel';
import React from 'react';

const Panels = props => {
  const finalStyle = {
    ...style,
    paddingLeft: props.snapPoint,
    width: props.width
  };

  return (
    <div style={finalStyle}>
      {props.routes.map((route, i) => <Panel key={i} route={route} width={props.widths[i]} />)}
    </div>
  );
}
export default Panels;

const style = {
  flexDirection: 'row',
  msFlexDirection: 'row',
  WebkitBoxOrient: 'horizontal',
  WebkitBoxDirection: 'normal',
  WebkitFlexDirection: 'row',
  height: '100vh'
};

function mapStateToProps(state, props) {
  const { router, runtime } = state;

  return {
    routes: router.routes,
    snapPoint: runtime.snapPoint,
    width: runtime.width,
    widths: runtime.widths
  };
}
export default connect(mapStateToProps)(Panels);
