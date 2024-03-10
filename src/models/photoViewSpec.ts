import { PhotoLayout, PhotoViewSpec } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_PHOTO_LAYOUT = 'SET_PHOTO_LAYOUT';
export const SET_ZOOM_FACTOR = 'SET_ZOOM_FACTOR';

// ------------------------------------
// Actions
// ------------------------------------

interface SetPhotoLayoutPayload {
  photoLayout: PhotoLayout,
}

export const setPhotoLayoutRedux = (photoLayout: PhotoLayout): any => {
  return {
    type: SET_PHOTO_LAYOUT,
    payload: {
      photoLayout,
    },
  };
};

interface SetZoomFactorPayload {
  zoomFactor: number,
}

export const setZoomFactorRedux = (zoomFactor: number): any => {
  return {
    type: SET_ZOOM_FACTOR,
    payload: {
      zoomFactor,
    },
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: PhotoViewSpec = {
  photoLayout: PhotoLayout.Grid,
  zoomFactor: 1,
};

export const photoViewSpecReducer = (
  state: PhotoViewSpec = initialState,
  action: TedTaggerModelBaseAction<SetPhotoLayoutPayload & SetZoomFactorPayload>,
): PhotoViewSpec => {
  switch (action.type) {
    case SET_PHOTO_LAYOUT:
      return {
        ...state,
        photoLayout: action.payload.photoLayout,
      };
    case SET_ZOOM_FACTOR:
      return {
        ...state,
        zoomFactor: action.payload.zoomFactor,
      };
    default:
      return state;
  }
};
