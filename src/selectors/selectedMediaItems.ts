import {
  ClientMediaItem,
  MediaItemsState,
  TedTaggerState
} from '../types';

import path from 'path-browserify';
import { getMediaItem, getMediaItemByFilePath } from './mediaItems';

export const getSelectedMediaItemIds = (state: TedTaggerState): string[] => {
  return state.selectionsState.selectedMediaItemIds;
};  

export const isMediaItemSelected = (state: TedTaggerState, filePath: string): boolean => {

  const incomingMediaItemBaseName: string = path.basename(filePath);
  const mediaItem: ClientMediaItem | null = getMediaItemByFilePath(state, filePath);

  const selectedMediaItemIds: string[]= getSelectedMediaItemIds(state);
  for (const selectedMediaItemId of selectedMediaItemIds) {
    const selectedMediaItem = getMediaItem(state, selectedMediaItemId);
    if (selectedMediaItem?.googleId === mediaItem?.googleId) {
      return true;
    }
  }

  return false;
};