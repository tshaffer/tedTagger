import {
  KeywordNode,
  KeywordTree,
  KeywordsState,
  TedTaggerState,
} from '../types';

export function getRootNodeId(tedTaggerState: TedTaggerState): string {
  return tedTaggerState.keywordsState.rootNodeId;
}

export function findNodeByNodeId(keywordsState: KeywordsState, keywordNode: KeywordNode, nodeId: string): KeywordNode | undefined {

  console.log('findNodeById');
  console.log('keywordNode: ', keywordNode.nodeId);
  console.log('nodeId: ', nodeId);

  if (keywordNode.nodeId === nodeId) {
    return keywordNode;
  }

  if (keywordNode.childrenNodeIds) {
    for (const childId of keywordNode.childrenNodeIds) {
      if (keywordsState.keywordNodesByNodeId[childId]) {
        return keywordsState.keywordNodesByNodeId[childId];
      }
      return findNodeByNodeId(keywordsState, keywordNode, childId);
      // if (childNode) {
      //   return childNode;
      // }
    }
  }

  return undefined;
}

