
import { TedTaggerDispatch, clearMediaItemSelection, deselectMediaItem, selectMediaItem, setLastClickedId } from '../models';
import { MediaItem } from '../types';
import { getLastClickedId, getMediaItems, getSelectedMediaItemIds } from '../selectors';

export const handleClickPhoto = (id: string, commandKey: boolean, shiftKey: boolean) => {

  return (dispatch: TedTaggerDispatch, getState: any) => {

    const mediaItems: MediaItem[] = getMediaItems(getState());
    const selectedMediaItemIds: string[] = getSelectedMediaItemIds(getState());

    const index = mediaItems.findIndex((mediaItem) => mediaItem.googleId === id);

    if (index === -1) {
      console.error('Item with id not found:', id);
      return;
    }

    if (shiftKey) {
      dispatch(handleShiftClick(index, mediaItems, selectedMediaItemIds));
    } else if (commandKey) {
      dispatch(handleToggleSelection(id, selectedMediaItemIds));
    } else {
      dispatch(handleRegularClick(index, mediaItems));
    }

  };
};

const handleRegularClick = (index: number, mediaItems: MediaItem[]) => {
  return (dispatch: TedTaggerDispatch, getState: any) => {
    dispatch(deselectAll());
    const selectedMediaItemIds: string[] = getSelectedMediaItemIds(getState());
    dispatch(handleToggleSelection(mediaItems[index].googleId, selectedMediaItemIds));
  };
};

const handleToggleSelection = (id: string, selectedMediaItemIds: string[]) => {
  return (dispatch: TedTaggerDispatch, getState: any) => {
    const isSelected = selectedMediaItemIds.includes(id);

    if (isSelected) {
      dispatch(deselectMediaItem(id));
    } else {
      dispatch(selectMediaItem(id));
    }

    dispatch(setLastClickedId(id));
  };
};

const handleShiftClick = (index: number, mediaItems: MediaItem[], selectedMediaItemIds: string[]) => {
  return (dispatch: TedTaggerDispatch, getState: any) => {
    const lastClickedId = getLastClickedId(getState());
    if (lastClickedId !== null) {
      const start = Math.min(
        mediaItems.findIndex((item) => item.googleId === lastClickedId), index);
      const end = Math.max(
        mediaItems.findIndex((item) => item.googleId === lastClickedId),
        index
      );

      for (let i = start; i <= end; i++) {
        const id = mediaItems[i].googleId;
        if (!selectedMediaItemIds.includes(id)) {
          dispatch(selectMediaItem(id));
        }
      }
    } else {
      dispatch(handleToggleSelection(mediaItems[index].googleId, selectedMediaItemIds));
    }
  };
};


const deselectAll = () => {
  return (dispatch: TedTaggerDispatch, getState: any) => {
    dispatch(clearMediaItemSelection());
    dispatch(setLastClickedId(null));
  };
};

