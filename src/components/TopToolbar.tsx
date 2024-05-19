import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/TedTagger.css';
import { IconButton, Slider, Typography } from '@mui/material';
import { TedTaggerDispatch, removeLoupeViewMediaItemId, setDisplayMetadata, setLoupeViewMediaItemIdRedux, setLoupeViewMediaItemIds, setNumGridColumnsRedux, setPhotoLayoutRedux, setScrollPositionRedux, setSurveyModeZoomFactorRedux } from '../models';
import { Tooltip } from '@mui/material';

import GridOnIcon from '@mui/icons-material/GridOn';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CompareIcon from '@mui/icons-material/Compare';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import DownloadIcon from '@mui/icons-material/Download';
import DeselectIcon from '@mui/icons-material/Deselect';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

import { MediaItem, PhotoLayout } from '../types';
import { getSelectedMediaItemIds, getMediaItems, getNumGridColumns, getPhotoLayout, getDisplayMetadata, getSurveyModeZoomFactor, getDeletedMediaItems, getLoupeViewMediaItemIds, getMediaItemIds, getSelectedMediaItems } from '../selectors';
import ConfirmationDialog from './ConfirmationDialog';
import { deleteMediaItems, deselectAllPhotos, redownloadMediaItem, selectPhoto } from '../controllers';
import DeletedMediaItemsDialog from './DeletedMediaItemsDialog';
import { sliderContainerXTranslate } from '../constants';

export interface TopToolbarProps {
  mediaItems: MediaItem[];
  mediaItemIds: string[];
  selectedMediaItems: MediaItem[];
  selectedMediaItemIds: string[];
  loupeViewMediaItemId: string;
  loupeViewMediaItemIds: string[];
  numGridColumns: number;
  surveyModeZoomFactor: number;
  photoLayout: PhotoLayout;
  displayMetadata: boolean;
  deletedMediaItems: MediaItem[];
  onSetNumGridColumns: (numGridColumns: number) => void;
  onSetSurveyModeZoomFactor: (numGridColumns: number) => void;
  onSetPhotoLayout: (photoLayout: PhotoLayout) => void;
  onSetLoupeViewMediaItemId: (id: string) => any;
  onSetDisplayMetadata: (displayMetadata: boolean) => any;
  onSetScrollPosition: (scrollPosition: number) => any;
  onDeleteMediaItems: (mediaItemIds: string[]) => any;
  onRedownloadMediaItem: (mediaItemId: string) => any;
  onDeselectAllPhotos: () => void;
  onSelectPhoto: (id: string, commandKey: boolean, shiftKey: boolean) => any;
  onSetLoupeViewMediaItemIds: (mediaItemIds: string[]) => any;
  onRemoveLoupeViewMediaItemId: (mediaItemId: string) => any;
}

const TopToolbar = (props: TopToolbarProps) => {

  const [showConfirmationDialog, setShowConfirmationDialog] = React.useState(false);
  const [showDeletedMediaItemsDialog, setShowDeletedMediaItemsDialog] = React.useState(false);

  function handleSliderChange(event: Event, value: number | number[]): void {
    props.onSetNumGridColumns(value as number);
  }

  function handleSurveyModeZoomFactorChange(event: Event, value: number | number[], activeThumb: number): void {
    props.onSetSurveyModeZoomFactor(value as number);
  }

  function handleUpdatePhotoLayout(photoLayout: PhotoLayout): void {
    if (photoLayout === props.photoLayout) {
      return;
    }
    // capture the scroll position if transitioning out of Grid layout.
    if (props.photoLayout === PhotoLayout.Grid && photoLayout !== PhotoLayout.Grid) {
      const divElement = document.getElementById('centerColumn') as HTMLDivElement | null;
      if (divElement) {
        const scrollPosition: number = divElement.scrollTop;
        props.onSetScrollPosition(scrollPosition);
      }
    }
    if (photoLayout === PhotoLayout.Loupe) {
      props.onSetLoupeViewMediaItemId(props.loupeViewMediaItemId);
      props.onSetPhotoLayout(PhotoLayout.Loupe);

      if (props.selectedMediaItemIds.length < 2) {
        props.onSetLoupeViewMediaItemIds(props.mediaItemIds);
      } else {
        props.onSetLoupeViewMediaItemIds(props.selectedMediaItemIds);
      }

    } else {
      props.onSetPhotoLayout(photoLayout);
    }
  }

  const handleEnterFullScreenMode = () => {
    const elem = document.getElementById('loupeViewImage');
    if (elem) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    }
  };

  function handleDeselectAll(): void {
    props.onDeselectAllPhotos();
  }

  function handlaToggleDisplayMetadata(): void {
    props.onSetDisplayMetadata(!props.displayMetadata);
  }

  const handleCloseConfirmationDialog = () => {
    setShowConfirmationDialog(false);
  };

  const handleCloseDeletedMediaItemsDialog = () => {
    setShowDeletedMediaItemsDialog(false);
  };

  const deleteLoupeViewMediaItem = () => {

    debugger;

    const loupeViewMediaItemId = props.loupeViewMediaItemId;

    const loupeViewMediaItemIndex = props.loupeViewMediaItemIds.indexOf(loupeViewMediaItemId);
    if (loupeViewMediaItemIndex < 0) {
      debugger;
    }

    // handle the case where there is only one media item in the loupe view.
    if (props.loupeViewMediaItemIds.length === 1) {
      debugger;
    }

    let newLoupeViewMediaItemIndex = -1;
    const prevLoupeViewMediaItemIndex = loupeViewMediaItemIndex - 1;
    const nextLoupeViewMediaItemIndex = loupeViewMediaItemIndex + 2; // +2 because we are deleting the current media item.
    if (nextLoupeViewMediaItemIndex < props.loupeViewMediaItemIds.length) {
      newLoupeViewMediaItemIndex = nextLoupeViewMediaItemIndex;
    } else if (prevLoupeViewMediaItemIndex >= 0) {
      newLoupeViewMediaItemIndex = prevLoupeViewMediaItemIndex;
    } else {
      debugger;
    }

    // const nextMediaItemId: string = props.loupeViewMediaItemIds[newLoupeViewMediaItemIndex];
    // const nextMediaItem = props.mediaItems.find((mediaItem: MediaItem) => mediaItem.googleId === nextMediaItemId);
    // props.onSetLoupeViewMediaItemId(nextMediaItem!.googleId);

    /*
    const loupeViewMediaItemId = props.loupeViewMediaItemId;
    const mediaItemIndex = props.mediaItems.findIndex((mediaItem: MediaItem) => mediaItem.googleId === loupeViewMediaItemId);

    let newMediaItemIndex = -1;
    const prevMediaItemIndex = mediaItemIndex - 1;
    const nextMediaItemIndex = mediaItemIndex + 2; // +2 because we are deleting the current media item.
    if (nextMediaItemIndex < props.mediaItems.length) {
      newMediaItemIndex = nextMediaItemIndex;
    } else if (prevMediaItemIndex >= 0) {
      newMediaItemIndex = prevMediaItemIndex;
    } else {
      debugger;
    }
    const newMediaItem: MediaItem = props.mediaItems[newMediaItemIndex];

    props.onDeselectAllPhotos();

    props.onDeleteMediaItems([props.loupeViewMediaItemId]);
    props.onRemoveLoupeViewMediaItemId(props.loupeViewMediaItemId);

    props.onSetLoupeViewMediaItemId(newMediaItem.googleId);
    props.onSelectPhoto(newMediaItem.googleId, false, false);
    */
  };

  const handleConfirmDelete = () => {
    setShowConfirmationDialog(false);
    switch (props.photoLayout) {
      case PhotoLayout.Grid: {
        props.onDeleteMediaItems(props.selectedMediaItemIds);
        break;
      }
      case PhotoLayout.Loupe: {
        deleteLoupeViewMediaItem();
        break;
      }
      case PhotoLayout.Survey: {
        console.log('not implemented yet');
        break;
      }
    }
  };

  const handleRemoveDeletedMediaItemPhoto = () => {
    setShowDeletedMediaItemsDialog(true);
  };

  function handleRedownloadMediaItem() {
    props.onRedownloadMediaItem(props.selectedMediaItemIds[0]);
  }

  function handleDeleteSelectedPhotos() {
    setShowConfirmationDialog(true);
  }

  const getPhotoLayoutPropsUI = (): JSX.Element | null => {
    switch (props.photoLayout) {
      case PhotoLayout.Survey: {
        return (
          <div style={{
            position: 'absolute',
            top: '50%',
            transform: 'translate(' + sliderContainerXTranslate.toString() + '%, -50%)',
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
            transform: 'translate(' + sliderContainerXTranslate.toString() + '%, -50%)',
          }}>
            <div className='sliderContainer'> {/* sliderContainer wrapped inside the parent */}
              <Typography gutterBottom style={{ fontSize: '13px' }}>Zoom</Typography>
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
      }
    }

    return null;
  };

  let confirmationDialogMessage = 'Are you sure you want to delete ';
  if (props.selectedMediaItemIds.length === 1) {
    confirmationDialogMessage += props.selectedMediaItems[0].fileName + '?';
  } else {
    confirmationDialogMessage += 'the selected photos?';
  }
  return (
    <React.Fragment>
      <div>
        <ConfirmationDialog
          open={showConfirmationDialog}
          onClose={handleCloseConfirmationDialog}
          onConfirm={handleConfirmDelete}
          title="Confirm Delete"
          message={confirmationDialogMessage}
        />
      </div>
      <div>
        <DeletedMediaItemsDialog
          open={showDeletedMediaItemsDialog}
          onClose={handleCloseDeletedMediaItemsDialog}
        />
      </div>
      <div className='toolbarIconButtonContainer'>
        <div>
          <Tooltip title="Grid">
            <IconButton
              onClick={() => {
                handleUpdatePhotoLayout(PhotoLayout.Grid);
              }}>
              <GridOnIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Loupe">
            <span>
              <IconButton
                disabled={props.selectedMediaItemIds.length === 0}
                onClick={() => {
                  handleUpdatePhotoLayout(PhotoLayout.Loupe);
                }}>
                <InsertPhotoIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Full screen">
            <span>
              <IconButton
                disabled={props.photoLayout !== PhotoLayout.Loupe}
                onClick={() => {
                  handleEnterFullScreenMode();
                }}>
                <FullscreenIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Survey">
            <span>
              <IconButton
                disabled={props.selectedMediaItemIds.length < 2}
                onClick={() => {
                  handleUpdatePhotoLayout(PhotoLayout.Survey);
                }}>
                <CompareIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Deselect All">
            <span>
              <IconButton
                disabled={props.selectedMediaItemIds.length === 0 || props.photoLayout !== PhotoLayout.Grid}
                onClick={() => {
                  handleDeselectAll();
                }}
              >
                <DeselectIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Metadata">
            <IconButton
              onClick={() => {
                handlaToggleDisplayMetadata();
              }}>
              <InfoIcon />
            </IconButton>
          </Tooltip>
          {getPhotoLayoutPropsUI()}
        </div>
        <div>
          <Tooltip title="Redownload Image">
            <span>
              <IconButton
                disabled={props.selectedMediaItemIds.length !== 1}
                onClick={() => {
                  handleRedownloadMediaItem();
                }}>
                <DownloadIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Show Deleted Photos">
            <span>
              <IconButton
                disabled={props.deletedMediaItems.length < 1}
                onClick={() => {
                  handleRemoveDeletedMediaItemPhoto();
                }}>
                <DeleteSweepIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Delete Selected Photos">
            <span>
              <IconButton
                disabled={props.selectedMediaItemIds.length < 1}
                onClick={() => {
                  handleDeleteSelectedPhotos();
                }}>
                <DeleteIcon />
              </IconButton>
            </span>
          </Tooltip>
        </div>
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
    mediaItems: getMediaItems(state),
    mediaItemIds: getMediaItemIds(state),
    selectedMediaItemIds,
    selectedMediaItems: getSelectedMediaItems(state),
    loupeViewMediaItemId,
    loupeViewMediaItemIds: getLoupeViewMediaItemIds(state),
    numGridColumns: getNumGridColumns(state),
    surveyModeZoomFactor: getSurveyModeZoomFactor(state),
    photoLayout: getPhotoLayout(state),
    displayMetadata: getDisplayMetadata(state),
    deletedMediaItems: getDeletedMediaItems(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onSetPhotoLayout: setPhotoLayoutRedux,
    onSetLoupeViewMediaItemId: setLoupeViewMediaItemIdRedux,
    onSetNumGridColumns: setNumGridColumnsRedux,
    onSetDisplayMetadata: setDisplayMetadata,
    onSetSurveyModeZoomFactor: setSurveyModeZoomFactorRedux,
    onSetScrollPosition: setScrollPositionRedux,
    onDeleteMediaItems: deleteMediaItems,
    onRedownloadMediaItem: redownloadMediaItem,
    onDeselectAllPhotos: deselectAllPhotos,
    onSelectPhoto: selectPhoto,
    onSetLoupeViewMediaItemIds: setLoupeViewMediaItemIds,
    onRemoveLoupeViewMediaItemId: removeLoupeViewMediaItemId,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TopToolbar);

