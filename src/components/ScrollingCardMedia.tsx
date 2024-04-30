import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CardMedia } from '@mui/material';

import { TedTaggerDispatch, setPercentageScrolledToTheRight, setScrollBarPosition, setXTranslateOffset } from '../models';
import { MediaItem, Position } from '../types';

import { getPhotoUrl } from '../utilities';
import CardMediaImage from './CardMediaImage';
import { getScrollBarPosition, getSurveyModeZoomFactor } from '../selectors';

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

export interface ScrollingCardMediaPropsFromParent {
  mediaItem: MediaItem;
  numGridColumns: number;
  numGridRows: number;
}

export interface ScrollingCardMediaProps extends ScrollingCardMediaPropsFromParent {
  scrollBarPosition: Position;
  surveyModeZoomFactor: number;
  onSetScrollBarPosition: (p: Position) => any;
  onSetPercentageScrolledToTheRight: (p: number) => any;
  onSetXTranslateOffset: (xTranslateOffset: number) => any;

}

function ScrollingCardMedia(props: ScrollingCardMediaProps) {

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = (event: Event) => {

      console.log('clientWidth: ', container.clientWidth);
      // console.log('offsetWidth: ', container.offsetWidth);
      console.log('scrollLeft: ', container.scrollLeft);
      // console.log('scrollLeftMax: ', (container as any).scrollLeftMax);
      console.log('scrollWidth: ', container.scrollWidth);

      const scale = props.surveyModeZoomFactor;
      const maxScrollLeftPosition = container.scrollWidth - container.clientWidth;
      const currentScrollLeftPosition = container.scrollLeft;
      const percentageScrolledToTheRight = (maxScrollLeftPosition - currentScrollLeftPosition) / maxScrollLeftPosition * 100;

      // Calculate translateX value
      // const imageWidth = imageElement.offsetWidth; // Width of the image
      const imageWidth = 633;
      // const imageWidth = 458;
      const containerWidth = container.offsetWidth; // Width of the container

      const maxTranslateX = imageWidth - containerWidth;
      const translateX = maxTranslateX * (percentageScrolledToTheRight / 100) * scale;


      /*
        50 = maxTranslateX * 2
        maxTranslateX = 25
        25 = imageWidth - 608
        imageWidth = 633
      */
      console.log('translateX: ', translateX);
      // props.onSetXTranslateOffset(translateX);
      // props.onSetXTranslateOffset(50);
      props.onSetXTranslateOffset(translateX);

    };

    // Attach scroll event listener
    container.addEventListener('scroll', handleScroll);
    // container.addEventListener('scroll', handleScroll, { passive: false });

    return () => {
      // Cleanup: remove event listener
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollTo = (x: number, y: number) => {
    // console.log('handleScrollTo: ', x, y);
    props.onSetScrollBarPosition({ x, y });
    // if (containerRef.current) {
    //   containerRef.current.scrollTo({ left: x, top: y, behavior: 'smooth' });
    // }
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

  // console.log('render ScrollingCardMedia');

  return (
    <CardMedia
      ref={containerRef}
      id={props.mediaItem.googleId}
      className='survey-image-container'
      title={photoUrl}
      sx={cardMediaStyle}
    >
      <CardMediaImage
        mediaItem={props.mediaItem}
      />
    </CardMedia>

  );
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    mediaItem: ownProps.mediaItem,
    scrollBarPosition: getScrollBarPosition(state),
    surveyModeZoomFactor: getSurveyModeZoomFactor(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onSetScrollBarPosition: setScrollBarPosition,
    onSetPercentageScrolledToTheRight: setPercentageScrolledToTheRight,
    onSetXTranslateOffset: setXTranslateOffset,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollingCardMedia);
