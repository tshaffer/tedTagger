import axios from 'axios';

import { TedTaggerDispatch, setPhotosToDisplaySpecRedux, setTagSelectorRedux, setDateSelectorRedux } from '../models';
import { serverUrl, apiUrlFragment, DateSelectorType, PhotosToDisplaySpec, TagSelectorType } from '../types';

import {
  setStartDateRedux,
  setEndDateRedux
} from '../models';

export const loadPhotosToDisplaySpec = () => {
  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'photosToDisplaySpec';

    return axios.get(path)
      .then((photosToDisplaySpecResponse: any) => {
        const photosToDisplaySpec: PhotosToDisplaySpec = (photosToDisplaySpecResponse as any).data;
        dispatch(setPhotosToDisplaySpecRedux(photosToDisplaySpec));
      });
  };
};

export const setDateSelector = (dateSelector: DateSelectorType) => {

  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'setDateSelector';

    const setDateSelectorBody = {
      dateSelector,
    };

    return axios.post(
      path,
      setDateSelectorBody
    ).then((response) => {
      dispatch(setDateSelectorRedux(dateSelector));
      return dateSelector;
    }).catch((error) => {
      console.log('error');
      console.log(error);
      return '';
    });
  };

};

export const setTagSelector = (tagSelector: TagSelectorType) => {

  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'setTagSelector';

    const setTagSelectorBody = {
      tagSelector,
    };

    return axios.post(
      path,
      setTagSelectorBody
    ).then((response) => {
      dispatch(setTagSelectorRedux(tagSelector));
      return tagSelector;
    }).catch((error) => {
      console.log('error');
      console.log(error);
      return '';
    });
  };

};

export const setStartDate = (startDate: string) => {

  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'setStartDate';

    const setStartDateBody = {
      startDate,
    };

    return axios.post(
      path,
      setStartDateBody
    ).then((response) => {
      console.log('setStartDate response');
      console.log(response);
      dispatch(setStartDateRedux(startDate));
      return startDate;
    }).catch((error) => {
      console.log('error');
      console.log(error);
      return '';
    });
  };

};

export const setEndDate = (endDate: string) => {

  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'setEndDate';

    const setEndDateBody = {
      endDate,
    };

    return axios.post(
      path,
      setEndDateBody
    ).then((response) => {
      console.log('setEndDate response');
      console.log(response);
      dispatch(setEndDateRedux(endDate));
      return endDate;
    }).catch((error) => {
      console.log('error');
      console.log(error);
      return '';
    });
  };

};

