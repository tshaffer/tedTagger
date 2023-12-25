import { cloneDeep, isNil, remove } from 'lodash';

import { Tag, TagsState } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_TAGS = 'ADD_TAGS';
export const ADD_TAG = 'ADD_TAG';
export const UPDATE_TAG = 'UPDATE_TAG';
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

interface UpdateTagPayload {
  tagId: string;
  tag: Tag;
}

export const updateTag = (
  tagId: string,
  tag: Tag,
): any => {
  return {
    type: UPDATE_TAG,
    payload: {
      tagId,
      tag,
    }
  };
};

interface DeleteTagPayload {
  tagId: string;
}

export const deleteTagRedux = (
  tagId: string,
): any => {
  return {
    type: DELETE_TAG,
    payload: {
      tagId
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
  action: TedTaggerModelBaseAction<AddTagsPayload & AddTagPayload & UpdateTagPayload & DeleteTagPayload>
): TagsState => {
  switch (action.type) {
    case ADD_TAGS: {
      const newState = cloneDeep(state) as TagsState;
      newState.tags = newState.tags.concat(action.payload.tags);
      return newState;
    }
    case ADD_TAG: {
      const newState = cloneDeep(state) as TagsState;
      newState.tags.push(action.payload.tag);
      return newState;
    }
    case UPDATE_TAG: {
      const newState = cloneDeep(state) as TagsState;
      for (const tag of newState.tags) {
        if (tag.id === action.payload.tagId) {
          tag.label = action.payload.tag.label;
          tag.avatarId = action.payload.tag.avatarId;
          tag.avatarType = action.payload.tag.avatarType;
          break;
        }
      }
      return newState;
    }
    case DELETE_TAG: {
      const newState = cloneDeep(state) as TagsState;
      const existingTags: Tag[] = newState.tags;
      remove(existingTags, (tag: Tag) => tag.id === action.payload.tagId);
      return newState;
    }

    default:
      return state;
  }
};
