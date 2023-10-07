import {
  MediaItem,
  TedTaggerState
} from '../types';

import path from 'path-browserify';

export const getMediaItems = (state: TedTaggerState): MediaItem[] => {
  return state.mediaItemsState.mediaItems;
};

export const getMediaItem = (state: TedTaggerState, googleId: string): MediaItem | null => {

  for (const mediaItem of state.mediaItemsState.mediaItems) {
    if (mediaItem.googleId === googleId) {
      return mediaItem;
    }
  }

  return null;
};
