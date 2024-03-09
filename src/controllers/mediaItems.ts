import axios from 'axios';

import { TedTaggerAnyPromiseThunkAction, TedTaggerDispatch, addMediaItems, addTagToMediaItemsRedux, deleteTagFromMediaItemsRedux, replaceTagInMediaItemsRedux, addKeywordToMediaItemsRedux, addKeywordToMediaItemIdsRedux, removeKeywordFromMediaItemIdsRedux, replaceMediaItems } from '../models';
import {
  serverUrl, apiUrlFragment, ServerMediaItem, MediaItem, Tag, TedTaggerState, StringToTagLUT, KeywordNode, MatchRule, SearchRule,
} from '../types';
import { assign, cloneDeep, isNil } from 'lodash';
import {
  getDateRangeSpecification,
  getMatchRule,
  getSearchRules,
  getTagByLabel,
  getTagsInSearchSpecification,
} from '../selectors';

export const loadMediaItems = (): TedTaggerAnyPromiseThunkAction => {

  return (dispatch: TedTaggerDispatch, getState: any) => {

    const state: TedTaggerState = getState();

    const tagsByTagId: StringToTagLUT = {};
    state.tagsState.tags.forEach((tag) => {
      tagsByTagId[tag.id] = tag;
    });

    const { specifyDateRange, startDate, endDate } = getDateRangeSpecification(state);
    const { specifyTagsInSearch, tagSelector, tagIds, tagSearchOperator } = getTagsInSearchSpecification(state);

    let path = serverUrl
      + apiUrlFragment
      + 'mediaItemsToDisplay';

    path += '?specifyDateRange=' + specifyDateRange;
    path += '&startDate=' + startDate;
    path += '&endDate=' + endDate;

    path += '&specifyTagsInSearch=' + specifyTagsInSearch;
    path += '&tagSelector=' + tagSelector;
    if (tagIds.length > 0) {
      path += '&tagIds=' + tagIds.join(',');
    } else {
      path += '&tagIds=' + [].join(','); // TEDTODO - simpler way?
    }
    path += '&tagSearchOperator=' + tagSearchOperator;


    return axios.get(path)
      .then((mediaItemsResponse: any) => {

        const mediaItems: MediaItem[] = [];
        const mediaItemEntitiesFromServer: ServerMediaItem[] = (mediaItemsResponse as any).data;

        // derive mediaItems from serverMediaItems
        for (const mediaItemEntityFromServer of mediaItemEntitiesFromServer) {

          // TEDTODO - replace any
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

export const loadMediaItemsFromSearchSpec = (): TedTaggerAnyPromiseThunkAction => {
  return (dispatch: TedTaggerDispatch, getState: any) => {

    console.log('loadMediaItemsFromSearchSpec');

    const state: TedTaggerState = getState();

    const matchRule: MatchRule = getMatchRule(state);
    const searchRules: SearchRule[] = getSearchRules(state);

    let path = serverUrl
      + apiUrlFragment
      + 'mediaItemsToDisplayFromSearchSpec';

    path += '?matchRule=' + matchRule;
    path += '&searchRules=' + JSON.stringify(searchRules);

    return axios.get(path)
      .then((mediaItemsResponse: any) => {
        console.log('mediaItemsResponse');
        console.log(mediaItemsResponse);

        const mediaItems: MediaItem[] = [];
        const mediaItemEntitiesFromServer: ServerMediaItem[] = (mediaItemsResponse as any).data;

        // derive mediaItems from serverMediaItems
        for (const mediaItemEntityFromServer of mediaItemEntitiesFromServer) {
          // TEDTODO - replace any
          const mediaItem: any = cloneDeep(mediaItemEntityFromServer);
          mediaItems.push(mediaItem as MediaItem);
        }

        dispatch(replaceMediaItems(mediaItems));

      });
  };
};

export const updateKeywordAssignedToSelectedMediaItems = (
  keywordNodeId: string,
  selectedMediaItemIds: string[],
  assignKeyword: boolean
): TedTaggerAnyPromiseThunkAction => {
  return (dispatch: TedTaggerDispatch, getState: any) => {
    if (assignKeyword) {
      dispatch(addKeywordToMediaItemIdsRedux(selectedMediaItemIds, keywordNodeId));
    } else {
      dispatch(removeKeywordFromMediaItemIdsRedux(selectedMediaItemIds, keywordNodeId));
    }
    return Promise.resolve();
  };
};

export const addKeywordToMediaItems = (
  mediaItemIds: string[],
  keywordNodeId: string,
): TedTaggerAnyPromiseThunkAction => {
  return (dispatch: TedTaggerDispatch, getState: any) => {

    // const path = serverUrl + apiUrlFragment + 'addKeywordToMediaItems';

    // const googleMediaItemIds: string[] = mediaItems.map((mediaItem: MediaItem) => {
    //   return mediaItem.googleId;
    // });

    dispatch(addKeywordToMediaItemIdsRedux(mediaItemIds, keywordNodeId));
    return Promise.resolve();
    // const updateKeywordsInMediaItemsBody = {
    //   mediaItemIds: googleMediaItemIds,
    //   tagId: keywordNode.id,
    // };

    // return axios.post(
    //   path,
    //   updateKeywordsInMediaItemsBody
    // ).then((response) => {
    //   dispatch(addTagToMediaItemsRedux(mediaItems, keywordNode.id));
    //   // return mediaItems.googleId;
    // }).catch((error) => {
    //   console.log('error');
    //   console.log(error);
    //   return '';
    // });
  };
};


export const addTagToMediaItems = (
  mediaItems: MediaItem[],
  tag: Tag,
): TedTaggerAnyPromiseThunkAction => {
  return (dispatch: TedTaggerDispatch, getState: any) => {

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
      dispatch(addTagToMediaItemsRedux(mediaItems, tag.id));
      // return mediaItems.googleId;
    }).catch((error) => {
      console.log('error');
      console.log(error);
      return '';
    });
  };

};

export const replaceTagInMediaItems = (
  mediaItems: MediaItem[],
  existingTag: Tag,
  newTag: Tag,
): TedTaggerAnyPromiseThunkAction => {
  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'replaceTagInMediaItems';

    const googleMediaItemIds: string[] = mediaItems.map((mediaItem: MediaItem) => {
      return mediaItem.googleId;
    });

    const replaceTagsInMediaItemsBody = {
      mediaItemIds: googleMediaItemIds,
      existingTagId: existingTag.id,
      newTagId: newTag.id,
    };

    return axios.post(
      path,
      replaceTagsInMediaItemsBody
    ).then((response) => {
      dispatch(replaceTagInMediaItemsRedux(mediaItems, existingTag.id, newTag.id));
      // return mediaItems.googleId;
    }).catch((error) => {
      console.log('error');
      console.log(error);
      return '';
    });
  };

};

export const deleteTagFromMediaItems = (tagId: string, mediaItems: MediaItem[]): any => {

  return (dispatch: TedTaggerDispatch, getState: any) => {

    const path = serverUrl + apiUrlFragment + 'deleteTagFromMediaItems';

    const googleMediaItemIds: string[] = mediaItems.map((mediaItem: MediaItem) => {
      return mediaItem.googleId;
    });

    const deleteTagsInMediaItemsBody = {
      tagId,
      mediaItemIds: googleMediaItemIds,
    };

    return axios.post(
      path,
      deleteTagsInMediaItemsBody
    ).then((response) => {
      dispatch(deleteTagFromMediaItemsRedux(mediaItems, tagId));
      // return mediaItems.googleId;
    }).catch((error) => {
      console.log('error');
      console.log(error);
      return '';
    });
  };


};

