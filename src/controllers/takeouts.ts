import axios from 'axios';
import { TedTaggerAnyPromiseThunkAction, TedTaggerDispatch, addTakeouts } from '../models';
import { serverUrl, apiUrlFragment, Takeout } from '../types';

export const loadTakeouts = (): TedTaggerAnyPromiseThunkAction => {
  return (dispatch: TedTaggerDispatch, getState: any) => {
    
    const path = serverUrl + apiUrlFragment + 'takeouts';

    return axios.get(path)
      .then((response: any) => {
        console.log('response', response);
        const takeouts: Takeout[] = response.data;
        dispatch(addTakeouts(takeouts));
        return Promise.resolve();
      }).catch((error) => {
        console.log('error');
        console.log(error);
        return '';
      });
  };
};

export const importFromTakeout = (takeoutId: string): TedTaggerAnyPromiseThunkAction => {
  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'importFromTakeout/' + takeoutId;

    const importFromTakeoutBody = {
      id: takeoutId,
    };

    return axios.post(
      path,
      importFromTakeoutBody
    ).then((response) => {
      // dispatch(replaceTagInMediaItemsRedux(mediaItems, existingTag.id, newTag.id));
      // return mediaItems.googleId;
      console.log('importFromTakeoutBody response', response);
    }).catch((error) => {
      console.log('error');
      console.log(error);
      return '';
    });
  };
};
