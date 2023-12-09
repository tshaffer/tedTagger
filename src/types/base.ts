import { AppTagAvatar, MediaItem, Tag, UserTagAvatar } from './entities';

export const serverUrl = 'http://localhost:8000';
// export const serverUrl = 'https://tsmealwheel.herokuapp.com';

export const apiUrlFragment = '/api/v1/';

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

export enum DateSelectorType {
  All = 'all',
  ByDateRange = 'byDateRange',
}

export enum TagSelectorType {
  Any = 'any',
  Untagged = 'untagged',
}

export interface PhotosToDisplaySpec {
  dateSelector: DateSelectorType;
  tagSelector: TagSelectorType;
  startDate: string;
  endDate: string;
}

export type StringToStringLUT = {
  [key: string]: string;
}

export type StringToTagLUT = {
  [key: string]: Tag;
}
