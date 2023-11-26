import { cloneDeep } from 'lodash';

import { UserTagAvatar, UserTagAvatarsState } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_USER_TAG_AVATAR = 'ADD_USER_TAG_AVATAR';
export const ADD_USER_TAG_AVATARS = 'ADD_USER_TAG_AVATARS';

// ------------------------------------
// Actions
// ------------------------------------

interface AddUserTagAvatarPayload {
  userTagAvatar: UserTagAvatar;
}

export const addUserTagAvatar = (
  userTagAvatar: UserTagAvatar,
): any => {
  return {
    type: ADD_USER_TAG_AVATAR,
    payload: {
      userTagAvatar
    }
  };
};

interface AddUserTagAvatarsPayload {
  userTagAvatars: UserTagAvatar[];
}

export const addUserTagAvatars = (
  userTagAvatars: UserTagAvatar[],
): any => {
  return {
    type: ADD_USER_TAG_AVATARS,
    payload: {
      userTagAvatars
    }
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: UserTagAvatarsState =
{
  userTagAvatars: [],
};

export const userTagAvatarsStateReducer = (
  state: UserTagAvatarsState = initialState,
  action: TedTaggerModelBaseAction<AddUserTagAvatarPayload & AddUserTagAvatarsPayload>
): UserTagAvatarsState => {
  switch (action.type) {
    case ADD_USER_TAG_AVATAR: {
      const newState = cloneDeep(state) as UserTagAvatarsState;
      newState.userTagAvatars.push(action.payload.userTagAvatar);
      return newState;
    }
    case ADD_USER_TAG_AVATARS: {
      const newState = cloneDeep(state) as UserTagAvatarsState;
      newState.userTagAvatars = newState.userTagAvatars.concat(action.payload.userTagAvatars);
      return newState;
    }
    default:
      return state;
  }
};
