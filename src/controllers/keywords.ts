import { v4 as uuidv4 } from 'uuid';

import { addKeywordRedux } from '../models';
import { KeywordNode } from '../types';

export function addKeyword(parentKeywordId: string, keyword: string): any {
  const keywordNode: KeywordNode = {
    id: uuidv4(),
    keywordId: uuidv4(),
    parentNodeId: parentKeywordId,
    childrenNodeIds: []
  };
  return addKeywordRedux(parentKeywordId, keywordNode);
}
