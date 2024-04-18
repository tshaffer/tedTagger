import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/TedTagger.css';
import { TedTaggerDispatch } from '../models';
import { getAppInitialized, getMediaItems, getNumGridColumns, getScrollPosition } from '../selectors';
import { MediaItem } from '../types';
import { Box, Grid } from '@mui/material';
import Photo from './Photo';

export interface GridViewProps {
  appInitialized: boolean;
  allMediaItems: MediaItem[],
  numGridColumns: number;
  scrollPosition: number;
}

const GridView = (props: GridViewProps) => {

  React.useEffect(() => {

    console.log('GridView React.useEffect for GridViw invoked');

    const divElement = document.getElementById('centerColumn') as HTMLDivElement | null;
    if (divElement) {
      console.log('set scroll position: ', props.scrollPosition);
      divElement.scrollTop = props.scrollPosition;
    } else {
      console.log('divElement does not exist');
    }

    return () => {
      console.log('GridView React.useEffect for removing event listener invoked');
    };
  }, []);


  const getPhotoComponent = (mediaItem: MediaItem): JSX.Element => {
    return (
      <Photo
        key={mediaItem.googleId}
        mediaItem={mediaItem}
        numGridColumns={props.numGridColumns}
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
    numGridColumns: getNumGridColumns(state),
    scrollPosition: getScrollPosition(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GridView);
