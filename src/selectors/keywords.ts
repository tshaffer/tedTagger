import {
  KeywordNode,
  KeywordsState,
  TedTaggerState,
} from '../types';

export function getRootNodeId(tedTaggerState: TedTaggerState): string {
  return tedTaggerState.keywordsState.rootNodeId;
}

export function findNodeByNodeId(keywordsState: KeywordsState, nodeId: string): KeywordNode | undefined {
  return keywordsState.keywordNodesByNodeId[nodeId];
}
