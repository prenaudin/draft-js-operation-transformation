/* @flow */

import Operation from './Operation';
import { Record, List } from 'immutable';

const defaultRecord: {
  operations: List<Operation>
} = {
  operations: new List(),
};

const TransformationRecord = Record(defaultRecord);

class Transformation extends TransformationRecord {
  insert(text) {
    return this.update('operations', (operations) => (
      operations.push(new Operation({ type: 'insert', text, numOfChars: text.length }))
    ));
  }

  retain(numOfChars) {
    return this.update('operations', (operations) => (
      operations.push(new Operation({ type: 'retain', numOfChars }))
    ));
  }

  delete(numOfChars) {
    return this.update('operations', (operations) => (
      operations.push(new Operation({ type: 'delete', numOfChars }))
    ));
  }

  toString() {
    return this.get('operations').reduce((memo, operation) => (
      `${memo}${operation.toString()},`
    ), '');
  }
}

module.exports = Transformation;
