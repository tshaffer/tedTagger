import {
  ClientMediaItem,
  TedTaggerState
} from '../types';

export const getMediaItems = (state: TedTaggerState): ClientMediaItem[] => {
  return state.mediaItemsState.mediaItems;
};

