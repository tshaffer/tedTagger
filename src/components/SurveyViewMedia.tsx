import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CardMedia, IconButton } from '@mui/material';

import { TedTaggerDispatch } from '../models';
import { MediaItem } from '../types';

import { getPhotoUrl } from '../utilities';
import SurveyViewImage from './SurveyViewImage';
import { getSurveyModeZoomFactor } from '../selectors';

import DeleteIcon from '@mui/icons-material/Delete';
import { deleteSurveyViewMediaItem } from '../controllers';
import ConfirmationDialog from './ConfirmationDialog';

const selectedCardMediaStyle = {
  objectFit: 'contain',
  border: 4,
  borderColor: 'red',
  height: '1080px',
  // paddingLeft: '8px',
  backgroundColor: 'purple',
};

const unselectedCardMediaStyle = {
  objectFit: 'contain',
  border: 4,
  borderColor: 'orange',
  height: '1080px',
  // paddingLeft: '8px',
  backgroundColor: 'purple',
};

export interface SurveyViewMediaPropsFromParent {
  mediaItem: MediaItem;
  numGridColumns: number;
  numGridRows: number;
}

export interface SurveyViewMediaProps extends SurveyViewMediaPropsFromParent {
  surveyModeZoomFactor: number;
  onDeleteSurveyViewMediaItem: (mediaItemId: string) => any;
}

function SurveyViewMedia(props: SurveyViewMediaProps) {

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  function handleDeleteSurveyPhoto() {
    setOpenDialog(true);
  }

  const handleConfirmDelete = () => {
    setOpenDialog(false);
    props.onDeleteSurveyViewMediaItem(props.mediaItem.googleId);
  };

  const photoUrl = getPhotoUrl(props.mediaItem);

  let cardMediaHeight: number = 0;

  switch (props.numGridRows) {
    case 1: {
      cardMediaHeight = 625;
      break;
    }
    case 2: {
      cardMediaHeight = 312;
      break;
    }
    case 3: {
      cardMediaHeight = 208;
      break;
    }
    default:
      debugger;
      break;
  }

  unselectedCardMediaStyle.height = cardMediaHeight.toString() + 'px';
  selectedCardMediaStyle.height = cardMediaHeight.toString() + 'px';

  const cardMediaStyle = unselectedCardMediaStyle;

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
      <CardMedia
        id={props.mediaItem.googleId}
        className='survey-image-container'
        title={photoUrl}
        sx={cardMediaStyle}
      >
        <div>
          <SurveyViewImage
            mediaItem={props.mediaItem}
          />
          <div
            className='overlayIconStyle'>
            <IconButton
              onClick={() => {
                handleDeleteSurveyPhoto();
              }}>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </CardMedia>
    </React.Fragment>
  );
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    mediaItem: ownProps.mediaItem,
    surveyModeZoomFactor: getSurveyModeZoomFactor(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onDeleteSurveyViewMediaItem: deleteSurveyViewMediaItem
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyViewMedia);
