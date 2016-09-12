import Transformation from '../Transformation';
import test from 'ava';

test('it creates an empty transformation', t => {
  t.is(new Transformation().get('operations').size, 0);
});

test('it stringifies a transformation', t => {
  t.is(
    new Transformation()
      .insert('Hell')
      .retain(8)
      .delete(1)
      .toString(),
    'insert Hell,retain 8,delete 1,'
  );
});
