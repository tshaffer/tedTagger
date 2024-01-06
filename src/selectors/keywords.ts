import {
  KeywordNode,
  KeywordTree,
  TedTaggerState,
} from '../types';

export const getKeywords = (state: TedTaggerState): KeywordTree => {
  return state.keywordsState.keywordsTree;
};

export function findNodeById(keywordNode: KeywordNode, id: string): KeywordNode | undefined {

  if (keywordNode.nodeId === id) {
    return keywordNode;
  }

  if (keywordNode.childrenIds) {
    for (const childId of keywordNode.childrenIds) {
      const childNode = findNodeById(keywordNode, childId);
      if (childNode) {
        return childNode;
      }
    }
  }

  return undefined;
}

