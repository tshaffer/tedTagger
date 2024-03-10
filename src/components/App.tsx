import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/TedTagger.css';
import { loadDefaultTagAvatarId, loadAppTagAvatars, loadMediaItems, loadTags, loadUserTagAvatars, loadKeywordData, loadTakeouts, importFromTakeout } from '../controllers';
import { TedTaggerDispatch, setAppInitialized, setLoupeViewMediaItemIdRedux } from '../models';
import GridView from './GridView';
import { getKeywordRootNodeId, getLoupeViewMediaItemId, getMediaItems, getPhotoLayout } from '../selectors';
import { Button } from '@mui/material';

import Keywords from './Keywords';
import ViewSpec from './ViewSpec';
import SearchSpecDialog from './SearchSpecDialog';
import ImportFromTakeoutDialog from './ImportFromTakeoutDialog';
import LoupeView from './LoupeView';
import { MediaItem, PhotoLayout } from '../types';
import PhotoGrid from './PhotoGrid';

export interface AppProps {
  photoLayout: PhotoLayout;
  loupeViewMediaItemId: string;
  mediaItems: MediaItem[];
  onLoadKeywordData: () => any;
  onLoadDefaultTagAvatarId: () => any;
  onLoadAppTagAvatars: () => any;
  onLoadMediaItems: () => any;
  onLoadTags: () => any;
  onLoadUserTagAvatars: () => any;
  onLoadTakeouts: () => any;
  onSetAppInitialized: () => any;
  keywordRootNodeId: string;
  onImportFromTakeout: (id: string) => void;
  onSetLoupeViewMediaItemId: (id: string) => any;
}

const App = (props: AppProps) => {

  const [showSearchSpecDialog, setShowSearchSpecDialog] = React.useState(false);
  const [showImportFromTakeoutDialog, setShowImportFromTakeoutDialog] = React.useState(false);

  const handleImportFromTakeout = (takeoutId: string) => {
    props.onImportFromTakeout(takeoutId);
  };

  const handleCloseSearchSpecDialog = () => {
    setShowSearchSpecDialog(false);
  };

  const handleCloseImportFromTakeoutDialog = () => {
    setShowImportFromTakeoutDialog(false);
  };

  React.useEffect(() => {
    console.log('React.useEffect invoked');
    props.onLoadDefaultTagAvatarId()
      .then(function () {
        return props.onLoadAppTagAvatars();
      }).then(function () {
        return props.onLoadKeywordData();
      }).then(function () {
        return props.onLoadUserTagAvatars();
      }).then(function () {
        return props.onLoadTags();
      }).then(function () {
        return props.onLoadTakeouts();
      }).then(function () {
        return props.onLoadMediaItems();
      }).then(function () {
        return props.onSetAppInitialized();
      });
  }, []);

  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      console.log('handleKeyPress: ' + event.key);

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

      console.log('props.mediaItems');
      console.log(props.mediaItems);

      const loupeViewMediaItemId = props.loupeViewMediaItemId;

      const mediaItemIndex = props.mediaItems.findIndex((mediaItem: MediaItem) => mediaItem.googleId === loupeViewMediaItemId);
      console.log('handleDisplayPrevPhoto: mediaItemIndex: ' + mediaItemIndex);
      const previousMediaItemIndex = mediaItemIndex - 1;
      if (previousMediaItemIndex < 0) {
        console.log('at beginning');
        return;
      } else {
        const previousMediaItem = props.mediaItems[previousMediaItemIndex];
        console.log('previousMediaItem: ' + previousMediaItem);
        props.onSetLoupeViewMediaItemId(previousMediaItem.googleId);
      }
    };

    const handleDisplayNextPhoto = () => {

      console.log('props.mediaItems');
      console.log(props.mediaItems);

      const loupeViewMediaItemId = props.loupeViewMediaItemId;

      const mediaItemIndex = props.mediaItems.findIndex((mediaItem: MediaItem) => mediaItem.googleId === loupeViewMediaItemId);
      console.log('handleDisplayNextPhoto: mediaItemIndex: ' + mediaItemIndex);
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
    console.log('addEventListener!');
    document.addEventListener('keydown', handleKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      console.log('removeEventListener!');
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  const getPhotoDisplay = (): JSX.Element => {
    if (props.photoLayout === PhotoLayout.Loupe) {
      return (
        <LoupeView
          mediaItemId={props.loupeViewMediaItemId}
        />
      );
    } else {
      return (
        <GridView />
      );
    }
  };

  const photoDiplay: JSX.Element = getPhotoDisplay();

  return (
    <div>
      <div className='toolbarStyle' />
      <div className='appStyle'>
        <div className='leftColumnStyle'>
          <ViewSpec />
          <Keywords />
          <Button onClick={() => setShowSearchSpecDialog(true)}>Set Search Spec</Button>
          <SearchSpecDialog
            open={showSearchSpecDialog}
            onClose={handleCloseSearchSpecDialog}
          />
          <Button onClick={() => setShowImportFromTakeoutDialog(true)}>Import from Takeout</Button>
          <ImportFromTakeoutDialog
            open={showImportFromTakeoutDialog}
            onImportFromTakeout={handleImportFromTakeout}
            onClose={handleCloseImportFromTakeoutDialog}
          />
        </div>
        <div className='centerColumnStyle'>
          {photoDiplay}
          {/* <GridView /> */}
          {/* <LoupeView mediaItemId={'AEEKk91R187wZeSoD5tysdXQdv12DEH_kS4g_0GwVzqNbPHB4b7BEToQjBlSwAZmsoaeP8J1X7KohxqCk9dmwbrZDOVylmtkZw'} /> */}
        </div>
        <div className='rightColumnStyle'>Right Panel</div>
        {/* <div className='bottomPanel'>Bottom Panel</div> */}
      </div>
      <div className='footerStyle' />
    </div>

  );
};

function mapStateToProps(state: any) {
  console.log('mapStateToProps invoked');
  console.log(getMediaItems(state));
  return {
    photoLayout: getPhotoLayout(state),
    loupeViewMediaItemId: getLoupeViewMediaItemId(state),
    mediaItems: getMediaItems(state),
    keywordRootNodeId: getKeywordRootNodeId(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onLoadKeywordData: loadKeywordData,
    onLoadDefaultTagAvatarId: loadDefaultTagAvatarId,
    onLoadAppTagAvatars: loadAppTagAvatars,
    onLoadMediaItems: loadMediaItems,
    onLoadTags: loadTags,
    onLoadUserTagAvatars: loadUserTagAvatars,
    onSetAppInitialized: setAppInitialized,
    onLoadTakeouts: loadTakeouts,
    onImportFromTakeout: importFromTakeout,
    onSetLoupeViewMediaItemId: setLoupeViewMediaItemIdRedux,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

