import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TedTaggerDispatch } from '../models';
import { MediaItem } from '../types';

import { getPhotoUrl } from '../utilities';
import { getSurveyModeZoomFactor } from '../selectors';

export interface CardMediaImagePropsFromParent {
  mediaItem: MediaItem;
}

export interface CardMediaImageProps extends CardMediaImagePropsFromParent {
  surveyModeZoomFactor: number;
}

function CardMediaImage(props: CardMediaImageProps) {

  const photoUrl = getPhotoUrl(props.mediaItem);

  const elementId: string = 'surveyImage' + props.mediaItem.googleId;
  const imageElement = document.getElementById(elementId) as HTMLImageElement | null;
  if (imageElement) {
    imageElement.style.transform = `translate(-50%, -50%) scale(${props.surveyModeZoomFactor})`;
  }

  console.log('render CardMediaImage');

  return (
    <img
      id={elementId}
      src={photoUrl}
      className='surveyImageStyle'
      loading="lazy"
    />
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

export default connect(mapStateToProps, mapDispatchToProps)(CardMediaImage);
