import { StringToKeywordLUT, StringToKeywordNodeLUT } from './base';
import { MediaItem, Tag, AppTagAvatar, UserTagAvatar, Takeout } from './entities';
import {
  DateSearchRuleType,
  KeywordSearchRuleType,
  MainDisplayMode,
  MatchRule,
  PhotoLayout,
  SearchRuleType,
  TagSearchOperator,
  TagSelectorType
} from './enums';

export interface TedTaggerState {
  appState: AppState;
  mediaItemsState: MediaItemsState;
  selectionsState: SelectedMediaItemsState;
  tagsState: TagsState;
  appTagAvatarsState: AppTagAvatarsState;
  userTagAvatarsState: UserTagAvatarsState;
  photosToDisplaySpec: PhotosToDisplaySpec;
  keywordsState: KeywordsState;
  searchUIState: SearchUIState;
  takeoutsState: TakeoutsState;
  photoViewSpec: PhotoViewSpec;
}

export interface AppState {
  appInitialized: boolean;
  mainDisplayMode: MainDisplayMode;
  fullScreenMediaItemId: string;
}

export interface MediaItemsState {
  mediaItems: MediaItem[];
}

export interface SelectedMediaItemsState {
  lastClickedId: string | null;
  selectedMediaItemIds: string[];
}

export interface TagsState {
  tags: Tag[];
}

export interface AppTagAvatarsState {
  defaultAvatarId: string;
  appTagAvatars: AppTagAvatar[];
}

export interface UserTagAvatarsState {
  userTagAvatars: UserTagAvatar[];
}

export interface PhotosToDisplaySpec {
  dateRangeSpecification: DateRangeSpecification;
  tagsInSearchSpecification: TagsInSearchSpecification;
}

export interface DateRangeSpecification {
  specifyDateRange: boolean;
  startDate: string;
  endDate: string;
}

export interface TagsInSearchSpecification {
  specifyTagsInSearch: boolean;
  tagSelector: TagSelectorType;
  tagIds: string[];
  tagSearchOperator: TagSearchOperator;
}

export interface KeywordsState {
  keywordsById: StringToKeywordLUT;
  keywordNodesByNodeId: StringToKeywordNodeLUT;
  keywordRootNodeId: string;
}

export interface SearchUIState {
  matchRule: MatchRule;
  searchRules: SearchRule[];
}

export interface SearchRule {
  searchRuleType: SearchRuleType;
  searchRule: KeywordSearchRule | DateSearchRule;
}

export interface DateSearchRule {
  dateSearchRuleType: DateSearchRuleType;
  date: string;
  date2?: string;
}

export interface KeywordSearchRule {
  keywordSearchRuleType: KeywordSearchRuleType;
  keywordNodeId?: string;
}

export interface TakeoutsState {
  takeouts: Takeout[];
}

export interface PhotoViewSpec {
  photoLayout: PhotoLayout;
  zoomFactor: number;
}