import axios from 'axios';

import { TedTaggerAnyPromiseThunkAction, TedTaggerDispatch, addMediaItems, addTagToMediaItemsRedux, deleteTagFromMediaItemsRedux, replaceTagInMediaItemsRedux, addKeywordToMediaItemIdsRedux, removeKeywordFromMediaItemIdsRedux, replaceMediaItems, deleteMediaItemsRedux, clearMediaItemSelection } from '../models';
import {
  serverUrl, apiUrlFragment, ServerMediaItem, MediaItem, TedTaggerState, MatchRule, SearchRule,
} from '../types';
import { cloneDeep, isNil } from 'lodash';
import {
  getMatchRule,
  getSearchRules,
} from '../selectors';

export const loadMediaItems = (): TedTaggerAnyPromiseThunkAction => {

  return (dispatch: TedTaggerDispatch) => {

    const specifyDateRange = false;
    const startDate = (new Date()).toISOString();
    const endDate = (new Date()).toISOString();

    let path = serverUrl
      + apiUrlFragment
      + 'mediaItemsToDisplay';

    path += '?specifyDateRange=' + specifyDateRange;
    path += '&startDate=' + startDate;
    path += '&endDate=' + endDate;

    path += '&specifyTagsInSearch=false&tagSelector=untagged&tagIds=&tagSearchOperator=OR';

    return axios.get(path)
      .then((mediaItemsResponse: any) => {

        const mediaItems: MediaItem[] = [];
        const mediaItemEntitiesFromServer: ServerMediaItem[] = (mediaItemsResponse as any).data;

        // derive mediaItems from serverMediaItems
        for (const mediaItemEntityFromServer of mediaItemEntitiesFromServer) {

          // TEDTODO - replace any
          const mediaItem: any = cloneDeep(mediaItemEntityFromServer);
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

export const deleteMediaItems = (mediaItemIds: string[]) => {

  return (dispatch: TedTaggerDispatch) => {

    const path = serverUrl + apiUrlFragment + 'deleteMediaItems';

    const deleteMediaItemsBody = { mediaItemIds };

    return axios.post(
      path,
      deleteMediaItemsBody
    ).then((response) => {
      dispatch(clearMediaItemSelection());
      dispatch(deleteMediaItemsRedux(mediaItemIds));
    }).catch((error) => {
      console.log('error');
      console.log(error);
      return '';
    });
  };
};
