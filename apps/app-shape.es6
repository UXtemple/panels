import { PropTypes } from 'react';

export default {
  error: PropTypes.bool,
  isLoading: PropTypes.bool,
  isReady: PropTypes.bool,
  store: PropTypes.shape({
    dispatch: PropTypes.func,
    getState: PropTypes.func
  })
}
