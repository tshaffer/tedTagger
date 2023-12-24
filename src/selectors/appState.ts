import { MainDisplayMode, TedTaggerState } from '../types';

export const getMainDisplayMode = (state: TedTaggerState): MainDisplayMode => {
  return state.appState.mainDisplayMode;
}; 

export const getFullScreenMediaItemId = (state: TedTaggerState): string => {
  return state.appState.fullScreenMediaItemId;
};
