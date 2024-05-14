import * as React from 'react';
import { connect } from 'react-redux';

import { MediaItem } from '../types';
import LoupeView from './LoupeView';
import { getLoupeViewMediaItemId, getMediaItems } from '../selectors';
import { bindActionCreators } from 'redux';
import { TedTaggerDispatch, setFullScreenMode, setLoupeViewMediaItemIdRedux } from '../models';
import { deselectAllPhotos, selectPhoto } from '../controllers';

export interface LoupeViewControllerProps {
  loupeViewMediaItemId: string;
  mediaItems: MediaItem[];
  onSetLoupeViewMediaItemId: (id: string) => any;
  onSelectPhoto: (id: string, commandKey: boolean, shiftKey: boolean) => any;
  onDeselectAllPhotos: () => any;
  onSetFullScreenMode: (fullScreenMode: boolean) => any;
}

const LoupeViewController = (props: LoupeViewControllerProps) => {

  React.useEffect(() => {

    console.log('LoupeViewController: React.useEffect - invoked');

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
        props.onDeselectAllPhotos();
        props.onSelectPhoto(previousMediaItem.googleId, false, false);
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
        props.onDeselectAllPhotos();
        props.onSelectPhoto(nextMediaItem.googleId, false, false);
      }
    };

    const handleFullScreenChange = () => {
      const enterFullScreenMode = document.fullscreenElement !== null;
      props.onSetFullScreenMode(enterFullScreenMode);
    };

    document.addEventListener('keydown', handleKeyPress);

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    // Remove the event listener when the component unmounts
    return () => {
      console.log('LoupeViewController: React.useEffect - component unmounts');
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, [props.loupeViewMediaItemId]);

  return (
    <LoupeView />
  );
};

function mapStateToProps(state: any) {
  return {
    loupeViewMediaItemId: getLoupeViewMediaItemId(state),
    mediaItems: getMediaItems(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onSetLoupeViewMediaItemId: setLoupeViewMediaItemIdRedux,
    onSelectPhoto: selectPhoto,
    onDeselectAllPhotos: deselectAllPhotos,
    onSetFullScreenMode: setFullScreenMode
  }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(LoupeViewController);
