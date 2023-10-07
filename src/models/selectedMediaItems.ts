import { cloneDeep } from 'lodash';

import { SelectedMediaItemsState } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const TOGGLE_MEDIA_ITEM_SELECTION = 'TOGGLE_MEDIA_ITEM_SELECTION';

// ------------------------------------
// Actions
// ------------------------------------

interface ToggleMediaItemSelectionPayload {
  googleId: string;
}

export const toggleMediaItemSelection = (
  googleId: string,
): any => {
  return {
    type: TOGGLE_MEDIA_ITEM_SELECTION,
    payload: {
      googleId
    }
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: SelectedMediaItemsState =
{
  selectedMediaItemIds: [],
};

export const selectedMediaItemsStateReducer = (
  state: SelectedMediaItemsState = initialState,
  action: TedTaggerModelBaseAction<ToggleMediaItemSelectionPayload>
): SelectedMediaItemsState => {
  switch (action.type) {
    case TOGGLE_MEDIA_ITEM_SELECTION: {
      const newState = cloneDeep(state) as SelectedMediaItemsState;
      const index: number = newState.selectedMediaItemIds.findIndex((element: string) => element === action.payload.googleId);
      if (index < 0) {
        newState.selectedMediaItemIds.push(action.payload.googleId);
      } else {
        newState.selectedMediaItemIds.splice(index, 1);
      }
      return newState;
    }
    default:
      return state;
  }
};

