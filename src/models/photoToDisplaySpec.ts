import { PhotosToDisplaySpec, TagSelectorType } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_PHOTOS_TO_DISPLAY_SPEC_STATE = 'SET_PHOTOS_TO_DISPLAY_SPEC_STATE';
export const SET_DATE_RANGE = 'SET_DATE_RANGE';
export const SET_TAG_EXISTENCE = 'SET_TAG_EXISTENCE';
export const SET_TAGS = 'SET_TAGS';

// ------------------------------------
// Actions
// ------------------------------------

export const setPhotosToDisplaySpecRedux = (photosToDisplaySpec: PhotosToDisplaySpec): any => {
  return {
    type: SET_PHOTOS_TO_DISPLAY_SPEC_STATE,
    payload: {
      photosToDisplaySpec,
    },
  };
};


export const setDateRangeSpecificationRedux = (specifyDateRange: boolean, startDate?: string, endDate?: string): any => {
  return {
    type: SET_DATE_RANGE,
    payload: {
      specifyDateRange,
      startDate,
      endDate,
    },
  };
};

export const setTagExistenceSpecificationRedux = (specifyTagExistence: boolean, tagSelector?: TagSelectorType): any => {
  return {
    type: SET_TAG_EXISTENCE,
    payload: {
      specifyTagExistence,
      tagSelector,
    },
  };
};

export const setTagsSpecification = (specifyTags: boolean): any => {
  return {
    type: SET_TAGS,
    payload: {
      specifyTags,
    },
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: PhotosToDisplaySpec = {
  specifyDateRange: false,
  specifyTagExistence: false,
  specifyTags: false
};

export const photosToDisplaySpecReducer = (
  state: PhotosToDisplaySpec = initialState,
  action: TedTaggerModelBaseAction<any>
): PhotosToDisplaySpec => {
  switch (action.type) {
    case SET_PHOTOS_TO_DISPLAY_SPEC_STATE: {
      return (action.payload as any).photosToDisplaySpec;
    }
    case SET_DATE_RANGE: {
      return {
        ...state,
        specifyDateRange: (action.payload as any).specifyDateRange,
        startDate: (action.payload as any).startDate,
        endDate: (action.payload as any).endDate
      };
    }
    case SET_TAG_EXISTENCE: {
      return {
        ...state,
        specifyTagExistence: (action.payload as any).specifyTagExistence,
        tagSelector: (action.payload as any).tagSelector
      };
    }
    case SET_TAGS: {
      return {
        ...state,
        specifyTags: (action.payload as any).specifyTags
      };
    }
    default:
      return state;
  }
};
