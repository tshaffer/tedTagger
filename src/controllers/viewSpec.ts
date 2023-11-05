import axios from 'axios';

import { TedTaggerDispatch } from '../models';
import { serverUrl, apiUrlFragment } from '../types';

import {
  setStartDateRedux,
  setEndDateRedux
} from '../models';

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

