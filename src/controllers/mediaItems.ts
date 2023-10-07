import axios from 'axios';

import { TedTaggerAnyPromiseThunkAction, TedTaggerDispatch, addMediaItems, addTag, deleteTag } from '../models';
import { serverUrl, apiUrlFragment, ServerMediaItem, MediaItem } from '../types';
import { cloneDeep, isNil } from 'lodash';

export const loadMediaItems = (): TedTaggerAnyPromiseThunkAction => {
  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'mediaItems';

    return axios.get(path)
      .then((mediaItemsResponse: any) => {

        const mediaItems: MediaItem[] = [];
        const mediaItemEntitiesFromServer: ServerMediaItem[] = (mediaItemsResponse as any).data;
        console.log(mediaItemEntitiesFromServer);

        // derive mediaItems from serverMediaItems
        for (const mediaItemEntityFromServer of mediaItemEntitiesFromServer) {

          const mediaItem: any = cloneDeep(mediaItemEntityFromServer);
          (mediaItem as MediaItem).tags = [];

          const description: string = isNil(mediaItemEntityFromServer.description) ? '' : mediaItemEntityFromServer.description;
          if (description.startsWith('TedTag-')) {
            // mediaItem includes one or more tags
            const tagsSpec: string = description.substring('TedTag-'.length);
            const tags: string[] = tagsSpec.split(':');
            if (tags.length > 0) {
              (mediaItem as MediaItem).tags = tags;
            }
          }

          if (!isNil(mediaItemEntityFromServer.people)) {
            for (const person of mediaItemEntityFromServer.people) {
              (mediaItem as MediaItem).tags.push(person.name);
            }
          }

          mediaItems.push(mediaItem as MediaItem);

        }

        dispatch(addMediaItems(mediaItems));

        console.log(getState().mediaItemsState.mediaItems);
      });
  };
};

export const addTagToMediaItem = (mediaItem: MediaItem, tag: string): any => {
  return (dispatch: TedTaggerDispatch, getState: any) => {
    dispatch(addTag(mediaItem, tag));
  };
};

export const deleteTagFromMediaItem = (mediaItem: MediaItem, tag: string): any => {
  return (dispatch: TedTaggerDispatch, getState: any) => {
    dispatch(deleteTag(mediaItem, tag));
  };
};
