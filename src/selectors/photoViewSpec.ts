import { TedTaggerState, PhotoViewSpec, PhotoLayout } from '../types';

export const getPhotoViewSpec = (state: TedTaggerState): PhotoViewSpec => {
  return state.photoViewSpec;
};

export const getPhotoLayout = (state: TedTaggerState): PhotoLayout => {
  return state.photoViewSpec.photoLayout;
};

export const getZoomFactor = (state: TedTaggerState): number => {
  return state.photoViewSpec.zoomFactor;
};

