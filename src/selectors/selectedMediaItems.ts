import {
  ClientMediaItem,
  SelectedMediaItemsState,
  TedTaggerState
} from '../types';

import path from 'path-browserify';

export const getSelectdMediaItems = (state: TedTaggerState): ClientMediaItem[] => {
  return state.selectionsState.mediaItems;
};

export const isMediaItemSelected = (state: TedTaggerState, filePath: string): boolean => {

  const incomingMediaItemBaseName: string = path.basename(filePath);

  const selectedState: SelectedMediaItemsState = state.selectionsState;
  const selectedMediaItems: ClientMediaItem[] = selectedState.mediaItems;

  for (const selectedMediaItem of selectedMediaItems) {
    const selectedMediaItemBaseName: string = path.basename(selectedMediaItem.filePath!);
    if (selectedMediaItemBaseName === incomingMediaItemBaseName) {
      return true;
    }
  }

  return false;
};