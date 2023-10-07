import { MediaItem } from './entities';

export const serverUrl = 'http://localhost:8000';
// export const serverUrl = 'https://tsmealwheel.herokuapp.com';

export const apiUrlFragment = '/api/v1/';

export interface TedTaggerState {
  appState: AppState;
  mediaItemsState: MediaItemsState;
  selectionsState: SelectedMediaItemsState;
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

