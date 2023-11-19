import * as React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TedTaggerDispatch } from '../models';
import { Box } from '@mui/material';

import { MediaItem } from '../types';
import { getMediaItem, getSelectedMediaItemIds } from '../selectors';
import { isNil } from 'lodash';

export interface PhotoPropertiesProps  {
  selectedMediaItem: MediaItem | null,
  selectedMediaItemIds: string[],
}

const PhotoProperties = (props: PhotoPropertiesProps) => {

  if (isNil(props.selectedMediaItem)) {
    return null;
  }

  return (
    <Box sx={{ marginLeft: '8px', width: '100%', minWidth: 300, maxWidth: 360, bgcolor: 'background.paper' }}>
      <div>
        {props.selectedMediaItem!.googleId}
      </div>
    </Box>
  );

};

function mapStateToProps(state: any) {
  const selectedMediaItemIds: string[] = getSelectedMediaItemIds(state);
  const selectedMediaItem: MediaItem | null = selectedMediaItemIds.length === 0 ? null : getMediaItem(state, selectedMediaItemIds[0]);
  return {
    selectedMediaItemIds,
    selectedMediaItem,
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoProperties);
