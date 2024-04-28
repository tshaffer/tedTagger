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

      // const scale = props.surveyModeZoomFactor;
      const scale = 2;
      const maxScrollLeftPosition = container.scrollWidth - container.clientWidth;
      const currentScrollLeftPosition = container.scrollLeft;
      const percentageScrolledToTheRight = (maxScrollLeftPosition - currentScrollLeftPosition) / maxScrollLeftPosition * 100;

      // Calculate translateX value
      // const imageWidth = imageElement.offsetWidth; // Width of the image
      // const imageWidth = 633;
      const imageWidth = 458;
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

      // // const isScrollBarAtRight = container.scrollLeft === container.scrollWidth - container.clientWidth;
      // console.log('scrollLeft: ', container.scrollLeft);
      // console.log('scrollWidth: ', container.scrollWidth);
      // console.log('clientWidth: ', container.clientWidth);
      // // console.log(container.scrollWidth - container.clientWidth);

      // const maxScrollLeftPosition = container.scrollWidth - container.clientWidth;
      // const currentScrollLeftPosition = container.scrollLeft;
      // const percentageScrolledToTheRight = (maxScrollLeftPosition - currentScrollLeftPosition) / maxScrollLeftPosition * 100;
      // console.log('percentage offset from the right: ', percentageScrolledToTheRight);
      // props.onSetPercentageScrolledToTheRight(percentageScrolledToTheRight);

      // // event.preventDefault();

      // // Calculate the scroll position based on the container's scrollLeft and scrollTop
      // const x = container.scrollLeft;
      // const y = container.scrollTop;
      // // console.log('handleScroll: ', x, y);
      // setScrollPosition({ x, y });
      // handleScrollTo(x, y);
    };

    // Attach scroll event listener
    container.addEventListener('scroll', handleScroll);
    // container.addEventListener('scroll', handleScroll, { passive: false });

    return () => {
      // Cleanup: remove event listener
      container.removeEventListener('scroll', handleScroll);
    };
    // container.addEventListener('wheel', (event) => {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   //     event.stopImmediatePropagation();

    //   // now define custom functionality
    //   console.log('wheelEvent');
    // }, { passive: false });

    // container.addEventListener('click', (event) => {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   //     event.stopImmediatePropagation();

    //   // now define custom functionality
    //   console.log('clickEvent');
    // }, { passive: false });

    // container.addEventListener('mousedown', (event) => {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   //     event.stopImmediatePropagation();

    //   // now define custom functionality
    //   console.log('mousedown');
    // }, { passive: false });

    // container.addEventListener('scroll', (event) => {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   event.stopImmediatePropagation();

    //   // now define custom functionality
    //   console.log('scroll');
    // }, { passive: false });

    // const scrollbar = document.querySelector('::-webkit-scrollbar');
    // // Set the width of the scrollbar
    // (scrollbar! as any).style.width = '10px';

    // // Set the background color of the scrollbar track
    // (scrollbar! as any).style.backgroundColor = '#f1f1f1';

    // // Set the background color of the scrollbar thumb
    // (scrollbar! as any).style.thumbColor = '#888';

    // // Set the background color of the scrollbar thumb when hovered over
    // (scrollbar! as any).style.thumbHoverColor = '#555';
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
