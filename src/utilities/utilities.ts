import path from 'path-browserify';
import { AppTagAvatar, Tag } from '../types';

export const getTagAvatarUrl = (tag: Tag, appTagAvatars: AppTagAvatar[]): string => {

  let tagAvatarUrl = '';

  if (tag.avatarType === 'app') {
    let appTagAvatarPath = '';
    for (const appTagAvatar of appTagAvatars) {
      if (appTagAvatar.id === tag.avatarId) {
        appTagAvatarPath = appTagAvatar.path;
        break;
      }
    }
    if (appTagAvatarPath === '') {
      debugger;
      throw new Error('appTagAvatarPath is empty');
    }
    tagAvatarUrl = path.join('appAvatars', appTagAvatarPath);
  } else {
    debugger;
    tagAvatarUrl = path.join('userAvatars', tag.avatarId);
  }

  return tagAvatarUrl;
};

export const formatISOString = (ISOString: string): string => {

  const date = new Date(ISOString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  return formattedDate;
};

// Example usage
// const isoString = new Date().toISOString();
// const formattedDate = formatISOString(isoString);
// console.log(formattedDate);
