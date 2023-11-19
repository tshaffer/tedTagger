import axios from 'axios';

import { TedTaggerDispatch, setViewSpecStateRedux, setViewSpecTagSpecRedux, setViewSpecTypeRedux } from '../models';
import { serverUrl, apiUrlFragment, ViewSpecType, ViewSpecState, ViewSpecTagType } from '../types';

import {
  setStartDateRedux,
  setEndDateRedux
} from '../models';

export const loadViewSpec = () => {
  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'viewSpec';

    return axios.get(path)
      .then((viewSpecResponse: any) => {
        const viewSpec: ViewSpecState = (viewSpecResponse as any).data;
        viewSpec.tagSpec = ViewSpecTagType.Any;
        dispatch(setViewSpecStateRedux(viewSpec));
      });
  };
};

export const setViewSpecType = (viewSpecType: ViewSpecType) => {

  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'setViewSpecType';

    const setViewSpecTypeBody = {
      viewSpecType,
    };

    return axios.post(
      path,
      setViewSpecTypeBody
    ).then((response) => {
      console.log('setViewSpecType response');
      console.log(response);
      dispatch(setViewSpecTypeRedux(viewSpecType));
      return viewSpecType;
    }).catch((error) => {
      console.log('error');
      console.log(error);
      return '';
    });
  };

};

export const setViewSpecTagSpec = (viewSpecTagSpec: ViewSpecTagType) => {

  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'setViewSpecTagSpec';

    const setViewSpecTagSpecBody = {
      viewSpecTagSpec,
    };

    return axios.post(
      path,
      setViewSpecTagSpecBody
    ).then((response) => {
      console.log('setViewSpecTagSpec response');
      console.log(response);
      dispatch(setViewSpecTagSpecRedux(viewSpecTagSpec));
      return viewSpecTagSpec;
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

