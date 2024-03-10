import * as React from 'react';
import { connect } from 'react-redux';

import { MediaItem } from '../types';
import LoupeView from './LoupeView';
import { getLoupeViewMediaItemId, getMediaItems } from '../selectors';
import { bindActionCreators } from 'redux';
import { TedTaggerDispatch, setLoupeViewMediaItemIdRedux } from '../models';

export interface LoupeViewControllerProps {
  loupeViewMediaItemId: string;
  mediaItems: MediaItem[];
  onSetLoupeViewMediaItemId: (id: string) => any;
}

const LoupeViewController = (props: LoupeViewControllerProps) => {

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

    const handleDisplayPreviousPhoto = () => {

      const loupeViewMediaItemId = props.loupeViewMediaItemId;

      const mediaItemIndex = props.mediaItems.findIndex((mediaItem: MediaItem) => mediaItem.googleId === loupeViewMediaItemId);
      const previousMediaItemIndex = mediaItemIndex - 1;
      if (previousMediaItemIndex < 0) {
        return;
      } else {
        const previousMediaItem = props.mediaItems[previousMediaItemIndex];
        props.onSetLoupeViewMediaItemId(previousMediaItem.googleId);
      }
    };

    const handleDisplayNextPhoto = () => {

      const loupeViewMediaItemId = props.loupeViewMediaItemId;

      const mediaItemIndex = props.mediaItems.findIndex((mediaItem: MediaItem) => mediaItem.googleId === loupeViewMediaItemId);
      const nextMediaItemIndex = mediaItemIndex + 1;
      if (nextMediaItemIndex >= props.mediaItems.length) {
        console.log('at end');
        return;
      } else {
        const nextMediaItem = props.mediaItems[nextMediaItemIndex];
        console.log('nextMediaItem: ' + nextMediaItem);
        props.onSetLoupeViewMediaItemId(nextMediaItem.googleId);
      }
    };


    // Add the event listener when the component mounts
    document.addEventListener('keydown', handleKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      console.log('removeEventListener!');
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [props.loupeViewMediaItemId]); // Empty dependency array ensures that the effect runs only once on mount

  return (
    <LoupeView />
  );
};

function mapStateToProps(state: any) {
  console.log('mapStateToProps');
  console.log(state);
  console.log(getLoupeViewMediaItemId(state));
  return {
    loupeViewMediaItemId: getLoupeViewMediaItemId(state),
    mediaItems: getMediaItems(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onSetLoupeViewMediaItemId: setLoupeViewMediaItemIdRedux,
  }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(LoupeViewController);
