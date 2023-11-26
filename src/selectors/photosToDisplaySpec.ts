import {
  TedTaggerState,
  TagSelectorType,
  DateSelectorType
} from '../types';

export const getPhotosToDisplayDateSelector = (state: TedTaggerState): DateSelectorType => {
  return state.photosToDisplaySpec.dateSelector;
};

export const getPhotosToDisplayDateTagSelector = (state: TedTaggerState): TagSelectorType => {
  return state.photosToDisplaySpec.tagSelector;
};

export const getStartDate = (state: TedTaggerState): string => {
  return state.photosToDisplaySpec.startDate;
};

export const getEndDate = (state: TedTaggerState): string => {
  return state.photosToDisplaySpec.endDate;
};
