export enum MainDisplayMode {
  Grid = 'grid',
  FullScreen = 'fullScreen',
}

export enum TagSelectorType {
  Untagged = 'untagged',
  Tagged = 'tagged',
  TagList = 'tagList',
}

export enum TagSearchOperator {
  AND = 'AND',
  OR = 'OR',
}

/*
  const getKeywordAssignedToSelectedMediaItemsStatus = (): any => {
    if (Object.prototype.hasOwnProperty.call(mapKeywordNodeIdToSelectedMediaItemIds, nodeId)) {
      const selectedMediaItemIdsThatIncludeThisKeyword: string[] = mapKeywordNodeIdToSelectedMediaItemIds[nodeId];
      if (selectedMediaItemIdsThatIncludeThisKeyword.length === 0) {
        debugger;
      } else if (selectedMediaItemIdsThatIncludeThisKeyword.length === selectedMediaItemIds.length) {
        return 'allSelectedMediaItemsIncludeThisKeyword';
      } else {
        return 'someSelectedMediaItemsIncludeThisKeyword';
      }
    }
    return 'noSelectedMediaItemsIncludeThisKeyword';
  };
*/

export enum KeywordAssignedToSelectedMediaItemsStatus {
  AllSelectedMediaItemsIncludeThisKeyword = 'AllSelectedMediaItemsIncludeThisKeyword',
  SomeSelectedMediaItemsIncludeThisKeyword = 'SomeSelectedMediaItemsIncludeThisKeyword',
  NoSelectedMediaItemsIncludeThisKeyword = 'NoSelectedMediaItemsIncludeThisKeyword',
}