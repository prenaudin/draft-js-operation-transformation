/* flow */
import Transformation from '../immutable/Transformation';
import { EditorState, Modifier, SelectionState, ContentState } from 'draft-js';

const getSelectionStateForOffset = (
  contentState: ContentState,
  offset: number
) => {
  let blockOffset = 0;
  let selectionState;
  contentState.getBlockMap().forEach((contentBlock) => {
    const blockLength = contentBlock.getText().length + 1;
    if (blockOffset <= offset && offset < blockLength) {
      selectionState = SelectionState
        .createEmpty(contentBlock.getKey())
        .set('anchorOffset', offset - blockOffset)
        .set('focusOffset', offset - blockOffset);
    }
    blockOffset += blockLength;
  });
  return selectionState;
};

const applyTransformationToEditorState = (
  transformation: Transformation,
  editorState: EditorState
) : EditorState => {
  const contentState = editorState.getCurrentContent();
  let offset = 0;
  const operations = transformation.get('operations');
  const newContentState = operations.reduce((memoContentState, operation) => {
    const selectionState = getSelectionStateForOffset(memoContentState, offset);
    const focusOffsetRemoval = selectionState.get('focusOffset') + operation.get('numOfChars');
    switch (operation.get('type')) {
      case 'insert':
        offset += operation.get('numOfChars');
        return Modifier.insertText(
          memoContentState,
          selectionState,
          operation.get('text')
        );
      case 'retain':
        offset += operation.get('numOfChars');
        break;
      case 'delete':
        offset -= operation.get('numOfChars');
        return Modifier.removeRange(
          memoContentState,
          selectionState.set('focusOffset', focusOffsetRemoval),
          'backward'
        );
      default:
        return memoContentState;
    }
    return memoContentState;
  }, contentState);

  const newEditorState = EditorState.push(
    editorState,
    newContentState,
    'apply-transformation'
  );

  return newEditorState;
};

export default applyTransformationToEditorState;
