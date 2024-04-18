import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/TedTagger.css';
import { loadMediaItems, loadKeywordData, loadTakeouts, importFromTakeout } from '../controllers';
import { TedTaggerDispatch, setAppInitialized } from '../models';
import GridView from './GridView';
import { getKeywordRootNodeId, getPhotoLayout } from '../selectors';
import { Button } from '@mui/material';

import Keywords from './Keywords';
import ViewSpec from './ViewSpec';
import SearchSpecDialog from './SearchSpecDialog';
import ImportFromTakeoutDialog from './ImportFromTakeoutDialog';
import LoupeViewController from './LoupeViewController';
import { PhotoLayout } from '../types';
import SurveyView from './SurveyView';
import TopToolbar from './TopToolbar';

export interface AppProps {
  photoLayout: PhotoLayout;
  onLoadKeywordData: () => any;
  onLoadMediaItems: () => any;
  onLoadTakeouts: () => any;
  onSetAppInitialized: () => any;
  keywordRootNodeId: string;
  onImportFromTakeout: (id: string) => void;
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

    console.log('React.useEffect for loading invoked');

    props.onLoadKeywordData()
      .then(function () {
        return props.onLoadTakeouts();
      }).then(function () {
        return props.onLoadMediaItems();
      }).then(function () {
        return props.onSetAppInitialized();
      });
  }, []);

  React.useEffect(() => {

    console.log('React.useEffect for centerColumn invoked');

    const divElement = document.getElementById('centerColumn') as HTMLDivElement | null;

    if (divElement) {
      console.log('divElement does exists');
      divElement.addEventListener('scroll', handleScroll);
    }

    // Cleanup function to remove the listener when component unmounts
    return () => {
      if (divElement) {
        console.log('React.useEffect for removing event listener invoked');
        divElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  function handleScroll(event: Event) {
    const target = event.target as HTMLDivElement;
    // Get the current scroll position
    const scrollPosition = target.scrollTop;
    console.log('Scroll Position:', scrollPosition);
    // You can perform any actions based on the scroll position here
  }
  
  const getPhotoDisplay = (): JSX.Element => {
    if (props.photoLayout === PhotoLayout.Loupe) {
      return (
        <LoupeViewController />
      );
    } else if (props.photoLayout === PhotoLayout.Survey) {
      return (
        <SurveyView />
      );
    } else {
      return (
        <GridView />
      );
    }
  };

  const photoDisplay: JSX.Element = getPhotoDisplay();

  console.log('render');

  return (
    <div>
      <React.Fragment>
        <TopToolbar />
      </React.Fragment>
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
        <div id='centerColumn' className='centerColumnStyle'>
          {photoDisplay}
        </div>
        <div className='rightColumnStyle'>Right Panel</div>
        {/* <div className='bottomPanel'>Bottom Panel</div> */}
      </div>
      <div className='footerStyle' />
    </div>

  );
};

function mapStateToProps(state: any) {
  return {
    photoLayout: getPhotoLayout(state),
    keywordRootNodeId: getKeywordRootNodeId(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onLoadKeywordData: loadKeywordData,
    onLoadMediaItems: loadMediaItems,
    onSetAppInitialized: setAppInitialized,
    onLoadTakeouts: loadTakeouts,
    onImportFromTakeout: importFromTakeout,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

