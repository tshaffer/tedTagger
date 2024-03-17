import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/TedTagger.css';
import { TedTaggerDispatch } from '../models';
import { getAppInitialized, getMediaItemById, getMediaItems } from '../selectors';
import { MediaItem } from '../types';
import { getPhotoUrl } from '../utilities';
import { isNil } from 'lodash';
import { Box, Grid } from '@mui/material';
import Photo from './Photo';

export interface GridViewProps {
  appInitialized: boolean;
  allMediaItems: MediaItem[],
}

const GridView = (props: GridViewProps) => {

  const getPhotoComponent = (mediaItem: MediaItem): JSX.Element => {
    return (
      <Photo
        key={mediaItem.googleId}
        mediaItem={mediaItem}
      />
    );
  };

  if (!props.appInitialized) {
    return null;
  }
  
  if (props.allMediaItems.length === 0) {
    return null;
  }
  
  const maxMediaItemsForNow = 500;
  const mediaItemCount = props.allMediaItems.length > maxMediaItemsForNow ? maxMediaItemsForNow : props.allMediaItems.length;

  const photoComponents: JSX.Element[] = [];
  for (let mediaItemIndex = 0; mediaItemIndex < mediaItemCount; mediaItemIndex++) {
    photoComponents.push(getPhotoComponent(props.allMediaItems[mediaItemIndex]));
  }

  return (
    <Box className='gridView' sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {photoComponents}
      </Grid>
    </Box>
  );
};

function mapStateToProps(state: any, ownProps: any) {
  return {
    appInitialized: getAppInitialized(state),
    allMediaItems: getMediaItems(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GridView);
