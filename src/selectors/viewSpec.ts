import {
  TedTaggerState,
  ViewSpecType
} from '../types';

export const getViewSpecType = (state: TedTaggerState): ViewSpecType => {
  return state.viewSpecState.viewSpecType;
};

export const getStartDate = (state: TedTaggerState): string => {
  return state.viewSpecState.startDate;
};

export const getEndDate = (state: TedTaggerState): string => {
  return state.viewSpecState.endDate;
};
