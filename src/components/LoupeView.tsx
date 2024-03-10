import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/TedTagger.css';
import { TedTaggerDispatch, setLoupeViewMediaItemIdRedux } from '../models';
import { getLoupeViewMediaItemId, getMediaItemById, getMediaItems } from '../selectors';
import { MediaItem } from '../types';
import { getPhotoUrl } from '../utilities';
import { isNil } from 'lodash';

// export interface LoupeViewPropsFromParent {
//   // mediaItemId: string;
// }

export interface LoupeViewProps {
  mediaItemId: string;
  mediaItem: MediaItem | null;
  mediaItems: MediaItem[];
  onSetLoupeViewMediaItemId: (id: string) => any;
}

const LoupeView = (props: LoupeViewProps) => {

  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
          handleDisplayNextPhoto();
          break;
        case 'ArrowLeft':
          handleDisplayPreviousPhoto();
          break;
        default:
          break;
      }
    };

    // Add the event listener when the component mounts
    console.log('addEventListener!');
    document.addEventListener('keydown', handleKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      console.log('removeEventListener!');
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Empty dependency array ensures that the effect runs only once on mount


  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

  const handleDisplayPreviousPhoto = () => {
    console.log('handleDisplayPreviousPhoto: mediaItemId: ' + props.mediaItemId);
    const mediaItemIndex = props.mediaItems.findIndex((mediaItem: MediaItem) => mediaItem.googleId === props.mediaItemId);
    console.log('handleDisplayPrevPhoto: mediaItemIndex: ' + mediaItemIndex);
    const previousMediaItemIndex = mediaItemIndex - 1;
    if (previousMediaItemIndex < 0) {
      console.log('at beginning');
      return;
    } else {
      const previousMediaItem = props.mediaItems[previousMediaItemIndex];
      console.log('setLoupeViewMediaItemId: ' + previousMediaItem.googleId);

      props.onSetLoupeViewMediaItemId(previousMediaItem.googleId);
    }
  };

  const handleDisplayNextPhoto = () => {
    console.log('handleDisplayNextPhoto: mediaItemId: ' + props.mediaItemId);
    const mediaItemIndex = props.mediaItems.findIndex((mediaItem: MediaItem) => mediaItem.googleId === props.mediaItemId);
    console.log('handleDisplayNextPhoto: mediaItemIndex: ' + mediaItemIndex);
    const nextMediaItemIndex = mediaItemIndex + 1;
    if (nextMediaItemIndex >= props.mediaItems.length) {
      console.log('at end');
      return;
    } else {
      const nextMediaItem = props.mediaItems[nextMediaItemIndex];
      console.log('setLoupeViewMediaItemId: ' + nextMediaItem.googleId);
      props.onSetLoupeViewMediaItemId(nextMediaItem.googleId);
    }
  };

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isNil(props.mediaItem)) {
    return null;
  }

  const src = getPhotoUrl(props.mediaItem);

  const maxHeightInPixels = windowDimensions.height - 222;
  const maxHeightProperty = maxHeightInPixels.toString() + 'px';

  console.log('maxHeightProperty: ' + maxHeightProperty);

  return (
    <div className='loupeView'>
      <img
        className='imgView'
        style={{ width: '100%', objectFit: 'contain', maxHeight: maxHeightProperty }}
        src={src}
      />
    </div>
  );
};

function mapStateToProps(state: any, ownProps: any) {
  console.log('mapStateToProps: ' + getLoupeViewMediaItemId(state));

  return {
    mediaItemId: getLoupeViewMediaItemId(state),
    mediaItem: getMediaItemById(state, getLoupeViewMediaItemId(state)),
    // mediaItem: getMediaItemById(state, ownProps.mediaItemId),
    mediaItems: getMediaItems(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onSetLoupeViewMediaItemId: setLoupeViewMediaItemIdRedux,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoupeView);
