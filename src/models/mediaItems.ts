import { cloneDeep, isNil } from 'lodash';

import { MediaItem, MediaItemsState } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_MEDIA_ITEMS = 'ADD_MEDIA_ITEMS';

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

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: MediaItemsState =
{
  mediaItems: [],
};

export const mediaItemsStateReducer = (
  state: MediaItemsState = initialState,
  action: TedTaggerModelBaseAction<AddMediaItemsPayload>
): MediaItemsState => {
  switch (action.type) {
    case ADD_MEDIA_ITEMS: {
      const newState = cloneDeep(state) as MediaItemsState;
      newState.mediaItems = newState.mediaItems.concat(action.payload.mediaItems);
      return newState;
    }
    default:
      return state;
  }
};
