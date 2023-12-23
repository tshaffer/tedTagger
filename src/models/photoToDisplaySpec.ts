import { PhotosToDisplaySpec, TagSearchOperator, TagSelectorType } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_PHOTOS_TO_DISPLAY_SPEC_STATE = 'SET_PHOTOS_TO_DISPLAY_SPEC_STATE';

export const SET_SPECIFY_DATE_RANGE = 'SET_SPECIFY_DATE_RANGE';
export const SET_START_DATE = 'SET_SPECIFY_START_DATE';
export const SET_END_DATE = 'SET_SPECIFY_END_DATE';

export const SET_SPECIFY_TAGS_IN_SEARCH = 'SET_SPECIFY_TAGS_IN_SEARCH';
export const SET_TAG_SELECTOR = 'SET_TAG_SELECTOR';
export const ADD_SEARCH_TAG = 'ADD_SEARCH_TAG';
export const REMOVE_SEARCH_TAG = 'REMOVE_SEARCH_TAG';
export const REPLACE_SEARCH_TAG = 'REPLACE_SEARCH_TAG';
export const SET_TAG_SEARCH_OPERATOR = 'SET_TAG_SEARCH_OPERATOR';

// ------------------------------------
// Actions
// ------------------------------------

// interface SetPhotosToDisplaySpecPayload {
//   photosToDisplaySpec: PhotosToDisplaySpec
// }

// export const setPhotosToDisplaySpecRedux = (photosToDisplaySpec: PhotosToDisplaySpec): any => {
//   return {
//     type: SET_PHOTOS_TO_DISPLAY_SPEC_STATE,
//     payload: {
//       photosToDisplaySpec,
//     },
//   };
// };

interface SetSpecifyDateRangePayload {
  specifyDateRange: boolean,
}

export const setSpecifyDateRangeRedux = (specifyDateRange: boolean): any => {
  return {
    type: SET_SPECIFY_DATE_RANGE,
    payload: {
      specifyDateRange,
    },
  };
};

interface SetStartDatePayload {
  startDate: string,
}

export const setStartDateRedux = (startDate: string): any => {
  return {
    type: SET_START_DATE,
    payload: {
      startDate,
    },
  };
};

interface SetEndDatePayload {
  endDate: string,
}

export const setEndDateRedux = (endDate: string): any => {
  return {
    type: SET_END_DATE,
    payload: {
      endDate,
    },
  };
};

interface SetSpecifyTagsInSearchPayload {
  specifyTagsInSearch: boolean,
}

export const setSpecifyTagsInSearchRedux = (specifyTagsInSearch: boolean): any => {
  return {
    type: SET_SPECIFY_TAGS_IN_SEARCH,
    payload: {
      specifyTagsInSearch,
    },
  };
};

interface SetTagSelectorPayload {
  tagSelector: TagSelectorType,
}

export const setTagSelectorRedux = (tagSelector: TagSelectorType): any => {
  return {
    type: SET_TAG_SELECTOR,
    payload: {
      tagSelector,
    },
  };
};

interface AddRemoveSearchTagPayload {
  tagId: string,
}

export const addSearchTagRedux = (tagId: string): any => {
  return {
    type: ADD_SEARCH_TAG,
    payload: {
      tagId,
    },
  };
};

export const removeSearchTagRedux = (tagId: string): any => {
  return {
    type: REMOVE_SEARCH_TAG,
    payload: {
      tagId,
    },
  };
};

interface ReplaceSearchTagPayload {
  existingTagId: string,
  newTagId: string,
}

export const replaceSearchTagRedux = (
  existingTagId: string,
  newTagId: string,
): any => {
  return {
    type: REPLACE_SEARCH_TAG,
    payload: {
      existingTagId,
      newTagId,
    },
  };
};

interface SetTagSearchOperatorPayload {
  tagSearchOperator: TagSearchOperator,
}

export const setTagSearchOperatorRedux = (tagSearchOperator: TagSearchOperator): any => {
  return {
    type: SET_TAG_SEARCH_OPERATOR,
    payload: {
      tagSearchOperator,
    },
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: PhotosToDisplaySpec = {
  dateRangeSpecification: {
    specifyDateRange: false,
    startDate: (new Date()).toISOString(),    // TEDTODO - initialize to fixed date
    endDate: (new Date()).toISOString(),
  },
  tagsInSearchSpecification: {
    specifyTagsInSearch: false,
    tagSelector: TagSelectorType.Untagged,
    tagIds: [],
    tagSearchOperator: TagSearchOperator.OR,
  },
};

// action: TedTaggerModelBaseAction<SetPhotosToDisplaySpecPayload &SetSpecifyDateRangePayload &SetStartDatePayload &SetEndDatePayload &SetSpecifyTagsInSearchPayload &SetTagSelectorPayload &AddRemoveSearchTagPayload &ReplaceSearchTagPayload &SetTagSearchOperatorPayload

export const photosToDisplaySpecReducer = (
  state: PhotosToDisplaySpec = initialState,
  action: TedTaggerModelBaseAction<SetSpecifyDateRangePayload &SetStartDatePayload &SetEndDatePayload &SetSpecifyTagsInSearchPayload &SetTagSelectorPayload &AddRemoveSearchTagPayload &ReplaceSearchTagPayload &SetTagSearchOperatorPayload
  >
): PhotosToDisplaySpec => {
  switch (action.type) {
    // case SET_PHOTOS_TO_DISPLAY_SPEC_STATE: {
    //   return (action.payload as SetPhotosToDisplaySpecPayload).photosToDisplaySpec;
    // }
    case SET_SPECIFY_DATE_RANGE: {
      return {
        ...state,
        dateRangeSpecification:
        {
          ...state.dateRangeSpecification,
          specifyDateRange: (action.payload as SetSpecifyDateRangePayload).specifyDateRange,
        }
      };
    }
    case SET_START_DATE: {
      return {
        ...state,
        dateRangeSpecification:
        {
          ...state.dateRangeSpecification,
          startDate: (action.payload as SetStartDatePayload).startDate,
        }
      };
    }
    case SET_END_DATE: {
      return {
        ...state,
        dateRangeSpecification:
        {
          ...state.dateRangeSpecification,
          endDate: (action.payload as SetEndDatePayload).endDate,
        }
      };
    }
    case SET_SPECIFY_TAGS_IN_SEARCH: {
      return {
        ...state,
        tagsInSearchSpecification:
        {
          ...state.tagsInSearchSpecification,
          specifyTagsInSearch: (action.payload as SetSpecifyTagsInSearchPayload).specifyTagsInSearch,
        }
      };
    }
    case SET_TAG_SELECTOR: {
      return {
        ...state,
        tagsInSearchSpecification:
        {
          ...state.tagsInSearchSpecification,
          tagSelector: (action.payload as SetTagSelectorPayload).tagSelector,
        }
      };
    }
    case ADD_SEARCH_TAG: {
      return {
        ...state,
        tagsInSearchSpecification:
        {
          ...state.tagsInSearchSpecification,
          tagIds: [...state.tagsInSearchSpecification.tagIds, (action.payload as AddRemoveSearchTagPayload).tagId],
        }
      };
    }
    case REMOVE_SEARCH_TAG: {
      return {
        ...state,
        tagsInSearchSpecification:
        {
          ...state.tagsInSearchSpecification,
          tagIds: state.tagsInSearchSpecification.tagIds.filter((tagId: string) => tagId !== (action.payload as AddRemoveSearchTagPayload).tagId),
        }
      };
    }
    case REPLACE_SEARCH_TAG: {
      return {
        ...state,
        tagsInSearchSpecification:
        {
          ...state.tagsInSearchSpecification,
          tagIds: state.tagsInSearchSpecification.tagIds.map((tagId: string) => tagId === (action.payload as any).existingTagId ? (action.payload as ReplaceSearchTagPayload).newTagId : tagId)
        }
      };
    }
    case SET_TAG_SEARCH_OPERATOR: {
      return {
        ...state,
        tagsInSearchSpecification:
        {
          ...state.tagsInSearchSpecification,
          tagSearchOperator: state.tagsInSearchSpecification.specifyTagsInSearch ? (action.payload as SetTagSearchOperatorPayload).tagSearchOperator : TagSearchOperator.OR,
        }
      };
    }
    default:
      return state;
  }
};
