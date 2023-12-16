import { PhotosToDisplaySpec, TagSelectorType } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_DATE_RANGE = 'SET_DATE_RANGE';
export const SET_TAG_EXISTENCE = 'SET_TAG_EXISTENCE';
export const SET_TAGS = 'SET_TAGS';

// export const SET_PHOTOS_TO_DISPLAY_SPEC_STATE = 'SET_PHOTOS_TO_DISPLAY_SPEC_STATE';
// export const SET_DATE_SELECTOR = 'SET_DATE_SELECTOR';
// export const SET_TAG_SELECTOR = 'SET_TAG_SELECTOR';
// export const SET_START_DATE = 'SET_START_DATE';
// export const SET_END_DATE = 'SET_END_DATE';

// ------------------------------------
// Actions
// ------------------------------------

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

export const setTagExistenceSpecification = (specifyTagExistence: boolean, tagSelector?: TagSelectorType): any => {
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

// export const setPhotosToDisplaySpecRedux = (photosToDisplaySpec: PhotosToDisplaySpec): any => {
//   return {
//     type: SET_PHOTOS_TO_DISPLAY_SPEC_STATE,
//     photosToDisplaySpec,
//   };
// };

// export const setDateSelectorRedux = (dateSelector: DateSelectorType): any => {
//   return {
//     type: SET_DATE_SELECTOR,
//     dateSelector,
//   };
// };

// export const setTagSelectorRedux = (tagSpec: TagSelectorType): any => {
//   return {
//     type: SET_TAG_SELECTOR,
//     tagSpec,
//   };
// };

// export const setStartDateRedux = (startDate: string): any => {
//   return {
//     type: SET_START_DATE,
//     startDate,
//   };
// };

// export const setEndDateRedux = (endDate: string): any => {
//   return {
//     type: SET_END_DATE,
//     endDate,
//   };
// };

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
    // case SET_PHOTOS_TO_DISPLAY_SPEC_STATE: {
    //   return (action as any).photosToDisplaySpec;
    // }
    // case SET_DATE_SELECTOR: {
    //   return {
    //     ...state,
    //     dateSelector: (action as any).dateSelector
    //   };
    // }
    // case SET_TAG_SELECTOR: {
    //   return {
    //     ...state,
    //     tagSelector: (action as any).tagSpec
    //   };
    // }
    // case SET_START_DATE: {
    //   return { ...state, startDate: (action as any).startDate };
    // }
    // case SET_END_DATE: {
    //   return { ...state, endDate: (action as any).endDate };
    // }
    default:
      return state;
  }
};
