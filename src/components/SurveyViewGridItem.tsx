import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Grid, Card, GridSize } from '@mui/material';
import SurveyViewImageContainer from './SurveyViewImageContainer';

import { TedTaggerDispatch } from '../models';
import { MediaItem } from '../types';

import { getPhotoUrl } from '../utilities';
import { getSurveyModeZoomFactor } from '../selectors';

const gridItemStyle = {
  // paddingLeft: '8px',
  // paddingTop: '8px',
};

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  margin: '8px',
  width: '100%',
  height: '100%',
  backgroundColor: 'lightcoral',
  boxShadow: 'none',
};

const selectedCardMediaStyle = {
  objectFit: 'contain',
  height: '1080px',
  backgroundColor: 'purple',
};

const unselectedCardMediaStyle = {
  objectFit: 'contain',
  height: '1080px',
  // paddingLeft: '8px',
  backgroundColor: 'purple',
};

export interface SurveyViewGridItemsPropsFromParent {
  mediaItem: MediaItem;
  numGridColumns: number;
  numGridRows: number;
}

export interface SurveyViewGridItemsProps extends SurveyViewGridItemsPropsFromParent {
  surveyModeZoomFactor: number;
}

function SurveyViewGridItems(props: SurveyViewGridItemsProps) {

  const photoUrl = getPhotoUrl(props.mediaItem);

  const numColumns: number = props.numGridColumns;
  const gridItemSize: GridSize = 12 / numColumns;

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

  const elementId: string = 'surveyImage' + props.mediaItem.googleId;
  const imageElement = document.getElementById(elementId) as HTMLImageElement | null;
  if (imageElement) {
    imageElement.style.transform = `translate(-50%, -50%) scale(${props.surveyModeZoomFactor})`;
  }

  return (
    <Grid item lg={gridItemSize} style={gridItemStyle}>
      <Card
        sx={cardStyle}
      >
        <SurveyViewImageContainer
          mediaItem={props.mediaItem}
          numGridColumns={props.numGridColumns}
          numGridRows={props.numGridRows}
        >
        </SurveyViewImageContainer>
      </Card>
    </Grid>
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
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyViewGridItems);
