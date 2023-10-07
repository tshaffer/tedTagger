
import { TedTaggerDispatch, toggleMediaItemSelection } from '../models';
import { MediaItem } from '../types';


export const toggleMediaItemSelectionAction = (mediaItem: MediaItem): any => {
  return (dispatch: TedTaggerDispatch, getState: any) => {
    dispatch(toggleMediaItemSelection(mediaItem.googleId));
  };
};
