import {
  TedTaggerState,
  TagSelectorType,
  DateRangeSpecification,
  TagExistenceSpecification,
  TagsSpecification,
  Tag,
  // DateSelectorType
} from '../types';
import { getAllTags } from './tags';

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

export const getSearchTags = (state: TedTaggerState): Tag[] => {
  const tags: Tag[] = getAllTags(state);
  const tagIds: string[] = state.photosToDisplaySpec.tagIds;
  const searchTags: Tag[] = [];
  for (const tag of tags) {
    if (tagIds.includes(tag.id)) {
      searchTags.push(tag);
    }
  }
  return searchTags;
};

