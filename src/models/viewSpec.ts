import { ViewSpecState } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_START_DATE = 'SET_START_DATE';
export const SET_END_DATE = 'SET_END_DATE';

// ------------------------------------
// Actions
// ------------------------------------

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

const initialState: ViewSpecState = {
  startDate: '2000-01-01',
  endDate: '2024-01-01',
};

export const viewSpecStateReducer = (
  state: ViewSpecState = initialState,
  action: TedTaggerModelBaseAction<any>
): ViewSpecState => {
  switch (action.type) {
    case SET_START_DATE: {
      return { ...state };
    }
    case SET_END_DATE: {
      return { ...state };
    }
    default:
      return state;
  }
};
