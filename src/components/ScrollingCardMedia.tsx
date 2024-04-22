import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CardMedia } from '@mui/material';

import { TedTaggerDispatch } from '../models';
import { MediaItem } from '../types';

import { getPhotoUrl } from '../utilities';
import { getSurveyModeZoomFactor } from '../selectors';

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
  surveyModeZoomFactor: number;
}

function ScrollingCardMedia(props: ScrollingCardMediaProps) {

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = (event: Event) => {

      event.preventDefault();

      // Calculate the scroll position based on the container's scrollLeft and scrollTop
      const x = container.scrollLeft;
      const y = container.scrollTop;
      console.log('handleScroll: ', x, y);
      setScrollPosition({ x, y });
      // handleScrollTo(x, y);
      handleScrollTo(0, 0);
    };

    // Attach scroll event listener
    // container.addEventListener('scroll', handleScroll);
    container.addEventListener('scroll', handleScroll, { passive: false });

    return () => {
      // Cleanup: remove event listener
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollTo = (x: number, y: number) => {
    console.log('handleScrollTo: ', x, y);
    console.log('containerRef.current: ', containerRef.current);
    if (containerRef.current) {
      containerRef.current.scrollTo({ left: x, top: y, behavior: 'smooth' });
    }
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

  const elementId: string = 'surveyImage' + props.mediaItem.googleId;
  const imageElement = document.getElementById(elementId) as HTMLImageElement | null;
  if (imageElement) {
    imageElement.style.transform = `translate(-50%, -50%) scale(${props.surveyModeZoomFactor})`;
  }

  return (
    <CardMedia
      ref={containerRef}
      id={props.mediaItem.googleId}
      className='survey-image-container'
      title={photoUrl}
      sx={cardMediaStyle}
    >
      <img
        id={elementId}
        src={photoUrl}
        className='surveyImageStyle'
        loading="lazy"
      />
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
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollingCardMedia);
