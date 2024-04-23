import { PhotoLayout, PhotoViewSpec, Position } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_PHOTO_LAYOUT = 'SET_PHOTO_LAYOUT';
export const SET_ZOOM_FACTOR = 'SET_ZOOM_FACTOR';
export const SET_LOUPE_VIEW_MEDIA_ITEM_ID = 'SET_LOUPE_VIEW_MEDIA_ITEM_ID';
export const SET_DISPLAY_METADATA = 'SET_DISPLAY_METADATA';
export const SET_SURVEY_MODE_ZOOM_FACTOR = 'SET_SURVEY_MODE_ZOOM_FACTOR';
export const SET_SCROLL_POSITION = 'SET_SCROLL_POSITION';
export const SET_SCROLL_BAR_POSITION = 'SET_SCROLL_BAR_POSITION';
export const SET_PERCENTAGE_SCROLLED_TO_THE_RIGHT = 'SET_PERCENTAGE_SCROLLED_TO_THE_RIGHT';
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

interface SetSurveyModeZoomFactorPayload {
  surveyModeZoomFactor: number,
}

export const setSurveyModeZoomFactorRedux = (surveyModeZoomFactor: number): any => {
  return {
    type: SET_SURVEY_MODE_ZOOM_FACTOR,
    payload: {
      surveyModeZoomFactor,
    },
  };
};

interface SetScrollPositionPayload {
  scrollPosition: number,
}

export const setScrollPositionRedux = (scrollPosition: number): any => {
  return {
    type: SET_SCROLL_POSITION,
    payload: {
      scrollPosition,
    },
  };
};

interface SetScrollBarPositionPayload {
  scrollBarPosition: Position,
}

export const setScrollBarPosition = (scrollBarPosition: Position): any => {
  return {
    type: SET_SCROLL_BAR_POSITION,
    payload: {
      scrollBarPosition,
    },
  };
};

interface SetPercentageScrolledToTheRightPayload {
  percentageScrolledToTheRight: number,
}

export const setPercentageScrolledToTheRight = (percentageScrolledToTheRight: number): any => {
  return {
    type: SET_PERCENTAGE_SCROLLED_TO_THE_RIGHT,
    payload: {
      percentageScrolledToTheRight,
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
  surveyModeZoomFactor: 1,
  scrollPosition: 0,
  scrollBarPosition: { x: 0, y: 0 },
  percentageScrolledToTheRight: 0,
};

export const photoViewSpecReducer = (
  state: PhotoViewSpec = initialState,
  action: TedTaggerModelBaseAction<SetPhotoLayoutPayload & SetNumGridColumnsPayload & SetSurveyModeZoomFactorPayload & SetLoupeViewMediaItemIdPayload & SetDisplayMetadata & SetScrollPositionPayload & SetScrollBarPositionPayload & SetPercentageScrolledToTheRightPayload>,
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
    case SET_SURVEY_MODE_ZOOM_FACTOR:
      return {
        ...state,
        surveyModeZoomFactor: action.payload.surveyModeZoomFactor,
      };
    case SET_SCROLL_POSITION:
      return {
        ...state,
        scrollPosition: action.payload.scrollPosition,
      };
    case SET_SCROLL_BAR_POSITION:
      return {
        ...state,
        scrollBarPosition: action.payload.scrollBarPosition,
      };
    case SET_PERCENTAGE_SCROLLED_TO_THE_RIGHT:
      return {
        ...state,
        percentageScrolledToTheRight: action.payload.percentageScrolledToTheRight,
      };
    default:
      return state;
  }
};
