import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import {
  TedTaggerAnyPromiseThunkAction,
  TedTaggerDispatch,
  addKeywordNode,
  addKeywordRedux,
  addKeywordNodesRedux,
  addKeywordsRedux,
  setKeywordRootNodeIdRedux,
} from '../models';
import { KeywordData, KeywordNode, apiUrlFragment, serverUrl } from '../types';

export const loadKeywordData = (): TedTaggerAnyPromiseThunkAction => {
  return (dispatch: TedTaggerDispatch, getState: any) => {
    const path = serverUrl
      + apiUrlFragment
      + 'allKeywordData';

    return axios.get(path)
      .then((response: any) => {
        console.log('response', response);
        const keywordData: KeywordData = response.data;
        const { keywords, keywordNodes, keywordRootNodeId } = keywordData;
        dispatch(setKeywordRootNodeIdRedux(keywordRootNodeId));
        dispatch(addKeywordsRedux(keywords));
        dispatch(addKeywordNodesRedux(keywordNodes));
        return Promise.resolve();
      }).catch((error) => {
        console.log('error');
        console.log(error);
        return '';
      });
  };
};

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
