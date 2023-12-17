import {
  TedTaggerState,
  TagSelectorType,
  DateRangeSpecification,
  TagExistenceSpecification,
  TagsSpecification,
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

export const getTagsSpecification = (state: TedTaggerState): TagsSpecification => {
  const { specifySearchWithTags, tagIds } = state.photosToDisplaySpec;
  return { specifySearchWithTags, tagIds };
};

