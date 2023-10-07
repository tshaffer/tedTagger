import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TedTaggerDispatch } from '../models';
import { getMediaItem, getSelectedMediaItemIds } from '../selectors';
import { ClientMediaItem } from '../types';

import TagList from './TagList';

import { Button } from '@mui/material';
import { isNil } from 'lodash';

export interface TagsPropertyPanelPropsFromParent {
  open: boolean;
  onClose: () => void;
}

export interface TagsPropertyPanelProps extends TagsPropertyPanelPropsFromParent {
  selectedMediaItemIds: string[],
  tags: string[],
}

const TagsPropertyPanel = (props: TagsPropertyPanelProps) => {

  const handleClose = () => {
    console.log('onClose');
    props.onClose();
  };

  if (props.selectedMediaItemIds.length !== 1) {
    return null;
  }

  return (
    <div>
      <TagList
        mediaItemId={props.selectedMediaItemIds[0]}
        tags={props.tags}
      />
      <Button onClick={handleClose}>Close</Button>
    </div>
  );
};

const getTags = (mediaItem: ClientMediaItem): string[] => {
  const tags: string[] = [];

  if (!isNil(mediaItem)) {
    mediaItem.tags.forEach((tag) => {
      tags.push(tag);
    });
  }

  return tags;
};

function mapStateToProps(state: any) {
  const selectedMediaItemIds: string[] = getSelectedMediaItemIds(state);
  const selectedMediaItem: ClientMediaItem | null = selectedMediaItemIds.length === 0 ? null : getMediaItem(state, selectedMediaItemIds[0]);
  return {
    selectedMediaItemIds,
    tags: (selectedMediaItemIds.length === 1 || isNil(selectedMediaItem)) ? getTags(selectedMediaItem as ClientMediaItem) : [],
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TagsPropertyPanel);
