import { PropTypes } from 'react';

export default PropTypes.shape({
  app: PropTypes.string.isRequired,
  context: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired
});
