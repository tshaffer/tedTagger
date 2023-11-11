import { cloneDeep, isNil } from 'lodash';

import { MediaItem, MediaItemsState, Tag } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_MEDIA_ITEMS = 'ADD_MEDIA_ITEMS';
export const SET_DISPLAYED_MEDIA_ITEMS = 'SET_DISPLAYED_MEDIA_ITEMS';
export const ADD_TAG_TO_MEDIA_ITEM = 'ADD_TAG_TO_MEDIA_ITEM';
export const ADD_TAG_TO_MEDIA_ITEMS = 'ADD_TAG_TO_MEDIA_ITEMS';
export const REPLACE_TAG_IN_MEDIA_ITEM = 'REPLACE_TAG_IN_MEDIA_ITEM';
export const DELETE_TAG = 'DELETE_TAG';
export const DELETE_TAG_FROM_MEDIA_ITEMS = 'DELETE_TAG_FROM_MEDIA_ITEMS';

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

export const setDisplayedMediaItems = (
  mediaItems: MediaItem[],
): any => {
  return {
    type: SET_DISPLAYED_MEDIA_ITEMS,
    payload: {
      mediaItems
    }
  };
};

interface AddTagToMediaItemPayload {
  mediaItem: MediaItem;
  tagId: string;
}

export const addTagToMediaItemRedux = (
  mediaItem: MediaItem,
  tagId: string,
): any => {
  return {
    type: ADD_TAG_TO_MEDIA_ITEM,
    payload: {
      mediaItem,
      tagId,
    }
  };
};

interface AddTagToMediaItemsPayload {
  mediaItem: MediaItem[];
  tagId: string;
}

export const addTagToMediaItemsRedux = (
  mediaItems: MediaItem[],
  tagId: string,
): any => {
  return {
    type: ADD_TAG_TO_MEDIA_ITEMS,
    payload: {
      mediaItems,
      tagId,
    }
  };
};

export const replaceTagInMediaItemRedux = (
  mediaItem: MediaItem,
  existingTagId: string,
  newTagId: string,
): any => {
  return {
    type: REPLACE_TAG_IN_MEDIA_ITEM,
    payload: {
      mediaItem,
      existingTagId,
      newTagId,
    }
  };
};

interface DeleteTagFromMediaItemsPayload {
  mediaItems: MediaItem[];
  tagId: string;
}

export const deleteTagFromMediaItemsRedux = (
  mediaItems: MediaItem[],
  tagId: string,
): any => {
  return {
    type: DELETE_TAG_FROM_MEDIA_ITEMS,
    payload: {
      mediaItems,
      tagId,
    }
  };
};


interface DeleteTagPayload {
  mediaItem: MediaItem;
  tagId: string;
}

export const deleteTag = (
  mediaItem: MediaItem,
  tagId: string,
): any => {
  return {
    type: DELETE_TAG,
    payload: {
      mediaItem,
      tagId,
    }
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: MediaItemsState =
{
  mediaItems: [],
  displayedMediaItems: [],
};

export const mediaItemsStateReducer = (
  state: MediaItemsState = initialState,
  action: TedTaggerModelBaseAction<AddMediaItemsPayload & AddTagToMediaItemPayload & AddTagToMediaItemsPayload& DeleteTagPayload & DeleteTagFromMediaItemsPayload>
): MediaItemsState => {
  switch (action.type) {
    case ADD_MEDIA_ITEMS: {
      const newState = cloneDeep(state) as MediaItemsState;
      newState.mediaItems = newState.mediaItems.concat(action.payload.mediaItems);
      return newState;
    }
    case SET_DISPLAYED_MEDIA_ITEMS: {
      const newState = cloneDeep(state) as MediaItemsState;
      newState.displayedMediaItems = newState.mediaItems.concat(action.payload.mediaItems);
      return newState;
    }
    case ADD_TAG_TO_MEDIA_ITEM: {
      const newState = cloneDeep(state) as MediaItemsState;
      const specifiedMediaItem: MediaItem = action.payload.mediaItem;
      for (const mediaItem of newState.mediaItems) {
        if (mediaItem.googleId === specifiedMediaItem.googleId) {
          mediaItem.tagIds.push(action.payload.tagId);
        }
      }
      return newState;
    }
    case ADD_TAG_TO_MEDIA_ITEMS: {
      const newState = cloneDeep(state) as MediaItemsState;
      const specifiedMediaItems: MediaItem[] = action.payload.mediaItems;
      specifiedMediaItems.forEach((specifiedMediaItem: MediaItem) => {
        for (const mediaItem of newState.mediaItems) {
          if (mediaItem.googleId === specifiedMediaItem.googleId) {
            mediaItem.tagIds.push(action.payload.tagId);
          }
        }  
      });
      return newState;
    }
    case DELETE_TAG: {
      const newState = cloneDeep(state) as MediaItemsState;
      const specifiedMediaItem: MediaItem = action.payload.mediaItem;
      let index = 0;
      for (const mediaItem of newState.mediaItems) {
        if (mediaItem.googleId === specifiedMediaItem.googleId) {
          mediaItem.tagIds = mediaItem.tagIds.filter((tagId) => tagId !== action.payload.tagId);
          break;
        }
        index++;
      }
      return newState;
    }
    case DELETE_TAG_FROM_MEDIA_ITEMS: {
      debugger;
      const newState = cloneDeep(state) as MediaItemsState;
      return newState;
    }
    default:
      return state;
  }
};
