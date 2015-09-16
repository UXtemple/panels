import include from '../include';
import test from 'tape';

test('#include', t => {
  t.deepEquals(
    include(1, []),
    [1],
    'adds an element to an empty list'
  );

  t.deepEquals(
    include(1, [2, 3]),
    [2, 3, 1],
    'always adds elements at the end'
  );

  t.deepEquals(
    include(1, [1]),
    [1],
    'doesn\'t add duplicates'
  );

  t.end();
});
