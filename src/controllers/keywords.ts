import { v4 as uuidv4 } from 'uuid';

import { addKeywordRedux } from '../models';
import { KeywordNode } from '../types';

export function addKeyword(parentId: string, keyword: string): any {
  const keywordNode: KeywordNode = {
    id: uuidv4(),
    keywordId: uuidv4(),
    parentId,
    childrenIds: []
  };
  return addKeywordRedux(parentId, keywordNode);
}
