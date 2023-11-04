import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TedTaggerDispatch } from '../models';
import { getMediaItem, getSelectedMediaItemIds, getTagById } from '../selectors';
import { MediaItem, Tag, TedTaggerState } from '../types';

import TagList from './TagList';

import { Button } from '@mui/material';
import { isNil } from 'lodash';

export interface TagsPropertyPanelPropsFromParent {
  onClose: () => void;
}

export interface TagsPropertyPanelProps extends TagsPropertyPanelPropsFromParent {
  selectedMediaItemIds: string[],
  tags: Tag[],
}

const TagsPropertyPanel = (props: TagsPropertyPanelProps) => {

  const handleClose = () => {
    console.log('onClose');
    props.onClose();
  };

  if (props.selectedMediaItemIds.length === 0) {
    return null;
  }

  /*
  mediaItemIds: string[],
  tags: Tag[],
  */
  return (
    <div>
      <TagList
        mediaItemIds={props.selectedMediaItemIds}
        tags={props.tags}
      />
      <Button onClick={handleClose}>Close</Button>
    </div>
  );
};

const getTags = (state: TedTaggerState, mediaItem: MediaItem): Tag[] => {
  const tags: Tag[] = [];
  if (!isNil(mediaItem)) {
    mediaItem.tagIds.forEach((tagId) => {
      const tag: Tag | null = getTagById(state, tagId);
      if (!isNil(tag)) {
        tags.push(tag);
      }
    });
  }
  return tags;
};

function mapStateToProps(state: any) {
  const selectedMediaItemIds: string[] = getSelectedMediaItemIds(state);
  const selectedMediaItem: MediaItem | null = selectedMediaItemIds.length === 0 ? null : getMediaItem(state, selectedMediaItemIds[0]);
  return {
    selectedMediaItemIds,
    tags: (selectedMediaItemIds.length === 1 || isNil(selectedMediaItem)) ? getTags(state, selectedMediaItem as MediaItem) : [],
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TagsPropertyPanel);
