import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/TedTagger.css';
import { Checkbox, FormControlLabel, FormGroup, IconButton, Slider, Typography } from '@mui/material';
import { TedTaggerDispatch, setDisplayMetadata, setLoupeViewMediaItemIdRedux, setNumGridColumnsRedux, setPhotoLayoutRedux, setScrollPositionRedux, setSurveyModeZoomFactorRedux, setXTranslateOffset } from '../models';

import GridOnIcon from '@mui/icons-material/GridOn';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CompareIcon from '@mui/icons-material/Compare';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

import { MediaItem, PhotoLayout } from '../types';
import { getSelectedMediaItemIds, getMediaItems, getNumGridColumns, getPhotoLayout, getDisplayMetadata, getSurveyModeZoomFactor, getXTranslateOffset } from '../selectors';
import { ChangeEvent } from 'react';
import ConfirmationDialog from './ConfirmationDialog';
import { deleteMediaItems } from '../controllers';

export interface TopToolbarProps {
  selectedMediaItemIds: string[];
  loupeViewMediaItemId: string;
  numGridColumns: number;
  surveyModeZoomFactor: number;
  photoLayout: PhotoLayout;
  displayMetadata: boolean;
  xTranslateOffset: number;
  onSetNumGridColumns: (numGridColumns: number) => void;
  onSetSurveyModeZoomFactor: (numGridColumns: number) => void;
  onSetPhotoLayout: (photoLayout: PhotoLayout) => void;
  onSetLoupeViewMediaItemId: (id: string) => any;
  onSetPhotoLayoutRedux: (photoLayout: PhotoLayout) => any;
  onSetDisplayMetadata: (displayMetadata: boolean) => any;
  onSetScrollPosition: (scrollPosition: number) => any;
  onDeleteMediaItems: (mediaItemIds: string[]) => any;
  onSetXTranslateOffset: (xTranslateOffset: number) => any;
}

const TopToolbar = (props: TopToolbarProps) => {

  const [openDialog, setOpenDialog] = React.useState(false);

  function handleSliderChange(event: Event, value: number | number[]): void {
    props.onSetNumGridColumns(value as number);
  }

  function handleSurveyModeZoomFactorChange(event: Event, value: number | number[], activeThumb: number): void {
    props.onSetSurveyModeZoomFactor(value as number);
  }

  function handleUpdatePhotoLayout(photoLayout: PhotoLayout): void {
    // capture the scroll position is transitioning out of Grid layout.
    if (props.photoLayout === PhotoLayout.Grid && photoLayout !== PhotoLayout.Grid) {
      const divElement = document.getElementById('centerColumn') as HTMLDivElement | null;
      if (divElement) {
        const scrollPosition: number = divElement.scrollTop;
        props.onSetScrollPosition(scrollPosition);
      }
    }
    if (photoLayout === PhotoLayout.Loupe) {
      props.onSetLoupeViewMediaItemId(props.loupeViewMediaItemId);
      props.onSetPhotoLayoutRedux(PhotoLayout.Loupe);
    } else {
      props.onSetPhotoLayout(photoLayout);
    }
  }

  function handlaToggleDisplayMetadata(event: ChangeEvent<HTMLInputElement>, checked: boolean): void {
    props.onSetDisplayMetadata(checked);
  }

  function handleDecrementXTranslate() {
    let xOffset: number = props.xTranslateOffset;
    xOffset -= 2;
    props.onSetXTranslateOffset(xOffset);
  }

  function handleIncrementXTranslate() {
    let xOffset: number = props.xTranslateOffset;
    xOffset += 2;
    props.onSetXTranslateOffset(xOffset);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    setOpenDialog(false);
    switch (props.photoLayout) {
      case PhotoLayout.Grid: {
        props.onDeleteMediaItems(props.selectedMediaItemIds);
        break;
      }
      case PhotoLayout.Loupe: {
        props.onDeleteMediaItems([props.loupeViewMediaItemId]);
        break;
      }
      case PhotoLayout.Survey: {
        console.log('not implemented yet');
        break;
      }
    }
  };

  function handleDeleteSelectedPhotos() {
    setOpenDialog(true);
  }

  const getPhotoLayoutPropsUI = (): JSX.Element | null => {
    switch (props.photoLayout) {
      case PhotoLayout.Survey: {
        return (
          <div style={{
            position: 'absolute',
            top: '50%',
            transform: 'translate(65%, -50%)',
          }}>
            <div className='sliderContainer'>
              <Typography gutterBottom style={{ fontSize: '13px' }}>Zoom</Typography>
              <Slider
                size='small'
                value={props.surveyModeZoomFactor}
                onChange={handleSurveyModeZoomFactorChange}
                valueLabelDisplay='auto'
                min={1}
                step={0.1}
                max={6}
              />
            </div>
          </div>
        );
      }
      case PhotoLayout.Grid: {
        return (
          <div style={{
            position: 'absolute',
            top: '50%',
            transform: 'translate(65%, -50%)',
          }}>
            <div className='sliderContainer'> {/* sliderContainer wrapped inside the parent */}
              <Typography gutterBottom style={{ fontSize: '13px' }}>Grid Column Count</Typography>
              <Slider
                size='small'
                value={props.numGridColumns}
                onChange={handleSliderChange}
                valueLabelDisplay='auto'
                step={1}
                marks
                min={2}
                max={10}
              />
            </div>
          </div>

        );
        break;
      }
    }

    return null;
  };

  return (
    <React.Fragment>
      <div>
        <ConfirmationDialog
          open={openDialog}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmDelete}
          title="Confirm Delete"
          message="Are you sure you want to delete the selected photo(s)?"
        />
      </div>
      <div className='toolbarIconButtonContainer'>
        <div>
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
          {getPhotoLayoutPropsUI()}
          <IconButton
            onClick={() => {
              handleDecrementXTranslate();
            }}>
            <ArrowCircleLeftIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleIncrementXTranslate();
            }}>
            <ArrowCircleRightIcon />
          </IconButton>
        </div>
        <IconButton
          disabled={props.selectedMediaItemIds.length < 1}
          onClick={() => {
            handleDeleteSelectedPhotos();
          }}>
          <DeleteIcon />
        </IconButton>
      </div>

    </React.Fragment>
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
    numGridColumns: getNumGridColumns(state),
    surveyModeZoomFactor: getSurveyModeZoomFactor(state),
    photoLayout: getPhotoLayout(state),
    displayMetadata: getDisplayMetadata(state),
    xTranslateOffset: getXTranslateOffset(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onSetPhotoLayout: setPhotoLayoutRedux,
    onSetLoupeViewMediaItemId: setLoupeViewMediaItemIdRedux,
    onSetPhotoLayoutRedux: setPhotoLayoutRedux,
    onSetNumGridColumns: setNumGridColumnsRedux,
    onSetDisplayMetadata: setDisplayMetadata,
    onSetSurveyModeZoomFactor: setSurveyModeZoomFactorRedux,
    onSetScrollPosition: setScrollPositionRedux,
    onDeleteMediaItems: deleteMediaItems,
    onSetXTranslateOffset: setXTranslateOffset,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TopToolbar);

