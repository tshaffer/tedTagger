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
  clearKeywordData,
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

export const mergeKeywordData = (keywordData: KeywordData): any => {
  return (dispatch: TedTaggerDispatch) => {
    const { keywords, keywordNodes } = keywordData;
    keywords.forEach((keyword: any) => {
      dispatch(addKeywordRedux(keyword.keywordId, keyword.label, keyword.type));
    });
    keywordNodes.forEach((keywordNode: any) => {
      dispatch(addKeywordNode(keywordNode.parentNodeId, keywordNode));
    });
  };
};

export const reloadKeywordData = (): TedTaggerAnyPromiseThunkAction => {
  return (dispatch: TedTaggerDispatch) => {
    dispatch(clearKeywordData());
    return dispatch(loadKeywordData());
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
