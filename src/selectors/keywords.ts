import { isNil } from 'lodash';
import {
  Keyword,
  KeywordNode,
  KeywordNodeDeep,
  KeywordsState,
  KeywordTreeDeep,
  StringToKeywordLUT,
  StringToKeywordNodeLUT,
  TedTaggerState,
} from '../types';

export function getKeywordRootNodeId(tedTaggerState: TedTaggerState): string {
  // if (tedTaggerState.keywordsState.keywordRootNodeId !== '') {
  //   console.log('getKeywordRootNodeId', tedTaggerState.keywordsState.keywordRootNodeId);
  // }
  return tedTaggerState.keywordsState.keywordRootNodeId;
}

export function getKeywordsById(tedTaggerState: TedTaggerState): StringToKeywordLUT {
  return tedTaggerState.keywordsState.keywordsById;
}

export function getKeywordNodesByNodeId(tedTaggerState: TedTaggerState): StringToKeywordNodeLUT {
  return tedTaggerState.keywordsState.keywordNodesByNodeId;
}

export function getNodeByNodeId(keywordsState: KeywordsState, nodeId: string): KeywordNode | undefined {
  return keywordsState.keywordNodesByNodeId[nodeId];
}

export function getKeywordsAsTree(tedTaggerState: TedTaggerState): KeywordTreeDeep | undefined {
  if (!tedTaggerState.appState.appInitialized) {
    return undefined;
  }
  const keywordsState: KeywordsState = tedTaggerState.keywordsState;
  const keywordRootNodeId: string = keywordsState.keywordRootNodeId;
  const keywordRootNode: KeywordNode | undefined = getNodeByNodeId(keywordsState, keywordRootNodeId);
  if (!isNil(keywordRootNode)) {
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
    // console.log('invoke recursiveBuildTree');
    recursiveBuildTree(keywordsState, deepKeywordTree, rootKeywordNodeDeep);
    // console.log('return deepKeywordTree');
    return deepKeywordTree;
  }
  return undefined;
}


function recursiveBuildTree(keywordsState: KeywordsState, deepKeywordTree: KeywordTreeDeep, parentNodeDeep: KeywordNodeDeep): void {
  if (parentNodeDeep.childNodeIds && parentNodeDeep.childNodeIds.length > 0) {
    for (const childNode of parentNodeDeep.childNodes) {

      const parentKeyword: Keyword = keywordsState.keywordsById[parentNodeDeep.keywordId];
      // console.log('Parent keyword: ', parentKeyword.label);

      const keyword: Keyword = keywordsState.keywordsById[childNode.keywordId];
      // console.log('Node keyword: ', keyword.label);

      // add full nodes to childNode
      const childNodeIds: string[] = childNode.childNodeIds;
      childNode.childNodes = childNodeIds.map((childNodeId: string) => {
        const grandchildNode: KeywordNode | undefined = getNodeByNodeId(keywordsState, childNodeId);
        if (!isNil(grandchildNode)) {
          const childNodeDeep: KeywordNodeDeep = {
            nodeId: grandchildNode.nodeId,
            keywordId: grandchildNode.keywordId,
            childNodeIds: grandchildNode.childrenNodeIds || [],
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
      recursiveBuildTree(keywordsState, deepKeywordTree, childNode);
    }
  }
}
