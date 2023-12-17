import { PhotosToDisplaySpec, TagSelectorType } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_PHOTOS_TO_DISPLAY_SPEC_STATE = 'SET_PHOTOS_TO_DISPLAY_SPEC_STATE';
export const SET_DATE_RANGE = 'SET_DATE_RANGE';
export const SET_TAG_EXISTENCE = 'SET_TAG_EXISTENCE';
export const SET_TAGS_SPECIFICATION = 'SET_TAGS_SPECIFICATION';

// ------------------------------------
// Actions
// ------------------------------------

interface SetPhotosToDisplaySpecPayload {
  photosToDisplaySpec: PhotosToDisplaySpec
}

export const setPhotosToDisplaySpecRedux = (photosToDisplaySpec: PhotosToDisplaySpec): any => {
  return {
    type: SET_PHOTOS_TO_DISPLAY_SPEC_STATE,
    payload: {
      photosToDisplaySpec,
    },
  };
};

interface SetDateRangeSpecificationPayload {
  specifyDateRange: boolean,
  startDate?: string,
  endDate?: string
}

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

interface SetTagExistenceSpecificationPayload {
  specifyTagExistence: boolean,
  tagSelector?: TagSelectorType
}

export const setTagExistenceSpecificationRedux = (specifyTagExistence: boolean, tagSelector?: TagSelectorType): any => {
  return {
    type: SET_TAG_EXISTENCE,
    payload: {
      specifyTagExistence,
      tagSelector,
    },
  };
};

interface SetTagsSpecificationPayload {
  specifySearchWithTags: boolean,
  tagIds: string[],
}

export const setTagsSpecificationRedux = (specifySearchWithTags: boolean, tagIds: string[]): any => {
  return {
    type: SET_TAGS_SPECIFICATION,
    payload: {
      specifySearchWithTags,
      tagIds,
    },
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: PhotosToDisplaySpec = {
  specifyDateRange: false,
  specifyTagExistence: false,
  specifySearchWithTags: false,
  tagIds: [],
};

export const photosToDisplaySpecReducer = (
  state: PhotosToDisplaySpec = initialState,
  action: TedTaggerModelBaseAction<SetPhotosToDisplaySpecPayload & SetDateRangeSpecificationPayload & SetTagExistenceSpecificationPayload & SetTagsSpecificationPayload>
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
    case SET_TAGS_SPECIFICATION: {
      return {
        ...state,
        specifySearchWithTags: (action.payload as any).specifySearchWithTags,
        tagIds: (action.payload as any).tagIds,
      };
    }
    default:
      return state;
  }
};
