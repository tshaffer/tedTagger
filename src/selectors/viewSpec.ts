import {
  ViewSpecState
} from '../types';

export const getStartDate = (state: ViewSpecState): string => {
  return state.startDate;
};

export const getEndDate = (state: ViewSpecState): string => {
  return state.endDate;
};
