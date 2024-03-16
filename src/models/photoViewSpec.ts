import { PhotoLayout, PhotoViewSpec } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_PHOTO_LAYOUT = 'SET_PHOTO_LAYOUT';
export const SET_ZOOM_FACTOR = 'SET_ZOOM_FACTOR';
export const SET_LOUPE_VIEW_MEDIA_ITEM_ID = 'SET_LOUPE_VIEW_MEDIA_ITEM_ID';

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

interface SetLoupeViewMediaItemIdPayload {
  loupeViewMediaItemId: string,
}

export const setLoupeViewMediaItemIdRedux = (loupeViewMediaItemId: string): any => {
  return {
    type: SET_LOUPE_VIEW_MEDIA_ITEM_ID,
    payload: {
      loupeViewMediaItemId,
    },
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: PhotoViewSpec = {
  photoLayout: PhotoLayout.Grid,
  zoomFactor: 3,
  loupeViewMediaItemId: '',
};

export const photoViewSpecReducer = (
  state: PhotoViewSpec = initialState,
  action: TedTaggerModelBaseAction<SetPhotoLayoutPayload & SetZoomFactorPayload & SetLoupeViewMediaItemIdPayload>,
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
    case SET_LOUPE_VIEW_MEDIA_ITEM_ID:
      return {
        ...state,
        loupeViewMediaItemId: action.payload.loupeViewMediaItemId,
      };
    default:
      return state;
  }
};
