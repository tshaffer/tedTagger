import {
  TedTaggerState,
  TagSelectorType,
  DateRangeSpecification,
  TagExistenceSpecification,
  // DateSelectorType
} from '../types';

export const getDateRangeSpecification = (state: TedTaggerState): DateRangeSpecification => {
  const { specifyDateRange, startDate, endDate } = state.photosToDisplaySpec;
  return { specifyDateRange, startDate, endDate };
};

export const getTagExistenceSpecification = (state: TedTaggerState): TagExistenceSpecification => {
  const { specifyTagExistence, tagSelector } = state.photosToDisplaySpec;
  return { specifyTagExistence, tagSelector };
};

export const getTagsSpecification = (state: TedTaggerState): boolean => {
  const { specifyTags } = state.photosToDisplaySpec;
  return specifyTags;
};

// export const getPhotosToDisplayDateSelector = (state: TedTaggerState): DateSelectorType => {
//   return state.photosToDisplaySpec.dateSelector;
// };

// export const getPhotosToDisplayDateTagSelector = (state: TedTaggerState): TagSelectorType => {
//   return state.photosToDisplaySpec.tagSelector;
// };

// export const getStartDate = (state: TedTaggerState): string => {
//   return state.photosToDisplaySpec.startDate;
// };

// export const getEndDate = (state: TedTaggerState): string => {
//   return state.photosToDisplaySpec.endDate;
// };
