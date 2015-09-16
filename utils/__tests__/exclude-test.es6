import exclude from '../exclude';
import test from 'tape';

test('#exclude', t => {
  t.deepEquals(
    exclude(2, [1]),
    [1],
    'returns the same list if it doesn\'t belong to it'
  );

  t.deepEquals(
    exclude(1, [1, 2, 3]),
    [2, 3],
    'excludes the element'
  );

  t.end();
});
