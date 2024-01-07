import { v4 as uuidv4 } from 'uuid';

import { TedTaggerDispatch, addKeywordNode, addKeywordRedux } from '../models';
import { KeywordNode } from '../types';

export function addKeyword(parentNodeId: string, keywordLabel: string, keywordType: string): any {
  return (dispatch: TedTaggerDispatch, getState: any) => {

    const newKeywordId = uuidv4();

    dispatch(addKeywordRedux(newKeywordId, keywordLabel, keywordType));

    const keywordNode: KeywordNode = {
      nodeId: uuidv4(),
      keywordId: newKeywordId,
      parentNodeId,
      childrenNodeIds: []
    };
    dispatch(addKeywordNode(parentNodeId, keywordNode));

    return keywordNode;
  };
}
