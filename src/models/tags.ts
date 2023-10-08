import { cloneDeep, isNil } from 'lodash';

import { Tag, TagsState } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_TAGS = 'ADD_TAGS';
export const ADD_TAG = 'ADD_TAG';
export const DELETE_TAG = 'DELETE_TAG';

// ------------------------------------
// Actions
// ------------------------------------

interface AddTagsPayload {
  tags: Tag[];
}

export const addTags = (
  tags: Tag[],
): any => {
  return {
    type: ADD_TAGS,
    payload: {
      tags
    }
  };
};

interface AddTagPayload {
  tag: Tag;
}

export const addTag = (
  tag: Tag,
): any => {
  return {
    type: ADD_TAG,
    payload: {
      tag,
    }
  };
};

interface DeleteTagPayload {
  tag: Tag;
}

export const deleteTag = (
  tag: Tag,
): any => {
  return {
    type: DELETE_TAG,
    payload: {
      tag,
    }
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: TagsState =
{
  tags: [],
};

export const tagsStateReducer = (
  state: TagsState = initialState,
  action: TedTaggerModelBaseAction<AddTagsPayload & AddTagPayload & DeleteTagPayload>
): TagsState => {
  switch (action.type) {
    case ADD_TAGS: {
      const newState = cloneDeep(state) as TagsState;
      newState.tags = newState.tags.concat(action.payload.tag);
      return newState;
    }
    case ADD_TAG: {
      const newState = cloneDeep(state) as TagsState;
      newState.tags.push(action.payload.tag);
      return newState;
    }
    case DELETE_TAG: {
      const newState = cloneDeep(state) as TagsState;
      debugger;
      return newState;
    }

    default:
      return state;
  }
};
