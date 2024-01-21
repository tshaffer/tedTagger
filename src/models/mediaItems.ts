import { cloneDeep, isNil } from 'lodash';

import { MediaItem, MediaItemsState } from '../types';
import { TedTaggerModelBaseAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_MEDIA_ITEMS = 'SET_MEDIA_ITEMS';
export const ADD_KEYWORD_TO_MEDIA_ITEM_IDS = 'ADD_KEYWORD_TO_MEDIA_ITEM_IDS';
export const ADD_KEYWORD_TO_MEDIA_ITEMS = 'ADD_KEYWORD_TO_MEDIA_ITEMS';
export const ADD_TAG_TO_MEDIA_ITEMS = 'ADD_TAG_TO_MEDIA_ITEMS';
export const REPLACE_TAG_IN_MEDIA_ITEMS = 'REPLACE_TAG_IN_MEDIA_ITEMS';
export const DELETE_TAG_FROM_MEDIA_ITEMS = 'DELETE_TAG_FROM_MEDIA_ITEMS';

// ------------------------------------
// Actions
// ------------------------------------

interface SetMediaItemsPayload {
  mediaItems: MediaItem[];
}

export const setMediaItems = (
  mediaItems: MediaItem[],
): any => {
  return {
    type: SET_MEDIA_ITEMS,
    payload: {
      mediaItems
    }
  };
};

interface AddKeywordToMediaItemIdsPayload {
  mediaItemIds: string[];
  keywordNodeId: string;
}

export const addKeywordToMediaItemIdsRedux = (
  mediaItemIds: string[],
  keywordNodeId: string,
): any => {
  return {
    type: ADD_KEYWORD_TO_MEDIA_ITEM_IDS,
    payload: {
      mediaItemIds,
      keywordNodeId,
    }
  };
};

interface AddKeywordToMediaItemsPayload {
  mediaItem: MediaItem[];
  keywordNodeId: string;
}

export const addKeywordToMediaItemsRedux = (
  mediaItems: MediaItem[],
  keywordNodeId: string,
): any => {
  return {
    type: ADD_KEYWORD_TO_MEDIA_ITEMS,
    payload: {
      mediaItems,
      keywordNodeId,
    }
  };
};

// interface AddTagToMediaItemsPayload {
//   mediaItem: MediaItem[];
//   tagId: string;
// }

export const addTagToMediaItemsRedux = (
  mediaItems: MediaItem[],
  tagId: string,
): any => {
  return {
    type: ADD_TAG_TO_MEDIA_ITEMS,
    payload: {
      mediaItems,
      tagId,
    }
  };
};

// interface ReplaceTagInMediaItemsPayload {
//   mediaItem: MediaItem[];
//   existingTagId: string,
//   newTagId: string,
// }

export const replaceTagInMediaItemsRedux = (
  mediaItems: MediaItem[],
  existingTagId: string,
  newTagId: string,
): any => {
  return {
    type: REPLACE_TAG_IN_MEDIA_ITEMS,
    payload: {
      mediaItems,
      existingTagId,
      newTagId,
    }
  };
};

// interface DeleteTagFromMediaItemsPayload {
//   mediaItems: MediaItem[];
//   tagId: string;
// }

export const deleteTagFromMediaItemsRedux = (
  mediaItems: MediaItem[],
  tagId: string,
): any => {
  return {
    type: DELETE_TAG_FROM_MEDIA_ITEMS,
    payload: {
      mediaItems,
      tagId,
    }
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: MediaItemsState =
{
  mediaItems: [],
};

export const mediaItemsStateReducer = (
  state: MediaItemsState = initialState,
  // action: TedTaggerModelBaseAction<SetMediaItemsPayload & AddTagToMediaItemsPayload & DeleteTagFromMediaItemsPayload & ReplaceTagInMediaItemsPayload>
  action: TedTaggerModelBaseAction<SetMediaItemsPayload & AddKeywordToMediaItemsPayload & AddKeywordToMediaItemIdsPayload>
): MediaItemsState => {
  switch (action.type) {
    case SET_MEDIA_ITEMS: {
      return { ...state, mediaItems: action.payload.mediaItems };
    }
    case ADD_KEYWORD_TO_MEDIA_ITEM_IDS: {
      const newState = cloneDeep(state) as MediaItemsState;
      newState.mediaItems.forEach((mediaItem) => {
        const matchingInputItem = action.payload.mediaItemIds.find((inputItemId) => inputItemId === mediaItem.googleId);
        if (matchingInputItem) {
          if (isNil(mediaItem.keywordNodeIds)) {
            mediaItem.keywordNodeIds = [action.payload.keywordNodeId];
          } else {
            const keywordNodeIndex = mediaItem.keywordNodeIds.indexOf(action.payload.keywordNodeId);
            if (keywordNodeIndex === -1) {
              mediaItem.keywordNodeIds.push(action.payload.keywordNodeId);
            }
          }
        }
      });
      return newState;
    }
    case ADD_KEYWORD_TO_MEDIA_ITEMS: {
      const newState = cloneDeep(state) as MediaItemsState;
      newState.mediaItems.forEach((item) => {
        const matchingInputItem = action.payload.mediaItems.find((inputItem) => inputItem.googleId === item.googleId);
        if (matchingInputItem) {
          const keywordNodeIndex = item.keywordNodeIds.indexOf(action.payload.keywordNodeId);
          if (keywordNodeIndex === -1) {
            item.keywordNodeIds.push(action.payload.keywordNodeId);
          }
        }
      });
      return newState;
    }
    // case ADD_TAG_TO_MEDIA_ITEMS: {
    //   const newState = cloneDeep(state) as MediaItemsState;
    //   newState.mediaItems.forEach((item) => {
    //     const matchingInputItem = action.payload.mediaItems.find((inputItem) => inputItem.googleId === item.googleId);
    //     if (matchingInputItem) {
    //       const tagIndex = item.tagIds.indexOf(action.payload.tagId);
    //       if (tagIndex === -1) {
    //         item.tagIds.push(action.payload.tagId);
    //       }
    //     }
    //   });
    //   return newState;
    // }
    // case REPLACE_TAG_IN_MEDIA_ITEMS: {
    //   const newState = cloneDeep(state) as MediaItemsState;
    //   newState.mediaItems.forEach((item) => {
    //     const matchingInputItem = action.payload.mediaItems.find((inputItem) => inputItem.googleId === item.googleId);
    //     if (matchingInputItem) {
    //       const tagIndex = item.tagIds.indexOf(action.payload.existingTagId);
    //       if (tagIndex >= 0) {
    //         item.tagIds[tagIndex] = action.payload.newTagId;
    //       }
    //     }
    //   });
    //   return newState;
    // }
    // case DELETE_TAG_FROM_MEDIA_ITEMS: {
    //   const newState = cloneDeep(state) as MediaItemsState;
    //   newState.mediaItems.forEach((item) => {
    //     const matchingInputItem = action.payload.mediaItems.find((inputItem) => inputItem.googleId === item.googleId);
    //     if (matchingInputItem) {
    //       const tagIndex = item.tagIds.indexOf(action.payload.tagId);
    //       if (tagIndex !== -1) {
    //         item.tagIds.splice(tagIndex, 1);
    //       }
    //     }
    //   }); 
    //   console.log(newState);
    //   return newState;
    // }
    default:
      return state;
  }
};
