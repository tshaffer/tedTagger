import { cloneDeep } from 'lodash';
import { Keyword, KeywordNode, KeywordTree, KeywordsState } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';
import { findNodeById, getKeywords } from '../selectors';

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_KEYWORD = 'ADD_KEYWORD';

// ------------------------------------
// Actions
// ------------------------------------
interface AddKeywordPayload {
  parentKeywordId: string;
  keywordNode: KeywordNode;
}

export const addKeywordRedux = (
  parentKeywordId: string,
  keywordNode: KeywordNode,
): any => {
  return {
    type: ADD_KEYWORD,
    payload: {
      parentKeywordId,
      keywordNode,
    }
  };
};

function addChildNode(tree: KeywordTree, parentNodeId: string, newNode: KeywordNode): void {

  const parentNode = findNodeById(tree.root, parentNodeId);

  if (parentNode) {
    if (!parentNode.childrenIds) {
      parentNode.childrenIds = [];
    }

    newNode.parentId = parentNodeId;
    parentNode.childrenIds.push(newNode.id);
  } else {
    debugger;
    console.error(`Parent node with id ${parentNodeId} not found.`);
  }
}


// ------------------------------------
// Reducer
// ------------------------------------

const initialState: KeywordsState =
{
  keywords: {
    root:
    {
      id: '1',
      keywordId: 'rootKeyword',
      parentId: undefined,
      childrenIds: [],
    }
  }
};

export const keywordsStateReducer = (
  state: KeywordsState = initialState,
  action: TedTaggerModelBaseAction<AddKeywordPayload>
): KeywordsState => {
  switch (action.type) {
    case ADD_KEYWORD: {
      const newState = cloneDeep(state);
      const keywordTree: KeywordTree = newState.keywords;
      addChildNode(keywordTree, action.payload.parentKeywordId, action.payload.keywordNode);
      return newState;
    }
    default:
      return state;
  }
};
