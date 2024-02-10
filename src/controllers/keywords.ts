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
import { KeywordData, KeywordNode, StringToKeywordLUT, apiUrlFragment, serverUrl } from '../types';
import { getKeywordsById } from '../selectors';

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

    // if a keyword with the same label and type already exists, get and use the existing keyword
    const keywords: StringToKeywordLUT = getKeywordsById(getState());
    
    // TEDTODO
    // const indexOfExistingKeyword: number = Object.values(keywords).findIndex((keyword: any) => keyword.label === keywordLabel && keyword.type === keywordType);
    const indexOfExistingKeyword: number = Object.values(keywords).findIndex((keyword: any) => keyword.label === keywordLabel);

    let keywordId: string;
    if (indexOfExistingKeyword >= 0) {
      keywordId = Object.keys(keywords)[indexOfExistingKeyword];
    } else {
      keywordId = uuidv4();
      dispatch(addKeywordRedux(keywordId, keywordLabel, keywordType));
    }

    const keywordNode: KeywordNode = {
      nodeId: uuidv4(),
      keywordId,
      parentNodeId,
      childrenNodeIds: []
    };
    dispatch(addKeywordNode(parentNodeId, keywordNode));

    return keywordNode;
  };
}
