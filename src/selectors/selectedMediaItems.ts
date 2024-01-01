import {
  MediaItem,
  TedTaggerState
} from '../types';

import { getMediaItemById } from './mediaItems';

export const getSelectedMediaItemIds = (state: TedTaggerState): string[] => {
  return state.selectionsState.selectedMediaItemIds;
};

export const isMediaItemSelected = (state: TedTaggerState, mediaItem: MediaItem): boolean => {

  const selectedMediaItemIds: string[] = getSelectedMediaItemIds(state);
  for (const selectedMediaItemId of selectedMediaItemIds) {
    const selectedMediaItem = getMediaItemById(state, selectedMediaItemId);
    if (selectedMediaItem?.googleId === mediaItem?.googleId) {
      return true;
    }
  }

  return false;
};

export const getLastClickedId = (state: TedTaggerState): string | null => {
  return state.selectionsState.lastClickedId;
};
