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
  viewSpecState: ViewSpecState;
}

export interface AppState {
  appInitialized: boolean;
}

export interface MediaItemsState {
  mediaItems: MediaItem[];
}

export interface SelectedMediaItemsState {
  selectedMediaItemIds: string[];
}

export interface TagsState {
  tags: Tag[];
}

export interface AppTagAvatarsState {
  appTagAvatars: AppTagAvatar[];
}

export interface UserTagAvatarsState {
  userTagAvatars: UserTagAvatar[];
}

export enum ViewSpecType {
  All,
  ByDateRange,
}

export enum ViewSpecTagType {
  Any = 'any',
  Untagged = 'untagged',
}

export interface ViewSpecState {
  viewSpecType: ViewSpecType;
  tagSpec: ViewSpecTagType;
  startDate: string;
  endDate: string;
}

export type StringToStringLUT = {
  [key: string]: string;
}

export type StringToTagLUT = {
  [key: string]: Tag;
}
