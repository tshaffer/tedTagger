import { cloneDeep, isNil } from 'lodash';

import { ClientMediaItem, MediaItemsState } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_MEDIA_ITEMS = 'ADD_MEDIA_ITEMS';
export const ADD_TAG = 'ADD_TAG';
export const DELETE_TAG = 'DELETE_TAG';

// ------------------------------------
// Actions
// ------------------------------------

interface AddMediaItemsPayload {
  mediaItems: ClientMediaItem[];
}

export const addMediaItems = (
  mediaItems: ClientMediaItem[],
): any => {
  return {
    type: ADD_MEDIA_ITEMS,
    payload: {
      mediaItems
    }
  };
};

interface AddTagPayload {
  mediaItem: ClientMediaItem;
  tag: string;
}

export const addTag = (
  mediaItem: ClientMediaItem,
  tag: string,
): any => {
  return {
    type: ADD_TAG,
    payload: {
      mediaItem,
      tag,
    }
  };
};

interface DeleteTagPayload {
  mediaItem: ClientMediaItem;
  tag: string;
}

export const deleteTag = (
  mediaItem: ClientMediaItem,
  tag: string,
): any => {
  return {
    type: DELETE_TAG,
    payload: {
      mediaItem,
      tag,
    }
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: MediaItemsState =
{
  mediaItems: [],
};

export const mediaItemsStateReducer = (
  state: MediaItemsState = initialState,
  action: TedTaggerModelBaseAction<AddMediaItemsPayload & AddTagPayload & DeleteTagPayload>
): MediaItemsState => {
  switch (action.type) {
    case ADD_MEDIA_ITEMS: {
      const newState = cloneDeep(state) as MediaItemsState;
      newState.mediaItems = newState.mediaItems.concat(action.payload.mediaItems);
      return newState;
    }
    case ADD_TAG: {
      const newState = cloneDeep(state) as MediaItemsState;
      const specifiedMediaItem: ClientMediaItem = action.payload.mediaItem;
      for (const mediaItem of newState.mediaItems) {
        if (mediaItem.googleId === specifiedMediaItem.googleId) {
          mediaItem.tags.push(action.payload.tag);
        }
      }
      return newState;
    }
    case DELETE_TAG: {
      const newState = cloneDeep(state) as MediaItemsState;
      const specifiedMediaItem: ClientMediaItem = action.payload.mediaItem;
      for (const mediaItem of newState.mediaItems) {
        if (mediaItem.googleId === specifiedMediaItem.googleId) {
          mediaItem.tags = mediaItem.tags.filter((tag) => tag !== action.payload.tag);
        }
      }
      return newState;
    }
    default:
      return state;
  }
};
