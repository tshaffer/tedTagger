import {
  ClientMediaItem,
  TedTaggerState
} from '../types';

import path from 'path-browserify';

export const getMediaItems = (state: TedTaggerState): ClientMediaItem[] => {
  return state.mediaItemsState.mediaItems;
};

export const getMediaItem = (state: TedTaggerState, googleId: string): ClientMediaItem | null => {
  
  for (const mediaItem of state.mediaItemsState.mediaItems) {
    if (mediaItem.googleId === googleId) {
      return mediaItem;
    }
  }
  
  return null;
};

export const getMediaItemByFilePath  = (state: TedTaggerState, filePath: string): ClientMediaItem | null => {
  
  const incomingMediaItemBaseName: string = path.basename(filePath);

  for (const mediaItem of state.mediaItemsState.mediaItems) {
    if (path.basename(mediaItem.filePath!) === incomingMediaItemBaseName) {
      return mediaItem;
    }
  }
  
  return null;
};