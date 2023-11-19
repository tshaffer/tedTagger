import {
  TedTaggerState,
  ViewSpecTagType,
  ViewSpecType
} from '../types';

export const getViewSpecType = (state: TedTaggerState): ViewSpecType => {
  return state.viewSpecState.viewSpecType;
};

export const getViewSpecTagSpec = (state: TedTaggerState): ViewSpecTagType => {
  return state.viewSpecState.tagSpec;
};

export const getStartDate = (state: TedTaggerState): string => {
  return state.viewSpecState.startDate;
};

export const getEndDate = (state: TedTaggerState): string => {
  return state.viewSpecState.endDate;
};
