import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/TedTagger.css';
import { Checkbox, FormControlLabel, FormGroup, IconButton, Slider } from '@mui/material';
import { TedTaggerDispatch, setDisplayMetadata, setLoupeViewMediaItemIdRedux, setNumGridColumnsRedux, setPhotoLayoutRedux, setScrollPositionRedux, setSurveyModeZoomFactorRedux } from '../models';

import GridOnIcon from '@mui/icons-material/GridOn';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CompareIcon from '@mui/icons-material/Compare';
import DeleteIcon from '@mui/icons-material/Delete';

import { MediaItem, PhotoLayout } from '../types';
import { getSelectedMediaItemIds, getMediaItems, getNumGridColumns, getPhotoLayout, getDisplayMetadata, getSurveyModeZoomFactor } from '../selectors';
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
  onSetNumGridColumns: (numGridColumns: number) => void;
  onSetSurveyModeZoomFactor: (numGridColumns: number) => void;
  onSetPhotoLayout: (photoLayout: PhotoLayout) => void;
  onSetLoupeViewMediaItemId: (id: string) => any;
  onSetPhotoLayoutRedux: (photoLayout: PhotoLayout) => any;
  onSetDisplayMetadata: (displayMetadata: boolean) => any;
  onSetScrollPosition: (scrollPosition: number) => any;
  onDeleteMediaItems: (mediaItemIds: string[]) => any;
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

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    setOpenDialog(false);
    props.onDeleteMediaItems(props.selectedMediaItemIds);
  };

  function handleDeleteSelectedPhotos() {
    setOpenDialog(true);
  }

  const getPhotoLayoutPropsUI = (): JSX.Element | null => {
    switch (props.photoLayout) {
      case PhotoLayout.Survey: {
        return (
          <React.Fragment>
            <div className='sliderContainer'>
              <div className='sliderLabelContainer'>
                <span className={'sliderLabel'}>
                  Zoom
                </span>
              </div>
              <Slider
                size='small'
                value={props.surveyModeZoomFactor}
                onChange={handleSurveyModeZoomFactorChange}
                valueLabelDisplay='auto'
                min={1}
                step={0.1}
                max={2}
              />
            </div>
          </React.Fragment>
        );
      }
      case PhotoLayout.Grid: {
        return (
          <React.Fragment>
            <div className='sliderContainer'>
              <div className='sliderLabelContainer'>
                <span className={'sliderLabel'}>
                  Grid Size
                </span>
              </div>
              <Slider
                size='small'
                value={props.numGridColumns}
                onChange={handleSliderChange}
                valueLabelDisplay='auto'
                // shiftStep={30}
                step={1}
                marks
                min={2}
                max={10}
              />
            </div>
            <div>
              <FormGroup>
                <FormControlLabel
                  style={{ marginLeft: '4px' }}
                  control={
                    <Checkbox
                      size='small'
                      checked={props.displayMetadata}
                      onChange={handlaToggleDisplayMetadata}
                    />
                  }
                  label={
                    <span style={{ fontSize: '13px', marginLeft: '-2px' }}>
                      Show Metadata
                    </span>
                  }
                />
              </FormGroup>
            </div>
          </React.Fragment>
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
        <IconButton
          disabled={props.selectedMediaItemIds.length < 1}
          onClick={() => {
            handleDeleteSelectedPhotos();
          }}>
          <DeleteIcon />
        </IconButton>

        {getPhotoLayoutPropsUI()}
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
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TopToolbar);

