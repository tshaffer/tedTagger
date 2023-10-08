import { cloneDeep, isNil } from 'lodash';

import { MediaItem, MediaItemsState, Tag } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_MEDIA_ITEMS = 'ADD_MEDIA_ITEMS';
export const ADD_TAG_TO_MEDIA_ITEM = 'ADD_TAG_TO_MEDIA_ITEM';
export const DELETE_TAG = 'DELETE_TAG';

// ------------------------------------
// Actions
// ------------------------------------

interface AddMediaItemsPayload {
  mediaItems: MediaItem[];
}

export const addMediaItems = (
  mediaItems: MediaItem[],
): any => {
  return {
    type: ADD_MEDIA_ITEMS,
    payload: {
      mediaItems
    }
  };
};

interface AddTagToMediaItemPayload {
  mediaItem: MediaItem;
  tag: Tag;
}

export const addTagToMediaItem = (
  mediaItem: MediaItem,
  tag: Tag,
): any => {
  return {
    type: ADD_TAG_TO_MEDIA_ITEM,
    payload: {
      mediaItem,
      tag,
    }
  };
};

interface DeleteTagPayload {
  mediaItem: MediaItem;
  tag: Tag;
}

export const deleteTag = (
  mediaItem: MediaItem,
  tag: Tag,
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
  action: TedTaggerModelBaseAction<AddMediaItemsPayload & AddTagToMediaItemPayload & DeleteTagPayload>
): MediaItemsState => {
  switch (action.type) {
    case ADD_MEDIA_ITEMS: {
      const newState = cloneDeep(state) as MediaItemsState;
      newState.mediaItems = newState.mediaItems.concat(action.payload.mediaItems);
      return newState;
    }
    case ADD_TAG_TO_MEDIA_ITEM: {
      const newState = cloneDeep(state) as MediaItemsState;
      const specifiedMediaItem: MediaItem = action.payload.mediaItem;
      for (const mediaItem of newState.mediaItems) {
        if (mediaItem.googleId === specifiedMediaItem.googleId) {
          mediaItem.tags.push(action.payload.tag);
        }
      }
      return newState;
    }
    case DELETE_TAG: {
      const newState = cloneDeep(state) as MediaItemsState;
      const specifiedMediaItem: MediaItem = action.payload.mediaItem;
      let index = 0;
      for (const mediaItem of newState.mediaItems) {
        if (mediaItem.googleId === specifiedMediaItem.googleId) {
          mediaItem.tags = mediaItem.tags.filter((tag) => tag.id !== action.payload.tag.id);
          break;
        }
        index++;
      }
      return newState;
    }
    default:
      return state;
  }
};
