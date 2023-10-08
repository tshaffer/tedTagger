import axios from 'axios';

import { TedTaggerAnyPromiseThunkAction, TedTaggerDispatch, addTags } from '../models';
import { serverUrl, apiUrlFragment, Tag } from '../types';

export const loadTags = (): TedTaggerAnyPromiseThunkAction => {
  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'tags';

    return axios.get(path)
      .then((tagsResponse: any) => {

        const tags: Tag[] = (tagsResponse as any).data;
        console.log(tags);
        dispatch(addTags(tags));

        console.log(getState().tagsState.tags);
      });
  };
};

