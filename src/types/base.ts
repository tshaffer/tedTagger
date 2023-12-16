import { AppTagAvatar, MediaItem, Tag, UserTagAvatar } from './entities';

export const serverUrl = 'http://localhost:8000';
// export const serverUrl = 'https://tsmealwheel.herokuapp.com';

export const apiUrlFragment = '/api/v1/';

export type StringToStringLUT = {
  [key: string]: string;
}

export type StringToTagLUT = {
  [key: string]: Tag;
}
