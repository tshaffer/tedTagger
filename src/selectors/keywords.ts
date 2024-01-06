import { isNil } from 'lodash';
import {
  Keyword,
  KeywordNode,
  KeywordTree,
  MediaItem,
  StringToTagLUT,
  Tag,
  TedTaggerState,
  Tree,
  TreeNode
} from '../types';
import { Key } from 'react';

export const getKeywords = (state: TedTaggerState): KeywordTree => {
  return state.keywordsState.keywords;
};


export function findNodeById(keywordNode: KeywordNode, id: string): KeywordNode | undefined {

  const keyword: Keyword = keywordNode.value;

  if (keyword.id === id) {
    return keywordNode;
  }

  if (keywordNode.children) {
    for (const childNode of keywordNode.children) {
      const foundNode = findNodeById(childNode, id);
      if (foundNode) {
        return foundNode;
      }
    }
  }

  return undefined;
}

function findKeywordById(id: string): KeywordNode | undefined {


  return undefined;
}


// export const getTagsLUT = (state: TedTaggerState): StringToTagLUT => {
//   const stringToTag: StringToTagLUT = {};
//   for (const tag of state.tagsState.tags) {
//     stringToTag[tag.id] = tag;
//   }
//   return stringToTag;
// };

// export const getTagById = (state: TedTaggerState, id: string): Tag | null => {
//   for (const tag of state.tagsState.tags) {
//     if (tag.id === id) {
//       return tag;
//     }
//   }
//   return null;
// };

// export const getTagByLabel = (state: TedTaggerState, label: string): Tag | null => {
//   for (const tag of state.tagsState.tags) {
//     if (tag.label === label) {
//       return tag;
//     }
//   }
//   return null;
// };

// export const isTagInUse = (state: TedTaggerState, tagId: string): boolean => {
//   const matchingInputItem: MediaItem | undefined = state.mediaItemsState.mediaItems.find((mediaItem) => mediaItem.tagIds.includes(tagId));
//   return !isNil(matchingInputItem);
// };
