import {
  AppTagAvatar,
  TedTaggerState
} from '../types';

export const getDefaultAvatarId = (state: TedTaggerState): string => {
  return state.appTagAvatarsState.defaultAvatarId;
};

export const getAllAppTagAvatars = (state: TedTaggerState): AppTagAvatar[] => {
  return state.appTagAvatarsState.appTagAvatars;
};

// export const getTagsLUT = (state: TedTaggerState): StringToTagLUT => {
//   const stringToTag: StringToTagLUT = {};
//   for (const tag of state.tagsState.tags) {
//     stringToTag[tag.id] = tag;
//   }
//   return stringToTag;
// };

// export const getTagById = (state: TedTaggerState, id: string): Tag | null => {
//   for (const tag of state.tagsState.tags) {
//     if (tag.id === id) {
//       return tag;
//     }
//   }
//   return null;
// };

// export const getTagByLabel = (state: TedTaggerState, label: string): Tag | null => {

//   for (const tag of state.tagsState.tags) {
//     if (tag.label === label) {
//       return tag;
//     }
//   }

//   return null;
// };