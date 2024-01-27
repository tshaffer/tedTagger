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

export enum KeywordAssignedToSelectedMediaItemsStatus {
  AllSelectedMediaItemsIncludeThisKeyword = 'AllSelectedMediaItemsIncludeThisKeyword',
  SomeSelectedMediaItemsIncludeThisKeyword = 'SomeSelectedMediaItemsIncludeThisKeyword',
  NoSelectedMediaItemsIncludeThisKeyword = 'NoSelectedMediaItemsIncludeThisKeyword',
}