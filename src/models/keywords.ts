import { cloneDeep } from 'lodash';
import { KeywordNode, KeywordTree, KeywordsState } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';
import { findNodeByNodeId } from '../selectors';

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

function addChildNode(keywordsState: KeywordsState, tree: KeywordTree, parentNodeId: string, newNode: KeywordNode): void {

  console.log(parentNodeId);

  const parentNode = findNodeByNodeId(keywordsState, tree.root, parentNodeId);
  console.log(parentNode);

  if (parentNode) {
    if (!parentNode.childrenNodeIds) {
      parentNode.childrenNodeIds = [];
    }

    newNode.parentNodeId = parentNodeId;
    parentNode.childrenNodeIds.push(newNode.nodeId);
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
      parentNodeId: undefined,
      childrenNodeIds: [],
    }
  }
  ,
  keywordsTree: {
    root:
    {
      nodeId: '1',
      keywordId: 'rootKeyword',
      parentNodeId: undefined,
      childrenNodeIds: [],
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
      console.log('invoke addChildNode');
      console.log(newState);
      addChildNode(newState, keywordTree, action.payload.parentKeywordId, action.payload.keywordNode);
      const retState: KeywordsState = {
        ...newState,
        keywordNodesByNodeId: {
          ...newState.keywordNodesByNodeId,
          [action.payload.keywordNode.nodeId]: action.payload.keywordNode,
        }
      };
      return retState;
    }
    default:
      return state;
  }
};
