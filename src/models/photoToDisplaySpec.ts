import { cloneDeep } from 'lodash';
import { PhotosToDisplaySpec, TagSelectorType, DateSelectorType } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_PHOTOS_TO_DISPLAY_SPEC_STATE = 'SET_PHOTOS_TO_DISPLAY_SPEC_STATE';
export const SET_DATE_SELECTOR = 'SET_DATE_SELECTOR';
export const SET_TAG_SELECTOR = 'SET_TAG_SELECTOR';
export const SET_START_DATE = 'SET_START_DATE';
export const SET_END_DATE = 'SET_END_DATE';

// ------------------------------------
// Actions
// ------------------------------------

export const setPhotosToDisplaySpecRedux = (photosToDisplaySpec: PhotosToDisplaySpec): any => {
  return {
    type: SET_PHOTOS_TO_DISPLAY_SPEC_STATE,
    photosToDisplaySpec,
  };
};

export const setDateSelectorRedux = (dateSelector: DateSelectorType): any => {
  return {
    type: SET_DATE_SELECTOR,
    dateSelector,
  };
};


export const setTagSelectorRedux = (tagSpec: TagSelectorType): any => {
  return {
    type: SET_TAG_SELECTOR,
    tagSpec,
  };
};

export const setStartDateRedux = (startDate: string): any => {
  return {
    type: SET_START_DATE,
    startDate,
  };
};

export const setEndDateRedux = (endDate: string): any => {
  return {
    type: SET_END_DATE,
    endDate,
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: PhotosToDisplaySpec = {
  dateSelector: DateSelectorType.All,
  tagSelector: TagSelectorType.Any,
  startDate: '2000-01-01',
  endDate: '2024-01-01',
};

export const photosToDisplaySpecReducer = (
  state: PhotosToDisplaySpec = initialState,
  action: TedTaggerModelBaseAction<any>
): PhotosToDisplaySpec => {
  switch (action.type) {
    case SET_PHOTOS_TO_DISPLAY_SPEC_STATE: {
      return (action as any).photosToDisplaySpec;
    }
    case SET_DATE_SELECTOR: {
      return {
        ...state,
        dateSelector: (action as any).dateSelector
      };
    }
    case SET_TAG_SELECTOR: {
      return {
        ...state,
        tagSelector: (action as any).tagSpec
      };
    }
    case SET_START_DATE: {
      return { ...state, startDate: (action as any).startDate };
    }
    case SET_END_DATE: {
      return { ...state, endDate: (action as any).endDate };
    }
    default:
      return state;
  }
};
