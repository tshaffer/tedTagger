import { v4 as uuidv4 } from 'uuid';

import { addKeywordRedux } from '../models';
import { KeywordNode } from '../types';

export function addKeyword(parentKeywordId: string, keyword: string): any {
  const keywordNode: KeywordNode = {
    value: {
      id: uuidv4(),
      label: keyword,
    }
  };
  
  return addKeywordRedux(parentKeywordId, keywordNode);
}
