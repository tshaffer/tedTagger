import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { TedTaggerAnyPromiseThunkAction, TedTaggerDispatch, addTag, addTags } from '../models';
import { serverUrl, apiUrlFragment, Tag, AppTagAvatar } from '../types';
import { addAppTagAvatars } from '../models/appTagAvatars';

export const loadAppTagAvatars = (): TedTaggerAnyPromiseThunkAction => {
  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'appTagAvatars';

    return axios.get(path)
      .then((appTagAvatarsResponse: any) => {
        const appTagAvatars: AppTagAvatar[] = (appTagAvatarsResponse as any).data;
        dispatch(addAppTagAvatars(appTagAvatars));
      });
  };
};


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
      avatarType: 'app',
      avatarId: '',
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

export const uploadTagIconFile = (tag: Tag, formData: FormData): any => {
  return (dispatch: any, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'uploadTagIconFile';

    axios.post(path, formData, {
    }).then((response) => {
      console.log(response);
      console.log(response.statusText);
      dispatch(assignTagIconToTag(response.data.iconFileName, tag));
    });
  };
};

const assignTagIconToTag = (iconFileName: string, tag: Tag): any => {

  return (dispatch: any, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'assignTagIconToTag';

    const assignTagIconToTagBody = {
      tagId: tag.id,
      iconFileName,
    };

    axios.post(
      path,
      assignTagIconToTagBody,
    ).then((response) => {
      console.log('return from assignTagIconToTag');
      console.log(response);
    });
  };
};

export const assignTagAvatarToTag = (tagId: string, avatarType: string, avatarId: string): any => {

  return (dispatch: any, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'assignTagAvatarToTag';

    const assignTagAvatarToTagBody = {
      tagId,
      avatarType,
      avatarId,
    };

    axios.post(
      path,
      assignTagAvatarToTagBody,
    ).then((response) => {
      console.log('return from assignTagAvatarToTag');
      console.log(response);
    });
  };
};