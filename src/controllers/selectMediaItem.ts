
import { isString } from 'lodash';
import { getMediaItems } from '../selectors';
import { TedTaggerDispatch, toggleMediaItemSelection } from '../models';
import { MediaItem } from '../types';

export const toggleMediaItemSelectionAction = (mediaItemFilePath: string): any => {
  return (dispatch: TedTaggerDispatch, getState: any) => {
    const mediaItems: MediaItem[] = getMediaItems(getState());
    mediaItems.forEach((mediaItem: MediaItem) => {
      if (isString(mediaItem.filePath) && mediaItem.filePath! === mediaItemFilePath) {
        dispatch(toggleMediaItemSelection(mediaItem));
      }
    });
  };
};
