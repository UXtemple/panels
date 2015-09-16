import { NAVIGATE, navigate } from '../actions';
import test from 'tape';

const URI = '/';

test('#navigate', t => {
  const {type, payload} = navigate(URI);
  t.equals(type, NAVIGATE, 'type');
  t.deepEquals(payload, {uri: URI}, 'payload');
  t.end();
});
