import { cloneDeep } from 'lodash';
import { ViewSpecState, ViewSpecType } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_VIEW_SPEC_STATE = 'SET_VIEW_SPEC_STATE';
export const SET_VIEW_SPEC_TYPE = 'SET_VIEW_SPEC_TYPE';
export const SET_START_DATE = 'SET_START_DATE';
export const SET_END_DATE = 'SET_END_DATE';

// ------------------------------------
// Actions
// ------------------------------------

export const setViewSpecStateRedux = (viewSpecState: ViewSpecState): any => {
  return {
    type: SET_VIEW_SPEC_STATE,
    viewSpecState,
  };
}

export const setViewSpecTypeRedux = (viewSpec: ViewSpecType): any => {
  return {
    type: SET_VIEW_SPEC_TYPE,
    viewSpec,
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

const initialState: ViewSpecState = {
  viewSpecType: ViewSpecType.All,
  startDate: '2000-01-01',
  endDate: '2024-01-01',
};

export const viewSpecStateReducer = (
  state: ViewSpecState = initialState,
  action: TedTaggerModelBaseAction<any>
): ViewSpecState => {
  switch (action.type) {
    case SET_VIEW_SPEC_STATE: {
      return (action as any).viewSpecState;
    }
    case SET_VIEW_SPEC_TYPE: {
      const newState = cloneDeep(state);
      newState.viewSpecType = (action as any).viewSpec;
      return newState;
      // return {
      //   ...state,
      //   viewSpecType: (action as any).viewSpec
      // };
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
