
import { isString } from 'lodash';
import { getMediaItems } from '../selectors';
import { TedTaggerDispatch, toggleMediaItemSelection } from '../models';
import { ClientMediaItem, TedTaggerState } from '../types';

import path from 'path-browserify';

export const toggleMediaItemSelectionAction = (mediaItemFilePath: string): any => {
  return (dispatch: TedTaggerDispatch, getState: any) => {

    const incomingMediaItemBaseName: string = path.basename(mediaItemFilePath);

    const mediaItems: ClientMediaItem[] = getMediaItems(getState());
    mediaItems.forEach((mediaItem: ClientMediaItem) => {
      if (isString(mediaItem.filePath)) {
        const mediaItemBaseName: string = path.basename(mediaItem.filePath);
        if (incomingMediaItemBaseName === mediaItemBaseName) {
          dispatch(toggleMediaItemSelection(mediaItem.googleId));
          const state: TedTaggerState = getState();
          console.log(state.selectionsState);
        }
      }
    });
  };
};
