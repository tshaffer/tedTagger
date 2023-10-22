import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { TedTaggerAnyPromiseThunkAction, TedTaggerDispatch, addTag, addTagToMediaItemRedux, addTags } from '../models';
import { serverUrl, apiUrlFragment, Tag, MediaItem } from '../types';

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
      type: 'user',
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

export const addTagToMediaItem = (
  mediaItem: MediaItem,
  tag: Tag,
): TedTaggerAnyPromiseThunkAction => {
  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'addTagToMediaItem';

    const addTagToMediaItemBody = {
      mediaItemId: mediaItem.googleId,
      tagId: tag.id,
    };

    return axios.post(
      path,
      addTagToMediaItemBody
    ).then((response) => {
      console.log('addTagToMediaItemBody response');
      console.log(response);
      dispatch(addTag(addTagToMediaItemRedux(mediaItem, tag.id)));
      return mediaItem.googleId;
    }).catch((error) => {
      console.log('error');
      console.log(error);
      return '';
    });
  };

};