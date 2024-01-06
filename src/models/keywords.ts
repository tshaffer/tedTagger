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
  debugger;
  return {
    type: ADD_KEYWORD,
    payload: {
      parentKeywordId,
      keywordNode,
    }
  };
};

function addChildNode(tree: KeywordTree, parentId: string, newNode: KeywordNode): void {

  const parentNode = findNodeById(tree.root, parentId);

  if (parentNode) {
    if (!parentNode.children) {
      debugger;
      parentNode.children = [];
    }

    newNode.parent = parentNode;
    parentNode.children.push(newNode);
  } else {
    debugger;
    console.error(`Parent node with id ${parentId} not found.`);
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
      value: {
        id: 'root',
        label: 'root',
        // type: 'root'
      },
      parent: undefined,
      children: [],
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
