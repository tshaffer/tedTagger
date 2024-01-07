import { isNil } from 'lodash';
import {
  Keyword,
  KeywordNode,
  KeywordNodeDeep,
  KeywordsState,
  KeywordTreeDeep,
  TedTaggerState,
} from '../types';

export function getKeywordRootNodeId(tedTaggerState: TedTaggerState): string {
  return tedTaggerState.keywordsState.keywordRootNodeId;
}

export function getNodeByNodeId(keywordsState: KeywordsState, nodeId: string): KeywordNode | undefined {
  return keywordsState.keywordNodesByNodeId[nodeId];
}

export function getKeywordsAsTree(tedTaggerState: TedTaggerState): any {
  if (!tedTaggerState.appState.appInitialized) {
    return 'uninitialized';
  }
  debugger;
  const keywordsState: KeywordsState = tedTaggerState.keywordsState;
  const keywordRootNodeId: string = keywordsState.keywordRootNodeId;
  const keywordRootNode: KeywordNode | undefined = getNodeByNodeId(keywordsState, keywordRootNodeId);
  if (!isNil(keywordRootNode)) {
    const deepKeywordTree: KeywordTreeDeep = {
      root: {
        nodeId: keywordRootNode.nodeId,
        keywordId: keywordRootNode.keywordId,
        childNodeIds: keywordRootNode.childrenNodeIds || [],
      }
    };
    recursiveBuildTree(keywordsState, deepKeywordTree, keywordRootNode);
  }

  return 'pizza';
}

function recursiveBuildTree(keywordsState: KeywordsState, deepKeywordTree: KeywordTreeDeep, parentNode: KeywordNode): void {
  if (parentNode.childrenNodeIds && parentNode.childrenNodeIds.length > 0) {
    for (const childNodeId of parentNode.childrenNodeIds) {
      const childNode: KeywordNode | undefined = getNodeByNodeId(keywordsState, childNodeId);
      if (!isNil(childNode)) {

        const keyword: Keyword = keywordsState.keywordsById[childNode.keywordId];
        console.log('Keyword: ', keyword.label);

        recursiveBuildTree(keywordsState, deepKeywordTree, childNode);
      }
    }
    // debugger;
  }
}
