import { cloneDeep } from 'lodash';

import { AppTagAvatar, AppTagAvatarsState } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_APP_TAG_AVATARS = 'ADD_APP_TAG_AVATARS';

// ------------------------------------
// Actions
// ------------------------------------

interface AddAppTagAvatarsPayload {
  appTagAvatars: AppTagAvatar[];
}

export const addAppTagAvatars = (
  appTagAvatars: AppTagAvatar[],
): any => {
  return {
    type: ADD_APP_TAG_AVATARS,
    payload: {
      appTagAvatars
    }
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: AppTagAvatarsState =
{
  appTagAvatars: [],
};

export const appTagAvatarsStateReducer = (
  state: AppTagAvatarsState = initialState,
  action: TedTaggerModelBaseAction<AddAppTagAvatarsPayload>
): AppTagAvatarsState => {
  switch (action.type) {
    case ADD_APP_TAG_AVATARS: {
      const newState = cloneDeep(state) as AppTagAvatarsState;
      newState.appTagAvatars = newState.appTagAvatars.concat(action.payload.appTagAvatars);
      return newState;
    }
    default:
      return state;
  }
};
