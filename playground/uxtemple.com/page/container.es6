import { connect } from 'react-redux';
import Component from './component';

function mapStateToProps(state, ownProps) {
  const page = state.pages[ownProps.page];
  return {
    blocks: (page && page.blocks) || []
  };
}

export default connect(mapStateToProps)(Component);
