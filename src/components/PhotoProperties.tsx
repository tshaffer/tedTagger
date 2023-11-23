import * as React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TedTaggerDispatch } from '../models';
import { Box } from '@mui/material';

import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

import { MediaItem } from '../types';
import { getMediaItem, getSelectedMediaItemIds } from '../selectors';
import { isNil } from 'lodash';
import { formatISOString } from '../utilities';

export interface PhotoPropertiesProps {
  selectedMediaItem: MediaItem | null,
  selectedMediaItemIds: string[],
}

const PhotoProperties = (props: PhotoPropertiesProps) => {

  if (isNil(props.selectedMediaItem)) {
    return null;
  }

  const renderCreationTime = (): JSX.Element | null => {

    if (isNil(props.selectedMediaItem!.creationTime)) {
      return null;
    }

    const formattedDate = formatISOString(props.selectedMediaItem!.creationTime);

    return (
      <div>
        <EventOutlinedIcon />
        {formattedDate}
      </div>
    );
  };

  const renderFileName = (): JSX.Element | null => {

    if (isNil(props.selectedMediaItem!.fileName)) {
      return null;
    }

    return (
      <div>
        <ImageOutlinedIcon />
        {props.selectedMediaItem!.fileName}
      </div>
    );
  };

  return (
    <Box sx={{ marginLeft: '8px', width: '100%', minWidth: 300, maxWidth: 360, bgcolor: 'background.paper' }}>
      <div>
        {renderCreationTime()}
        {renderFileName()}
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
