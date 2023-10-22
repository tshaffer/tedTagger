import axios from 'axios';

import { TedTaggerAnyPromiseThunkAction, TedTaggerDispatch, addMediaItems, addTagToMediaItemRedux, deleteTag } from '../models';
import { serverUrl, apiUrlFragment, ServerMediaItem, MediaItem, Tag, TedTaggerState, StringToStringLUT, StringToTagLUT } from '../types';
import { cloneDeep, isNil } from 'lodash';
import { getTagByLabel } from '../selectors';

export const loadMediaItems = (): TedTaggerAnyPromiseThunkAction => {
  return (dispatch: TedTaggerDispatch, getState: any) => {

    const state: TedTaggerState = getState();
    console.log('Tags on entry to loadMediaItems');
    console.log(state.tagsState.tags);

    const tagsByTagId: StringToTagLUT = {};
    state.tagsState.tags.forEach((tag) => {
      tagsByTagId[tag.id] = tag;
    });

    const path = serverUrl + apiUrlFragment + 'mediaItems';

    return axios.get(path)
      .then((mediaItemsResponse: any) => {

        const mediaItems: MediaItem[] = [];
        const mediaItemEntitiesFromServer: ServerMediaItem[] = (mediaItemsResponse as any).data;

        // derive mediaItems from serverMediaItems
        for (const mediaItemEntityFromServer of mediaItemEntitiesFromServer) {

          const mediaItem: any = cloneDeep(mediaItemEntityFromServer);

          const description: string = isNil(mediaItemEntityFromServer.description) ? '' : mediaItemEntityFromServer.description;
          if (description.startsWith('TedTag-')) {
            // mediaItem includes one or more tags
            const tagsSpec: string = description.substring('TedTag-'.length);
            const tagLabels: string[] = tagsSpec.split(':');
            tagLabels.forEach((tagLabel: string) => {
              const tag: Tag | null = getTagByLabel(state, tagLabel);
              if (!isNil(tag)) {
                (mediaItem as MediaItem).tagIds.push(tag.id);
              }
            });
          }

          mediaItems.push(mediaItem as MediaItem);

        }

        dispatch(addMediaItems(mediaItems));

      });
  };
};

export const deleteTagFromMediaItem = (mediaItem: MediaItem, tag: Tag): any => {
  return (dispatch: TedTaggerDispatch, getState: any) => {
    dispatch(deleteTag(mediaItem, tag.id));
  };
};

// export const addTagToMediaItem = (
//   mediaItem: MediaItem,
//   tag: Tag,
// ) => {
//   return (dispatch: TedTaggerDispatch, getState: any) => {
//     dispatch(addTagToMediaItemRedux(mediaItem, tag));
//   };
// };
