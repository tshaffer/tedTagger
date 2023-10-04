import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TedTaggerDispatch, addTag, deleteTag } from '../models';
import { getSelectedMediaItems } from '../selectors';
import { ClientMediaItem } from '../types';

import TagList from './TagList';

import { Button } from '@mui/material';
import { isNil } from 'lodash';

export interface TagsPropertyPanelPropsFromParent {
  open: boolean;
  onClose: () => void;
}

export interface TagsPropertyPanelProps extends TagsPropertyPanelPropsFromParent {
  selectedMediaItems: ClientMediaItem[],
  tags: string[],
}

const TagsPropertyPanel = (props: TagsPropertyPanelProps) => {

  const handleClose = () => {
    console.log('onClose');
    props.onClose();
  };

  if (props.selectedMediaItems.length !== 1) {
    return null;
  }

  return (
    <div>
      <TagList
        mediaItem={props.selectedMediaItems[0]}
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
  const selectedMediaItems: ClientMediaItem[] = getSelectedMediaItems(state);
  return {
    selectedMediaItems,
    tags: (selectedMediaItems.length === 1) ? getTags(selectedMediaItems[0]) : [],
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TagsPropertyPanel);
