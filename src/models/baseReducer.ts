/** @module Model:base */

import { combineReducers } from 'redux';
import { TedTaggerState } from '../types';

import { appStateReducer } from './appState';
import { mediaItemsStateReducer } from './mediaItems';
import { selectedMediaItemsStateReducer } from './selectedMediaItems';
import { tagsStateReducer } from './tags';
import { viewSpecStateReducer } from './viewSpec';
// -----------------------------------------------------------------------
// Reducers
// -----------------------------------------------------------------------
export const rootReducer = combineReducers<TedTaggerState>({
  appState: appStateReducer,
  mediaItemsState: mediaItemsStateReducer,
  selectionsState: selectedMediaItemsStateReducer,
  tagsState: tagsStateReducer,
  viewSpecState: viewSpecStateReducer,
});

// -----------------------------------------------------------------------
// Validators
// -----------------------------------------------------------------------

