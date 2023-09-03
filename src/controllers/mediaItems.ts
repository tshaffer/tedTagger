import axios from 'axios';

import { TedTaggerAnyPromiseThunkAction, TedTaggerDispatch, addMediaItems } from '../models';
import { serverUrl, apiUrlFragment } from '../types';

export const loadMediaItems = (): TedTaggerAnyPromiseThunkAction => {
  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'mediaItems';

    return axios.get(path)
      .then((mediaItemsResponse: any) => {
        const mediaItemEntitiesFromServer: any[] = (mediaItemsResponse as any).data;
        console.log(mediaItemEntitiesFromServer);
        dispatch(addMediaItems(mediaItemEntitiesFromServer));
      });
  };
};
