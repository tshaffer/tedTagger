import { isNil } from 'lodash';
import {
  MediaItem,
  StringToTagLUT,
  Tag,
  TedTaggerState
} from '../types';

export const getAllTags = (state: TedTaggerState): Tag[] => {
  return state.tagsState.tags;
};

export const getTagsLUT = (state: TedTaggerState): StringToTagLUT => {
  const stringToTag: StringToTagLUT = {};
  for (const tag of state.tagsState.tags) {
    stringToTag[tag.id] = tag;
  }
  return stringToTag;
};

export const getTagById = (state: TedTaggerState, id: string): Tag | null => {
  for (const tag of state.tagsState.tags) {
    if (tag.id === id) {
      return tag;
    }
  }
  return null;
};

export const getTagByLabel = (state: TedTaggerState, label: string): Tag | null => {
  for (const tag of state.tagsState.tags) {
    if (tag.label === label) {
      return tag;
    }
  }
  return null;
};

export const isTagInUse = (state: TedTaggerState, tagId: string): boolean => {
  const matchingInputItem: MediaItem | undefined = state.mediaItemsState.mediaItems.find((mediaItem) => mediaItem.tagIds.includes(tagId));
  return !isNil(matchingInputItem);
};
