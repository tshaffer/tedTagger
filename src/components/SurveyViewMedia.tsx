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
import { deleteMediaItems } from '../controllers';

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
  onDeleteMediaItems: (mediaItemIds: string[]) => any;
}

function SurveyViewMedia(props: SurveyViewMediaProps) {

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

  function handleDeleteSurveyPhoto(googleId: string) {
    props.onDeleteMediaItems([googleId]);
  }

  return (
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
              handleDeleteSurveyPhoto(props.mediaItem.googleId);
            }}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </CardMedia>

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
    onDeleteMediaItems: deleteMediaItems,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyViewMedia);
