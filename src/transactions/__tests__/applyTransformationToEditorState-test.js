import { EditorState, ContentState } from 'draft-js';
import Transformation from '../../immutable/Transformation';
import applyTransformationToEditorState from '../applyTransformationToEditorState';
import test from 'ava';

const getEditorStateFromText = (text) => (
  EditorState.createWithContent(
    ContentState.createFromText(text)
  )
);

test('it applies a text insertion', t => {
  t.is(
    applyTransformationToEditorState(
      new Transformation().retain(5).insert(' there'),
      getEditorStateFromText('Hello')
    ).getCurrentContent().getPlainText(),
    'Hello there'
  );
});

test('it applies a text deletion', t => {
  t.is(
    applyTransformationToEditorState(
      new Transformation().retain(5).delete(6),
      getEditorStateFromText('Hello there')
    ).getCurrentContent().getPlainText(),
    'Hello'
  );
});
