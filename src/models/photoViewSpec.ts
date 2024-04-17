import { PhotoLayout, PhotoViewSpec } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_PHOTO_LAYOUT = 'SET_PHOTO_LAYOUT';
export const SET_ZOOM_FACTOR = 'SET_ZOOM_FACTOR';
export const SET_LOUPE_VIEW_MEDIA_ITEM_ID = 'SET_LOUPE_VIEW_MEDIA_ITEM_ID';
export const SET_DISPLAY_METADATA = 'SET_DISPLAY_METADATA';

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

interface SetNumGridColumnsPayload {
  numGridColumns: number,
}

export const setNumGridColumnsRedux = (numGridColumns: number): any => {
  return {
    type: SET_ZOOM_FACTOR,
    payload: {
      numGridColumns,
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

interface SetDisplayMetadata {
  displayMetadata: boolean,
}

export const setDisplayMetadata = (displayMetadata: boolean): any => {
  return {
    type: SET_DISPLAY_METADATA,
    payload: {
      displayMetadata,
    },
  };
};


// ------------------------------------
// Reducer
// ------------------------------------

const initialState: PhotoViewSpec = {
  photoLayout: PhotoLayout.Grid,
  numGridColumns: 3,
  loupeViewMediaItemId: '',
  displayMetadata: false,
};

export const photoViewSpecReducer = (
  state: PhotoViewSpec = initialState,
  action: TedTaggerModelBaseAction<
    SetPhotoLayoutPayload &
    SetNumGridColumnsPayload &
    SetLoupeViewMediaItemIdPayload &
    SetDisplayMetadata>,
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
        numGridColumns: action.payload.numGridColumns,
      };
    case SET_LOUPE_VIEW_MEDIA_ITEM_ID:
      return {
        ...state,
        loupeViewMediaItemId: action.payload.loupeViewMediaItemId,
      };
    case SET_DISPLAY_METADATA:
      return {
        ...state,
        displayMetadata: action.payload.displayMetadata,
      };

    default:
      return state;
  }
};
