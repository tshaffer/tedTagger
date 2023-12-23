import {
  TedTaggerState,
  DateRangeSpecification,
  TagsInSearchSpecification,
  TagSelectorType,
  Tag,
  TagSearchOperator,
} from '../types';
import { getAllTags } from './tags';

export const getDateRangeSpecification = (state: TedTaggerState): DateRangeSpecification => {
  return state.photosToDisplaySpec.dateRangeSpecification;
};

export const getSpecifyDateRange = (state: TedTaggerState): boolean => {
  const { specifyDateRange } = state.photosToDisplaySpec.dateRangeSpecification;
  return specifyDateRange;
};

export const getStartDate = (state: TedTaggerState): string => {
  const { startDate } = state.photosToDisplaySpec.dateRangeSpecification;
  return startDate;
};

export const getEndDate = (state: TedTaggerState): string => {
  const { endDate } = state.photosToDisplaySpec.dateRangeSpecification;
  return endDate;
};

export const getTagsInSearchSpecification = (state: TedTaggerState): TagsInSearchSpecification => {
  return state.photosToDisplaySpec.tagsInSearchSpecification;
};

export const getSpecifyTagsInSearch = (state: TedTaggerState): boolean => {
  const { specifyTagsInSearch } = getTagsInSearchSpecification(state);
  return specifyTagsInSearch;
};

export const getTagSelector = (state: TedTaggerState): TagSelectorType => {
  const { tagSelector } = getTagsInSearchSpecification(state);
  return tagSelector;
}; 

export const getTagIds = (state: TedTaggerState): string[] => {
  const { tagIds } = getTagsInSearchSpecification(state);
  return tagIds;
}; 

export const getTagSearchOperator = (state: TedTaggerState): TagSearchOperator => {
  const { tagSearchOperator } = getTagsInSearchSpecification(state);
  return tagSearchOperator;
}; 

export const getSearchTags = (state: TedTaggerState): Tag[] => {
  const tags: Tag[] = getAllTags(state);
  const tagIds: string[] = state.photosToDisplaySpec.tagsInSearchSpecification.tagIds;
  const searchTags: Tag[] = [];
  for (const tag of tags) {
    if (tagIds.includes(tag.id)) {
      searchTags.push(tag);
    }
  }
  return searchTags;
};

