import * as React from 'react';
import { connect } from 'react-redux';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import '../styles/TedTagger.css';
import Photo from './Photo';
import { 
  // getMediaItemsToDisplay, 
  getMediaItems
 } from '../selectors';
import { MediaItem } from '../types';

export interface PhotoGridProps {
  mediaItems: MediaItem[],
}

const PhotoGrid = (props: PhotoGridProps) => {

  const getPhotoComponent = (mediaItem: MediaItem): JSX.Element => {
    return (
      <Photo
        key={mediaItem.googleId}
        mediaItem={mediaItem}
      />
    );
  };

  if (props.mediaItems.length === 0) {
    return null;
  }

  debugger;

  const maxMediaItemsForNow = 40;
  const mediaItemCount = props.mediaItems.length > maxMediaItemsForNow ? maxMediaItemsForNow : props.mediaItems.length;

  const photoComponents: JSX.Element[] = [];
  for (let mediaItemIndex = 0; mediaItemIndex < mediaItemCount; mediaItemIndex++) {
    photoComponents.push(getPhotoComponent(props.mediaItems[mediaItemIndex]));
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {photoComponents}
      </Grid>
    </Box>
  );
};

function mapStateToProps(state: any) {
  return {
    mediaItems: getMediaItems(state),
  };
}

export default connect(mapStateToProps)(PhotoGrid);


