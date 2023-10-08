import {
  Tag,
  TedTaggerState
} from '../types';

export const getTags = (state: TedTaggerState): Tag[] => {
  return state.tagsState.tags;
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