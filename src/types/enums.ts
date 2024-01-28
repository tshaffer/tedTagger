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

export enum MatchRule {
  all = 'all',
  any = 'any',
}

export enum SearchRuleType {
  Keyword = 'keyword',
  Date = 'date',
}

export enum KeywordSearchRuleType {
  Contains = 'contains',
  AreEmpty = 'areEmpty',
  AreNotEmpty = 'areNotEmpty',
}

export enum DateSearchRuleType {
  IsInTheRange = 'isInTheRange',
  IsBefore = 'isBefore',
  IsAfter = 'isAfter',
}
