import { cloneDeep } from 'lodash';

import { AppTagAvatar, AppTagAvatarsState } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_DEFAULT_AVATAR_ID = 'SET_DEFAULT_AVATAR_ID';
export const ADD_APP_TAG_AVATARS = 'ADD_APP_TAG_AVATARS';

// ------------------------------------
// Actions
// ------------------------------------

interface SetDefaultAvatarIdPayload {
  defaultAvatarId: string;
}

export const setDefaultAvatarId = (
  defaultAvatarId: string,
): any => {
  return {
    type: SET_DEFAULT_AVATAR_ID,
    payload: {
      defaultAvatarId
    }
  };
};


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
  defaultAvatarId: '',
  appTagAvatars: [],
};

export const appTagAvatarsStateReducer = (
  state: AppTagAvatarsState = initialState,
  action: TedTaggerModelBaseAction<AddAppTagAvatarsPayload & SetDefaultAvatarIdPayload>
): AppTagAvatarsState => {
  switch (action.type) {
    case SET_DEFAULT_AVATAR_ID: {
      return { ...state, defaultAvatarId: action.payload.defaultAvatarId };
    }
    case ADD_APP_TAG_AVATARS: {
      const newState = cloneDeep(state) as AppTagAvatarsState;
      newState.appTagAvatars = newState.appTagAvatars.concat(action.payload.appTagAvatars);
      return newState;
    }
    default:
      return state;
  }
};
