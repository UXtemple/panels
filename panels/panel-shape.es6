import { PropTypes } from 'react';

export default PropTypes.shape({
  isLoading: PropTypes.bool,
  isReady: PropTypes.bool,
  props: PropTypes.object,
  title: PropTypes.string,
  Type: PropTypes.func
});
