/* @flow */

import type { OperationType } from './OperationType';
import type { AttributeType } from './AttributeType';
import { Record, Map } from 'immutable';

const defaultRecord: {
  type: OperationType,
  numOfChars: number,
  text: string,
  attributes: Map<AttributeType, any>,
} = {
  type: 'insert',
  numOfChars: 0,
  text: '',
  attributes: new Map(),
};

const OperationRecord = Record(defaultRecord);

class Operation extends OperationRecord {
  isInsert() {
    return this.get('type') === 'insert';
  }

  isRetain() {
    return this.get('type') === 'retain';
  }

  isDelete() {
    return this.get('type') === 'delete';
  }

  toString() {
    return `${this.get('type')} ${this.get('text') || this.get('numOfChars')}`;
  }
}

export default Operation;
