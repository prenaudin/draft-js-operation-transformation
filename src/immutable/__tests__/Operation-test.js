import { Map } from 'immutable';
import Operation from '../Operation';
import test from 'ava';

test('it creates an empty transformation', t => {
  t.is(new Operation().get('type'), 'insert');
  t.is(new Operation().get('numOfChars'), 0);
  t.is(new Operation().get('text'), '');
  t.is(new Operation().get('attributes'), Map());
});

test('it stringifies an operation', t => {
  t.is(
    new Operation({ type: 'insert', numOfChars: 3, text: 'Hell' }).toString(),
    'insert Hell'
  );
  t.is(
    new Operation({ type: 'delete', numOfChars: 5 }).toString(),
    'delete 5'
  );
  t.is(
    new Operation({ type: 'retain', numOfChars: 8 }).toString(),
    'retain 8'
  );
});
