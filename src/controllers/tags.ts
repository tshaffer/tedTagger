import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { TedTaggerAnyPromiseThunkAction, TedTaggerDispatch, addTag, addTags, addUserTagAvatar, addUserTagAvatars, updateTag } from '../models';
import { serverUrl, apiUrlFragment, Tag, AppTagAvatar, UserTagAvatar } from '../types';
import { addAppTagAvatars, setDefaultAvatarId } from '../models/appTagAvatars';
import { getDefaultAvatarId, getTagById } from '../selectors';

export const loadDefaultTagAvatarId = (): TedTaggerAnyPromiseThunkAction => {
  
  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'defaultAvatarId';

    return axios.get(path)
      .then((defaultAvatarIdResponse: any) => {
        const defaultAvatarId: string = (defaultAvatarIdResponse as any).data;
        dispatch(setDefaultAvatarId(defaultAvatarId));
      });
  };
};

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

export const loadUserTagAvatars = (): TedTaggerAnyPromiseThunkAction => {
  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'userTagAvatars';

    return axios.get(path)
      .then((userTagAvatarsResponse: any) => {
        const userTagAvatars: UserTagAvatar[] = (userTagAvatarsResponse as any).data;
        dispatch(addUserTagAvatars(userTagAvatars));
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
      avatarId: getDefaultAvatarId(getState()),
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

export const setTagUserAvatarFromFile = (tag: Tag, formData: FormData): any => {
  return (dispatch: any, getState: any) => {

    // upload the specified file to the server
    // the server will return the avatar path
    // create a new avatar object with this information, getting the avatar id
    // update the tag with this information (assignTagAvatarToTag)

    const path = serverUrl + apiUrlFragment + 'uploadUserAvatarFile';

    axios.post(path, formData, {
    }).then((response) => {
      console.log(response);
      console.log(response.statusText);

      const avatarPath = response.data.avatarFileName;

      const nextPath = serverUrl + apiUrlFragment + 'addUserAvatar';
      const addUserAvatarBody = { 
        id: uuidv4(),
        label: tag.label,
        path: avatarPath,
      };

      axios.post(
        nextPath,
        addUserAvatarBody,
      ).then((response) => {
        console.log('return from addUserAvatar');
        console.log(response);

        const newAvatarId: string = response.data;

        const userTagAvatar: UserTagAvatar = {
          id: newAvatarId,
          label: tag.label,
          path: avatarPath,
        };
        dispatch(addUserTagAvatar(userTagAvatar));
        dispatch(assignTagAvatarToTag(tag.id, 'user', newAvatarId));
      });
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
      const tag: Tag = getTagById(getState(), tagId)!;
      tag.avatarType = avatarType;
      tag.avatarId = avatarId;
      dispatch(updateTag(tagId, tag));
      console.log(response);
    });
  };
};

export const updateTagLabel = (tagId: string, tagLabel: string): any => {

  return (dispatch: any, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'updateTagLabel';

    const updateTagLabelBody = {
      tagId,
      tagLabel,
    };

    axios.post(
      path,
      updateTagLabelBody,
    ).then((response) => {
      console.log('return from updateTagLabel');
      console.log(response);
      const tag: Tag = getTagById(getState(), tagId)!;
      tag.label = tagLabel;
      dispatch(updateTag(tagId, tag));
      console.log(response);
    });
  };
};
