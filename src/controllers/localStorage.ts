import axios from 'axios';
import { addLocalStorages, TedTaggerAnyPromiseThunkAction, TedTaggerDispatch } from '../models';
import { serverUrl, apiUrlFragment } from '../types';

export const loadLocalStorageFolders = (): TedTaggerAnyPromiseThunkAction => {

  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'localDriveImportFolders';

    return axios.get(path)
      .then((response: any) => {
        const folders: string[] = response.data;
        dispatch(addLocalStorages(folders));
        console.log(folders);
        return Promise.resolve();
      }).catch((error) => {
        console.log('error');
        console.log(error);
        return '';
      });
  };
};

