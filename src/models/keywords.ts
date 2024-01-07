import { cloneDeep } from 'lodash';
import { KeywordNode, KeywordsState } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';
import { getNodeByNodeId } from '../selectors';

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
  parentNodeId: string;
  keywordNode: KeywordNode;
}

export const addKeywordNode = (
  parentNodeId: string,
  keywordNode: KeywordNode,
): any => {
  return {
    type: ADD_KEYWORD_NODE,
    payload: {
      parentNodeId,
      keywordNode,
    }
  };
};

function addChildNode(keywordsState: KeywordsState, parentNodeId: string, newNode: KeywordNode): void {

  console.log(parentNodeId);

  const parentNode = getNodeByNodeId(keywordsState, parentNodeId);
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
    ['rootKeyword']: {
      keywordId: 'rootKeyword',
      label: 'Keyword Tree Root',
      type: 'root',
    }
  },
  keywordNodesByNodeId: {
    ['rootNode']: {
      nodeId: 'rootNode',
      keywordId: 'rootKeyword',
      parentNodeId: undefined,
      childrenNodeIds: [],
    }
  }
  ,
  keywordRootNodeId: 'rootNode',
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
      console.log('invoke addChildNode');
      console.log(newState);
      addChildNode(newState, action.payload.parentNodeId, action.payload.keywordNode);
      const retState: KeywordsState = {
        ...newState,
        keywordNodesByNodeId: {
          ...newState.keywordNodesByNodeId,
          [action.payload.keywordNode.nodeId]: action.payload.keywordNode,
        }
      };
      console.log('ADD_KEYWORD_NODE');
      console.log(retState);
      return retState;
    }
    default:
      return state;
  }
};
