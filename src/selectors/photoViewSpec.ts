import { TedTaggerState, PhotoViewSpec, PhotoLayout, Position } from '../types';

export const getPhotoViewSpec = (state: TedTaggerState): PhotoViewSpec => {
  return state.photoViewSpec;
};

export const getPhotoLayout = (state: TedTaggerState): PhotoLayout => {
  return state.photoViewSpec.photoLayout;
};

export const getNumGridColumns = (state: TedTaggerState): number => {
  return state.photoViewSpec.numGridColumns;
};

export const getLoupeViewMediaItemId = (state: TedTaggerState): string => {
  return state.photoViewSpec.loupeViewMediaItemId;
};

export const getDisplayMetadata = (state: TedTaggerState): boolean => {
  return state.photoViewSpec.displayMetadata;
};

export const getSurveyModeZoomFactor = (state: TedTaggerState): number => {
  return state.photoViewSpec.surveyModeZoomFactor;
};

export const getScrollPosition = (state: TedTaggerState): number => {
  return state.photoViewSpec.scrollPosition;
};

export const getScrollBarPosition = (state: TedTaggerState): Position => {
  return state.photoViewSpec.scrollBarPosition;
};

export const getPercentageScrolledToTheRight = (state: TedTaggerState): number => {
  return state.photoViewSpec.percentageScrolledToTheRight;
};

export const getXTranslateOffset = (state: TedTaggerState): number => {
  return state.photoViewSpec.xTranslateOffset;
};

export const getClientWidth = (state: TedTaggerState): number => {
  return state.photoViewSpec.clientWidth;
};

export const getScrollLeft = (state: TedTaggerState): number => {
  return state.photoViewSpec.scrollLeft;
};

export const getScrollWidth = (state: TedTaggerState): number => {
  return state.photoViewSpec.scrollWidth;
};

