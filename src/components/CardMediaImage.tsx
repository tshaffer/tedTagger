import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TedTaggerDispatch } from '../models';
import { MediaItem, Position } from '../types';

import { getPhotoUrl } from '../utilities';
import { getClientWidth, getPercentageScrolledToTheRight, getScrollBarPosition, getScrollLeft, getScrollWidth, getSurveyModeZoomFactor, getXTranslateOffset } from '../selectors';

export interface CardMediaImagePropsFromParent {
  mediaItem: MediaItem;
}

export interface CardMediaImageProps extends CardMediaImagePropsFromParent {
  surveyModeZoomFactor: number;
  scrollBarPosition: Position;
  percentageScrolledToTheRight: number;
  xTranslateOffset: number;
  clientWidth: number;
  scrollLeft: number;
  scrollWidth: number;
}

function CardMediaImage(props: CardMediaImageProps) {

  console.log('render CardMediaImage');

  console.log('clientWidth:',props.clientWidth);
  console.log('scrollLeft:', props.scrollLeft);
  console.log('scrollWidth:', props.scrollWidth);

  console.log('percentage of image visible:', props.clientWidth / props.scrollWidth * 100);
  console.log('percentage of image offset from left:', props.scrollLeft / props.scrollWidth * 100);

  const photoUrl = getPhotoUrl(props.mediaItem);

  const elementId: string = 'surveyImage' + props.mediaItem.googleId;
  const imageElement = document.getElementById(elementId) as HTMLImageElement | null;
  if (imageElement) {
    imageElement.style.transform = `translate(-50%, -50%) scale(${props.surveyModeZoomFactor})`;
    // const xTranslate: string = 'translate(' + Math.round(-50 + props.xTranslateOffset).toString() + '%';
    // console.log('xTranslate: ' + xTranslate);
    // imageElement.style.transform = xTranslate + `, -50%) scale(${props.surveyModeZoomFactor})`;
    // console.log(imageElement.style.transform);

    // const xTranslate: string = 'translate(' + Math.round(100 - props.percentageScrolledToTheRight).toString() + '%';
    // const xTranslate: string = 'translate(' + Math.round(-50 + props.xTranslateOffset).toString() + '%';
    // imageElement.style.transform = xTranslate + `, -50%) scale(${props.surveyModeZoomFactor})`;
    // console.log('imageElement.style.transform: ' + imageElement.style.transform);

    // console.log('offsetWidth: ', imageElement.offsetWidth);
  }

  // console.log(props.percentageScrolledToTheRight);

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
    scrollBarPosition: getScrollBarPosition(state),
    percentageScrolledToTheRight: getPercentageScrolledToTheRight(state),
    xTranslateOffset: getXTranslateOffset(state),

    clientWidth: getClientWidth(state),
    scrollLeft: getScrollLeft(state),
    scrollWidth: getScrollWidth(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CardMediaImage);
