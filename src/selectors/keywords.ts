import { isNil } from 'lodash';
import {
  Keyword,
  KeywordNode,
  KeywordTree,
  MediaItem,
  StringToTagLUT,
  Tag,
  TedTaggerState,
} from '../types';
import { Key } from 'react';

export const getKeywords = (state: TedTaggerState): KeywordTree => {
  return state.keywordsState.keywords;
};

/*
function findNodeByIdByChatGPT(treeNode: TreeNode, id: string): TreeNode | undefined {
  if (treeNode.id === id) {
    return treeNode;
  }

  if (treeNode.children) {
    for (const childId of treeNode.children) {
      const childNode = findNodeById(treeNode, childId);
      if (childNode) {
        return childNode;
      }
    }
  }

  return undefined;
}
*/

export function findNodeById(keywordNode: KeywordNode, id: string): KeywordNode | undefined {

  if (keywordNode.id === id) {
    return keywordNode;
  }

  if (keywordNode.childrenIds) {
    for (const childId of keywordNode.childrenIds) {
      const childNode = findNodeById(keywordNode, childId);
      if (childNode) {
        return childNode;
      }
    }
  }

  return undefined;
}

// function findKeywordById(id: string): KeywordNode | undefined {


//   return undefined;
// }


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
