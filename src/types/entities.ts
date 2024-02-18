export interface GeoData {
  latitude: number;
  longitude: number;
  altitude: number;
  latitudeSpan: number;
  longitudeSpan: number;
}

export interface ServerPerson {
  _id: string;
  name: string;
}

export interface ServerMediaItem {
  googleId: string,
  fileName: string,
  albumId: string;
  filePath?: string,
  productUrl?: string,
  baseUrl?: string,
  mimeType?: string,
  creationTime?: string,
  width?: number,
  height?: number
  orientation?: number,
  description?: string,
  geoData?: GeoData,
  people?: ServerPerson[],
  tagIds: string[],
}

export interface MediaItem {
  googleId: string,
  fileName: string,
  albumId: string;
  filePath?: string,
  productUrl?: string,
  baseUrl?: string,
  mimeType?: string,
  creationTime?: string,
  width?: number,
  height?: number
  orientation?: number,
  description?: string,
  geoData?: GeoData,
  people?: string[],
  tagIds: string[],
  keywordNodeIds: string[],
}

export interface Tag {
  id: string;
  label: string;
  type: string;
  avatarType: string;
  avatarId: string;
}

export interface AppTagAvatar {
  id: string;
  label: string;
  pathToLarge: string;
  path: string;
}

export interface UserTagAvatar {
  id: string;
  label: string;
  path: string;
}

export interface Keyword {
  keywordId: string;
  label: string;
  type: string;
}

export interface KeywordNode {
  nodeId: string;
  keywordId: string;
  parentNodeId?: string;
  childrenNodeIds?: string[];
}

export interface KeywordNodeDeep {
  nodeId: string;
  keywordId: string;
  childNodeIds: string[];
  childNodes: KeywordNodeDeep[];
}

export interface KeywordTreeDeep {
  root: KeywordNodeDeep;
}

export interface KeywordData {
  keywords: Keyword[];
  keywordNodes: KeywordNode[];
  keywordRootNodeId: string;
}

export interface Takeout {
  id: string;
  label: string;
  albumName: string;
  path: string;
}

export interface AddedTakeoutData {
  addedKeywordData: KeywordData;
  addedMediaItems: MediaItem[];
}
