import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CardMedia } from '@mui/material';

import { TedTaggerDispatch, setScrollBarPosition } from '../models';
import { MediaItem, Position } from '../types';

import { getPhotoUrl } from '../utilities';
import CardMediaImage from './CardMediaImage';
import { getScrollBarPosition } from '../selectors';

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
  onSetScrollBarPosition: (p: Position) => any;

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
      handleScrollTo(x, y);
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

  console.log('render ScrollingCardMedia');

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
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onSetScrollBarPosition: setScrollBarPosition,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollingCardMedia);
