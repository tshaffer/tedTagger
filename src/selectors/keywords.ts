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
    debugger;
    const childNodeIds: string[] = keywordRootNode.childrenNodeIds || [];
    const childNodes: KeywordNodeDeep[] = childNodeIds.map((childNodeId: string) => {
      const childNode: KeywordNode | undefined = getNodeByNodeId(keywordsState, childNodeId);
      if (!isNil(childNode)) {
        const childNodeDeep: KeywordNodeDeep = {
          nodeId: childNode.nodeId,
          keywordId: childNode.keywordId,
          childNodeIds: childNode.childrenNodeIds || [],
          childNodes: [],
        };
        return childNodeDeep as KeywordNodeDeep;
      } else {
        debugger;
        return {
          nodeId: 'error',
          keywordId: 'error',
        } as KeywordNodeDeep;
      }
    });
    const rootKeywordNodeDeep: KeywordNodeDeep = {
      nodeId: keywordRootNode.nodeId,
      keywordId: keywordRootNode.keywordId,
      childNodeIds: keywordRootNode.childrenNodeIds || [],
      childNodes,
    };
    const deepKeywordTree: KeywordTreeDeep = {
      root: rootKeywordNodeDeep
    };
    recursiveBuildTree(keywordsState, deepKeywordTree, rootKeywordNodeDeep);
  }
  return 'pizza';
}


function recursiveBuildTree(keywordsState: KeywordsState, deepKeywordTree: KeywordTreeDeep, parentNodeDeep: KeywordNodeDeep): void {
  if (parentNodeDeep.childNodeIds && parentNodeDeep.childNodeIds.length > 0) {
    for (const childNodeId of parentNodeDeep.childNodeIds) {
      const childNode: KeywordNode | undefined = getNodeByNodeId(keywordsState, childNodeId);
      if (!isNil(childNode)) {

        const parentKeyword: Keyword = keywordsState.keywordsById[parentNodeDeep.keywordId];
        console.log('Parent keyword: ', parentKeyword.label);

        const keyword: Keyword = keywordsState.keywordsById[childNode.keywordId];
        console.log('Node keyword: ', keyword.label);


        recursiveBuildTree(keywordsState, deepKeywordTree, childNode);
      }
    }
    // debugger;
  }
}
