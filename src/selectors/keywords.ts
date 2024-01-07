import {
  KeywordNode,
  KeywordsState,
  TedTaggerState,
} from '../types';

export function getKeywordRootNodeId(tedTaggerState: TedTaggerState): string {
  return tedTaggerState.keywordsState.keywordRootNodeId;
}

export function findNodeByNodeId(keywordsState: KeywordsState, nodeId: string): KeywordNode | undefined {
  return keywordsState.keywordNodesByNodeId[nodeId];
}
