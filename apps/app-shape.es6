import { PropTypes } from 'react';

export default PropTypes.shape({
  isLoading: PropTypes.bool,
  isReady: PropTypes.bool,
  store: PropTypes.shape({
    dispatch: PropTypes.func,
    getState: PropTypes.func
  })
})
