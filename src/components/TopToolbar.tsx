import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/TedTagger.css';
import { IconButton, Slider, Typography } from '@mui/material';
import { TedTaggerDispatch, selectMediaItem, setLoupeViewMediaItemIdRedux, setPhotoLayoutRedux } from '../models';

import GridOnIcon from '@mui/icons-material/GridOn';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CompareIcon from '@mui/icons-material/Compare';
import { MediaItem, PhotoLayout } from '../types';
import { getSelectedMediaItemIds, getMediaItems } from '../selectors';

export interface TopToolbarProps {
  selectedMediaItemIds: string[];
  loupeViewMediaItemId: string;
  onSetPhotoLayout: (photoLayout: PhotoLayout) => void;
  onSetLoupeViewMediaItemId: (id: string) => any;
  onSetPhotoLayoutRedux: (photoLayout: PhotoLayout) => any;
}

const TopToolbar = (props: TopToolbarProps) => {

  const [value, setValue] = React.useState(30);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  function handleUpdatePhotoLayout(photoLayout: PhotoLayout): void {
    if (photoLayout === PhotoLayout.Loupe) {
      props.onSetLoupeViewMediaItemId(props.loupeViewMediaItemId);
      props.onSetPhotoLayoutRedux(PhotoLayout.Loupe);
    } else {
      props.onSetPhotoLayout(photoLayout);
    }
  }

  return (
    <div className='toolbarIconButtonContainer'>
      <IconButton
        onClick={() => {
          handleUpdatePhotoLayout(PhotoLayout.Grid);
        }}>
        <GridOnIcon />
      </IconButton>
      <IconButton
        disabled={props.selectedMediaItemIds.length === 0}
        onClick={() => {
          handleUpdatePhotoLayout(PhotoLayout.Loupe);
        }}>
        <InsertPhotoIcon />
      </IconButton>
      <IconButton
        disabled={props.selectedMediaItemIds.length < 2}
        onClick={() => {
          handleUpdatePhotoLayout(PhotoLayout.Survey);
        }}>
        <CompareIcon />
      </IconButton>
      <div className='sliderContainer'>
        <div className='sliderLabelContainer'>
          <span className='sliderLabel'>
            Grid Size
          </span>
        </div>
        <Slider
          size="small"
          value={typeof value === 'number' ? value : 0}
          onChange={handleSliderChange}
        />
      </div>
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
    selectedMediaItemIds,
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

