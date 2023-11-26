import {
  UserTagAvatar,
  TedTaggerState
} from '../types';

export const getAllUserTagAvatars = (state: TedTaggerState): UserTagAvatar[] => {
  return state.userTagAvatarsState.userTagAvatars;
};

