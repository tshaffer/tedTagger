import axios from 'axios';

import { TedTaggerAnyPromiseThunkAction, TedTaggerDispatch, addMediaItems, addTag, deleteTag } from '../models';
import { serverUrl, apiUrlFragment, ServerMediaItem, ClientMediaItem } from '../types';
import { cloneDeep, isNil } from 'lodash';

export const loadMediaItems = (): TedTaggerAnyPromiseThunkAction => {
  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'mediaItems';

    return axios.get(path)
      .then((mediaItemsResponse: any) => {

        const clientMediaItems: ClientMediaItem[] = [];
        const mediaItemEntitiesFromServer: ServerMediaItem[] = (mediaItemsResponse as any).data;
        console.log(mediaItemEntitiesFromServer);

        // derive clientMediaItems from serverMediaItems
        for (const mediaItemEntityFromServer of mediaItemEntitiesFromServer) {
          
          const clientMediaItem: any = cloneDeep(mediaItemEntityFromServer);
          (clientMediaItem as ClientMediaItem).tags = [];

          const description: string = isNil(mediaItemEntityFromServer.description) ? '' : mediaItemEntityFromServer.description;
          if (description.startsWith('TedTag-')) {
            // mediaItem includes one or more tags
            const tagsSpec: string = description.substring('TedTag-'.length);
            const tags: string[] = tagsSpec.split(':');
            if (tags.length > 0) {
              (clientMediaItem as ClientMediaItem).tags = tags;
            }
          }

          if (!isNil(mediaItemEntityFromServer.people)) {
            for (const person of mediaItemEntityFromServer.people) {
              (clientMediaItem as ClientMediaItem).tags.push(person.name);
            }
          }

          clientMediaItems.push(clientMediaItem as ClientMediaItem);
    
        }

        dispatch(addMediaItems(clientMediaItems));

        console.log(getState().mediaItemsState.mediaItems);
      });
  };
};

export const addTagToMediaItem = (mediaItem: ClientMediaItem, tag: string): any => {
  return (dispatch: TedTaggerDispatch, getState: any) => {
    dispatch(addTag(mediaItem, tag));
  };
};

export const deleteTagFromMediaItem = (mediaItem: ClientMediaItem, tag: string): any => {
  return (dispatch: TedTaggerDispatch, getState: any) => {
    dispatch(deleteTag(mediaItem, tag));
  };
};
