import { EditorState, ContentState } from 'draft-js';
import generateTextTransformationForEditorState from '../generateTextTransformationForEditorState';
import test from 'ava';

const getEditorStateFromText = (text) => (
  EditorState.createWithContent(
    ContentState.createFromText(text)
  )
);

test('it generates an insert transformation', t => {
  t.is(
    generateTextTransformationForEditorState(
      getEditorStateFromText('Hello'),
      getEditorStateFromText('Hello!')
    ).toString(),
    'retain 5,insert !,'
  );
});

test('it generates a delete transformation', t => {
  t.is(
    generateTextTransformationForEditorState(
      getEditorStateFromText('Hello!'),
      getEditorStateFromText('Hello')
    ).toString(),
    'retain 5,delete 1,'
  );
});

test('it generates a word insertion in the middle of a text', t => {
  t.is(
    generateTextTransformationForEditorState(
      getEditorStateFromText('Hello there'),
      getEditorStateFromText('Hello, are you there')
    ).toString(),
    'retain 5,insert ,,retain 1,insert are you ,retain 5,'
  );
});

test('it generates a space insertion transformation', t => {
  t.is(
    generateTextTransformationForEditorState(
      getEditorStateFromText('Hello there '),
      getEditorStateFromText('Hello there  ')
    ).toString(),
    'retain 12,insert  ,'
  );
});
