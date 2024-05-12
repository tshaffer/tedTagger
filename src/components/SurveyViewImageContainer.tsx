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
import { deleteSurveyViewImageContainerItem } from '../controllers';
import ConfirmationDialog from './ConfirmationDialog';

const selectedCardMediaStyle = {
  objectFit: 'contain',
  height: '1080px',
  backgroundColor: 'purple',
};

const unselectedCardMediaStyle = {
  objectFit: 'contain',
  height: '1080px',
  backgroundColor: 'purple',
};

export interface SurveyViewImageContainerPropsFromParent {
  mediaItem: MediaItem;
  numGridColumns: number;
  numGridRows: number;
}

export interface SurveyViewImageContainerProps extends SurveyViewImageContainerPropsFromParent {
  surveyModeZoomFactor: number;
  onDeleteSurveyViewImageContainerItem: (mediaItemId: string) => any;
}

function SurveyViewImageContainer(props: SurveyViewImageContainerProps) {

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  function handleDeleteSurveyPhoto() {
    setOpenDialog(true);
  }

  const handleConfirmDelete = () => {
    setOpenDialog(false);
    props.onDeleteSurveyViewImageContainerItem(props.mediaItem.googleId);
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
    onDeleteSurveyViewImageContainerItem: deleteSurveyViewImageContainerItem
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyViewImageContainer);
