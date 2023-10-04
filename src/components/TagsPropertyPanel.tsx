import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TedTaggerDispatch, addTag, deleteTag } from '../models';
import { getSelectdMediaItems as getSelectedMediaItems } from '../selectors';
import { ClientMediaItem } from '../types';

import TagList from './TagList';

import { Button } from '@mui/material';

export interface TagsPropertyPanelPropsFromParent {
  open: boolean;
  onClose: () => void;
}

export interface TagsPropertyPanelProps extends TagsPropertyPanelPropsFromParent {
  selectedMediaItems: ClientMediaItem[],
  onAddTagToMediaItem: (mediaItem: ClientMediaItem, tag: string) => any;
  onDeleteTagFromMediaItem: (mediaItem: ClientMediaItem, tag: string) => any;
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
      />
      <Button onClick={handleClose}>Close</Button>
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
    selectedMediaItems: getSelectedMediaItems(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onAddTagToMediaItem: addTag,
    onDeleteTagFromMediaItem: deleteTag,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TagsPropertyPanel);
