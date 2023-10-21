import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { TedTaggerAnyPromiseThunkAction, TedTaggerDispatch, addTag, addTags } from '../models';
import { serverUrl, apiUrlFragment, Tag } from '../types';

export const loadTags = (): TedTaggerAnyPromiseThunkAction => {
  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'tags';

    return axios.get(path)
      .then((tagsResponse: any) => {
        const tags: Tag[] = (tagsResponse as any).data;
        dispatch(addTags(tags));
      });
  };
};

export const addTagToDb = (
  label: string,
): TedTaggerAnyPromiseThunkAction => {
  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'addTag';

    const tagBody = {
      id: uuidv4(),
      label,
    };

    return axios.post(
      path,
      tagBody
    ).then((response) => {
      console.log('addTag response');
      console.log(response);
      dispatch(addTag(tagBody));
      return tagBody.id;
    }).catch((error) => {
      console.log('error');
      console.log(error);
      return '';
    });
  };
};

