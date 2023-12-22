import { PhotosToDisplaySpec, TagSearchOperator, TagSelectorType } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_PHOTOS_TO_DISPLAY_SPEC_STATE = 'SET_PHOTOS_TO_DISPLAY_SPEC_STATE';
export const SET_DATE_RANGE = 'SET_DATE_RANGE';
export const SET_TAG_EXISTENCE = 'SET_TAG_EXISTENCE';
export const SET_TAGS_SPECIFICATION = 'SET_TAGS_SPECIFICATION';
export const ADD_SEARCH_TAG = 'ADD_SEARCH_TAG';
export const REMOVE_SEARCH_TAG = 'REMOVE_SEARCH_TAG';
export const REPLACE_SEARCH_TAG = 'REPLACE_SEARCH_TAG';
export const SET_TAG_SEARCH_OPERATOR = 'SET_TAG_SEARCH_OPERATOR';

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

interface AddRemoveSearchTagPayload {
  tagId: string[],
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
  specifyDateRange: false,
  specifyTagExistence: false,
  specifySearchWithTags: false,
  tagIds: [],
};

export const photosToDisplaySpecReducer = (
  state: PhotosToDisplaySpec = initialState,
  action: TedTaggerModelBaseAction<SetPhotosToDisplaySpecPayload & SetDateRangeSpecificationPayload 
  & SetTagExistenceSpecificationPayload & SetTagsSpecificationPayload & AddRemoveSearchTagPayload & ReplaceSearchTagPayload
  & SetTagSearchOperatorPayload>
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
    case ADD_SEARCH_TAG: {
      return {
        ...state,
        tagIds: [...state.tagIds, (action.payload as any).tagId],
      };
    }
    case REMOVE_SEARCH_TAG: {
      return {
        ...state,
        tagIds: state.tagIds.filter((tagId: string) => tagId !== (action.payload as any).tagId),
      };
    }
    case REPLACE_SEARCH_TAG: {
      return {
        ...state,
        tagIds: state.tagIds.map((tagId: string) => tagId === (action.payload as any).existingTagId ? (action.payload as any).newTagId : tagId),
      };
    }
    case SET_TAG_SEARCH_OPERATOR: {
      return {
        ...state,
        tagSearchOperator: (action.payload as any).tagSearchOperator,
      };
    }
    default:
      return state;
  }
};
