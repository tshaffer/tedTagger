import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { TedTaggerAnyPromiseThunkAction, TedTaggerDispatch, addTag, addTagToMediaItemRedux, addTags } from '../models';
import { serverUrl, apiUrlFragment, Tag, MediaItem } from '../types';
import { cloneDeep } from 'lodash';

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

    const updateTagsInMediaItemBody = {
      mediaItemId: mediaItem.googleId,
      tagId: tag.id,
    };

    return axios.post(
      path,
      updateTagsInMediaItemBody
    ).then((response) => {
      console.log('updateTagsInMediaItemBody response');
      console.log(response);
      dispatch(addTagToMediaItemRedux(mediaItem, tag.id));
      return mediaItem.googleId;
    }).catch((error) => {
      console.log('error');
      console.log(error);
      return '';
    });
  };

};

export const uploadTagIconFile = (tag: Tag, formData: FormData): any => {
  return (dispatch: any, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'uploadTagIconFile';


    axios.post(path, formData, {
    }).then((response) => {
      console.log(response);
      console.log(response.statusText);
      const file = response.data.file;
      /*
          filename: 'old morgan.png'
          originalname: 'old morgan.png'
          path: 'public/tagIconImages/old morgan.png'
      */
      dispatch(assignTagIconToTag(file.filename, tag));
    });
  };
};

export const assignTagIconToTag = (tagFileName: string, tag: Tag): any => {

  return (dispatch: any, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'assignTagIconToTag';

    const assignTagIconToTagBody = {
      tagId: tag.id,
      tagFileName,
    };

    axios.post(
      path,
      assignTagIconToTagBody,
    ).then((response) => {
      console.log('return from assignTagIconToTag');
      console.log(response);
      // dispatch??
    });
  };
};