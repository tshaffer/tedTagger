import { cloneDeep } from 'lodash';
import { KeywordNode, KeywordTree, KeywordsState } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';
import { findNodeById } from '../selectors';

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_KEYWORD = 'ADD_KEYWORD';
export const ADD_KEYWORD_NODE = 'ADD_KEYWORD_NODE';

// ------------------------------------
// Actions
// ------------------------------------
interface AddKeywordPayload {
  keywordId: string,
  label: string,
  type: string,
}

export const addKeywordRedux = (
  keywordId: string,
  label: string,
  type: string,
): any => {
  return {
    type: ADD_KEYWORD,
    payload: {
      keywordId,
      label,
      type,
    }
  };
};

interface AddKeywordNodePayload {
  parentKeywordId: string;
  keywordNode: KeywordNode;
}

export const addKeywordNode = (
  parentKeywordId: string,
  keywordNode: KeywordNode,
): any => {
  return {
    type: ADD_KEYWORD_NODE,
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
    parentNode.childrenIds.push(newNode.nodeId);
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
  keywordsById: {
    ['1']: {
      keywordId: '1',
      label: 'rootKeyword',
      type: 'root',
    }
  },
  keywordNodesByNodeId: {
    ['1']: {
      nodeId: '1',
      keywordId: '1',
      parentId: undefined,
      childrenIds: [],
    }
  }
  ,
  keywordsTree: {
    root:
    {
      nodeId: '1',
      keywordId: 'rootKeyword',
      parentId: undefined,
      childrenIds: [],
    }
  }
};

export const keywordsStateReducer = (
  state: KeywordsState = initialState,
  action: TedTaggerModelBaseAction<AddKeywordNodePayload & AddKeywordPayload>
): KeywordsState => {
  switch (action.type) {
    case ADD_KEYWORD:
      return {
        ...state,
        keywordsById: {
          ...state.keywordsById,
          [action.payload.keywordId]:
          {
            keywordId: action.payload.keywordId,
            label: action.payload.label,
            type: action.payload.type,
          }
        }
      };
    case ADD_KEYWORD_NODE: {
      const newState = cloneDeep(state);
      const keywordTree: KeywordTree = newState.keywordsTree;
      addChildNode(keywordTree, action.payload.parentKeywordId, action.payload.keywordNode);
      return {
        ...newState,
        keywordNodesByNodeId: {
          ...newState.keywordNodesByNodeId,
          [action.payload.keywordNode.nodeId]: action.payload.keywordNode,
        }
      };
    }
    default:
      return state;
  }
};
