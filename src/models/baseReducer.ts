/** @module Model:base */

import { combineReducers } from 'redux';
import { TedTaggerState } from '../types';

import { appStateReducer } from './appState';
import { mediaItemsStateReducer } from './mediaItems';
import { selectedMediaItemsStateReducer } from './selectedMediaItems';
import { tagsStateReducer } from './tags';
import { photosToDisplaySpecReducer } from './photoToDisplaySpec';
import { appTagAvatarsStateReducer } from './appTagAvatars';
import { userTagAvatarsStateReducer } from './userTagAvatars';
import { keywordsStateReducer } from './keywords';
import { searchUIStateReducer } from './searchUI';
import { takeoutsStateReducer } from './takeouts';
import { photoViewSpecReducer } from './photoViewSpec';

// -----------------------------------------------------------------------
// Reducers
// -----------------------------------------------------------------------
export const rootReducer = combineReducers<TedTaggerState>({
  appState: appStateReducer,
  mediaItemsState: mediaItemsStateReducer,
  selectionsState: selectedMediaItemsStateReducer,
  tagsState: tagsStateReducer,
  appTagAvatarsState: appTagAvatarsStateReducer,
  userTagAvatarsState: userTagAvatarsStateReducer,
  photosToDisplaySpec: photosToDisplaySpecReducer,
  keywordsState: keywordsStateReducer,
  searchUIState: searchUIStateReducer,
  takeoutsState: takeoutsStateReducer,
  photoViewSpec: photoViewSpecReducer,
});

// -----------------------------------------------------------------------
// Validators
// -----------------------------------------------------------------------

