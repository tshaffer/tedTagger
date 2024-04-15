import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/TedTagger.css';
import { IconButton } from '@mui/material';
import { TedTaggerDispatch, setLoupeViewMediaItemIdRedux, setPhotoLayoutRedux } from '../models';

import GridViewIcon from '@mui/icons-material/GridView';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CompareIcon from '@mui/icons-material/Compare';
import { MediaItem, PhotoLayout } from '../types';
import { getSelectedMediaItemIds, getMediaItems } from '../selectors';

export interface TopToolbarProps {
  loupeViewMediaItemId: string;
  onSetPhotoLayout: (photoLayout: PhotoLayout) => void;
  onSetLoupeViewMediaItemId: (id: string) => any;
  onSetPhotoLayoutRedux: (photoLayout: PhotoLayout) => any;
}

const TopToolbar = (props: TopToolbarProps) => {

  function handleUpdatePhotoLayout(photoLayout: PhotoLayout): void {
    if (photoLayout === PhotoLayout.Loupe) {
      props.onSetLoupeViewMediaItemId(props.loupeViewMediaItemId);
      props.onSetPhotoLayoutRedux(PhotoLayout.Loupe);
    } else {
      props.onSetPhotoLayout(photoLayout);
    }
  }

  return (
    <div className='toolbarStyle'>
      <IconButton
        className='toolbarIconStyle'
        onClick={() => {
          handleUpdatePhotoLayout(PhotoLayout.Grid);
        }}>
        <GridViewIcon />
      </IconButton>
      <IconButton
        className='toolbarIconStyle'
        onClick={() => {
          handleUpdatePhotoLayout(PhotoLayout.Loupe);
        }}>
        <InsertPhotoIcon />
      </IconButton>
      <IconButton
        className='toolbarIconStyle'
        onClick={() => {
          handleUpdatePhotoLayout(PhotoLayout.Survey);
        }}>
        <CompareIcon />
      </IconButton>
    </div>
  );
};

function mapStateToProps(state: any) {

  let loupeViewMediaItemId: string = '';
  const selectedMediaItemIds: string[] = getSelectedMediaItemIds(state);
  if (selectedMediaItemIds.length > 0) {
    loupeViewMediaItemId = selectedMediaItemIds[0];
  } else {
    const mediaItems: MediaItem[] = getMediaItems(state);
    if (mediaItems.length === 0) {
      loupeViewMediaItemId = '';
    } else {
      loupeViewMediaItemId = mediaItems[0].googleId;
    }
  }

  return {
    loupeViewMediaItemId,
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onSetPhotoLayout: setPhotoLayoutRedux,
    onSetLoupeViewMediaItemId: setLoupeViewMediaItemIdRedux,
    onSetPhotoLayoutRedux: setPhotoLayoutRedux,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TopToolbar);

