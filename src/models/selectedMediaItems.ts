import { cloneDeep, isNil } from 'lodash';

import { ClientMediaItem, MediaItemsState, SelectedMediaItemsState } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const TOGGLE_MEDIA_ITEM_SELECTION = 'TOGGLE_MEDIA_ITEM_SELECTION';

// ------------------------------------
// Actions
// ------------------------------------

interface ToggleMediaItemSelectionPayload {
  mediaItem: ClientMediaItem;
}

export const toggleMediaItemSelection = (
  mediaItem: ClientMediaItem,
): any => {
  return {
    type: TOGGLE_MEDIA_ITEM_SELECTION,
    payload: {
      mediaItem
    }
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: SelectedMediaItemsState =
{
  mediaItems: [],
};

export const selectedMediaItemsStateReducer = (
  state: MediaItemsState = initialState,
  action: TedTaggerModelBaseAction<ToggleMediaItemSelectionPayload>
): MediaItemsState => {
  switch (action.type) {
    case TOGGLE_MEDIA_ITEM_SELECTION: {
      const newState = cloneDeep(state) as SelectedMediaItemsState;
      const index: number = newState.mediaItems.findIndex((element: ClientMediaItem) => element.googleId === action.payload.mediaItem.googleId);
      if (index < 0) {
        newState.mediaItems.push(action.payload.mediaItem);
      } else {
        newState.mediaItems.splice(index, 1);
      }
      return newState;
    }
    default:
      return state;
  }
};

