import { MediaItem, Tag, AppTagAvatar, UserTagAvatar } from './entities';
import {
  TagSearchOperator,
  TagSelectorType
} from './enums';

export interface TedTaggerState {
  appState: AppState;
  mediaItemsState: MediaItemsState;
  selectionsState: SelectedMediaItemsState;
  tagsState: TagsState;
  appTagAvatarsState: AppTagAvatarsState;
  userTagAvatarsState: UserTagAvatarsState;
  photosToDisplaySpec: PhotosToDisplaySpec;
}

export interface AppState {
  appInitialized: boolean;
}

export interface MediaItemsState {
  mediaItems: MediaItem[];
}

export interface SelectedMediaItemsState {
  lastClickedId: string | null;
  selectedMediaItemIds: string[];
}

export interface TagsState {
  tags: Tag[];
}

export interface AppTagAvatarsState {
  defaultAvatarId: string;
  appTagAvatars: AppTagAvatar[];
}

export interface UserTagAvatarsState {
  userTagAvatars: UserTagAvatar[];
}

export interface PhotosToDisplaySpec {
  specifyDateRange: boolean;
  startDate?: string;
  endDate?: string;
  specifyTagExistence: boolean;
  tagSelector?: TagSelectorType;
  specifySearchWithTags: boolean;
  tagIds: string[];
  tagSearchOperator?: TagSearchOperator;
}

export interface DateRangeSpecification {
  specifyDateRange: boolean;
  startDate?: string;
  endDate?: string;
}

export interface TagExistenceSpecification {
  specifyTagExistence: boolean;
  tagSelector?: TagSelectorType;
}

export interface TagsSpecification {
  specifySearchWithTags: boolean;
  tagIds: string[];
  tagSearchOperator?: TagSearchOperator;
}