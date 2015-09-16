import { connect } from 'react-redux';
import Component from './component';

function mapStateToProps(state, ownProps) {
  return state.pages[ownProps.page];
}

export default connect(mapStateToProps)(Component);
