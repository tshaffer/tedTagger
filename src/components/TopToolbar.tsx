import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/TedTagger.css';
import { IconButton, Slider, Typography } from '@mui/material';
import { TedTaggerDispatch, setDisplayMetadata, setLoupeViewMediaItemIdRedux, setNumGridColumnsRedux, setPhotoLayoutRedux, setScrollPositionRedux, setSurveyModeZoomFactorRedux } from '../models';
import { Tooltip } from '@mui/material';

import GridOnIcon from '@mui/icons-material/GridOn';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CompareIcon from '@mui/icons-material/Compare';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import DownloadIcon from '@mui/icons-material/Download';
import DeselectIcon from '@mui/icons-material/Deselect';

import { MediaItem, PhotoLayout } from '../types';
import { getSelectedMediaItemIds, getMediaItems, getNumGridColumns, getPhotoLayout, getDisplayMetadata, getSurveyModeZoomFactor, getDeletedMediaItems } from '../selectors';
import ConfirmationDialog from './ConfirmationDialog';
import { deleteMediaItems, deselectAllPhotos, redownloadMediaItem, selectPhoto } from '../controllers';
import DeletedMediaItemsDialog from './DeletedMediaItemsDialog';

export interface TopToolbarProps {
  mediaItems: MediaItem[];
  selectedMediaItemIds: string[];
  loupeViewMediaItemId: string;
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
    } else {
      props.onSetPhotoLayout(photoLayout);
    }
  }

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

    props.onSetLoupeViewMediaItemId(newMediaItem.googleId);
    props.onSelectPhoto(newMediaItem.googleId, false, false);

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
            transform: 'translate(64%, -50%)',
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
            transform: 'translate(64%, -50%)',
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
        break;
      }
    }

    return null;
  };

  return (
    <React.Fragment>
      <div>
        <ConfirmationDialog
          open={showConfirmationDialog}
          onClose={handleCloseConfirmationDialog}
          onConfirm={handleConfirmDelete}
          title="Confirm Delete"
          message="Are you sure you want to delete the selected photo(s)?"
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
    selectedMediaItemIds,
    loupeViewMediaItemId,
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
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TopToolbar);

