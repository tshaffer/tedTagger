import {
  ViewSpecState, ViewSpecType
} from '../types';

export const getViewSpecType = (state: ViewSpecState): ViewSpecType => {
  return state.viewSpecType;
};

export const getStartDate = (state: ViewSpecState): string => {
  return state.startDate;
};

export const getEndDate = (state: ViewSpecState): string => {
  return state.endDate;
};
