import type { EditorState } from 'draft-js';
import * as jsDiff from 'diff';
import Transformation from '../immutable/Transformation';

const generateTextTransformationForEditorState = (
  previousEditorState: EditorState,
  editorState: EditorState
) => {
  const previousText = previousEditorState.getCurrentContent().getPlainText();
  const currentText = editorState.getCurrentContent().getPlainText();
  const differences = jsDiff.diffChars(previousText, currentText);
  return differences.reduce((transformation, diff) => {
    if (diff.added) {
      return transformation.insert(diff.value);
    }
    if (diff.removed) {
      return transformation.delete(diff.count);
    }
    return transformation.retain(diff.count);
  }, new Transformation());
};

export default generateTextTransformationForEditorState;
