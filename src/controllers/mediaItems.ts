import axios from 'axios';

import { TedTaggerAnyPromiseThunkAction, TedTaggerDispatch, setMediaItems, addTagToMediaItemRedux, addTagToMediaItemsRedux } from '../models';
import { serverUrl, apiUrlFragment, ServerMediaItem, MediaItem, Tag, TedTaggerState, StringToTagLUT } from '../types';
import { cloneDeep, isNil } from 'lodash';
import { getEndDate, getStartDate, getTagByLabel, getViewSpecType } from '../selectors';

export const loadMediaItems = (): TedTaggerAnyPromiseThunkAction => {
  return (dispatch: TedTaggerDispatch, getState: any) => {

    const state: TedTaggerState = getState();
    console.log('Tags on entry to loadMediaItems');
    console.log(state.tagsState.tags);

    const tagsByTagId: StringToTagLUT = {};
    state.tagsState.tags.forEach((tag) => {
      tagsByTagId[tag.id] = tag;
    });

    const viewSpec = getViewSpecType(state);
    const startDate = getStartDate(state);
    const endDate = getEndDate(state);

    const path = serverUrl + apiUrlFragment + 'mediaItemsToDisplay?viewSpec=' + viewSpec + '&startDate=' + startDate + '&endDate=' + endDate;

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

        dispatch(setMediaItems(mediaItems));
      });
  };
};

export const addTagToMediaItem = (
  mediaItem: MediaItem,
  tag: Tag,
): TedTaggerAnyPromiseThunkAction => {
  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'addTagToMediaItem';

    const updateTagsInMediaItemBody = {
      mediaItemId: mediaItem.googleId,
      tagId: tag.id,
    };

    return axios.post(
      path,
      updateTagsInMediaItemBody
    ).then((response) => {
      console.log('updateTagsInMediaItemBody response');
      console.log(response);
      dispatch(addTagToMediaItemRedux(mediaItem, tag.id));
      return mediaItem.googleId;
    }).catch((error) => {
      console.log('error');
      console.log(error);
      return '';
    });
  };

};

export const addTagToMediaItems = (
  mediaItems: MediaItem[],
  tag: Tag,
): TedTaggerAnyPromiseThunkAction => {
  return (dispatch: TedTaggerDispatch, getState: any) => {

    console.log('addTagToMediaItems');
    console.log(mediaItems);
    console.log(tag);

    const path = serverUrl + apiUrlFragment + 'addTagToMediaItems';

    const googleMediaItemIds: string[] = mediaItems.map((mediaItem: MediaItem) => {
      return mediaItem.googleId;
    });

    const updateTagsInMediaItemsBody = {
      mediaItemIds: googleMediaItemIds,
      tagId: tag.id,
    };

    return axios.post(
      path,
      updateTagsInMediaItemsBody
    ).then((response) => {
      console.log('updateTagsInMediaItemsBody response');
      console.log(response);
      dispatch(addTagToMediaItemsRedux(mediaItems, tag.id));
      // return mediaItems.googleId;
    }).catch((error) => {
      console.log('error');
      console.log(error);
      return '';
    });
  };

};

export const deleteTagFromMediaItems = (mediaItems: MediaItem[], tag: Tag): any => {
  return (dispatch: TedTaggerDispatch, getState: any) => {
    debugger;
    console.log('deleteTagFromMediaItems');
    console.log(mediaItems);
    console.log(tag);
    // dispatch(deleteTag(mediaItem, tag.id));
  };
};

