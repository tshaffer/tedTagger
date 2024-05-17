import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/TedTagger.css';
import { loadMediaItems, loadKeywordData, loadTakeouts, importFromTakeout, loadDeletedMediaItems } from '../controllers';
import { TedTaggerDispatch, setAppInitialized } from '../models';
import { getKeywordRootNodeId, getPhotoLayout } from '../selectors';
import { Button } from '@mui/material';

import Keywords from './Keywords';
import SearchSpecDialog from './SearchSpecDialog';
import ImportFromTakeoutDialog from './ImportFromTakeoutDialog';
import LoupeViewController from './LoupeViewController';
import { PhotoLayout } from '../types';
import SurveyView from './SurveyView';
import TopToolbar from './TopToolbar';
import GridView from './GridView';

export interface AppProps {
  photoLayout: PhotoLayout;
  onLoadKeywordData: () => any;
  onLoadMediaItems: () => any;
  onLoadDeletedMediaItems: () => any;
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
    props.onLoadKeywordData()
      .then(function () {
        return props.onLoadTakeouts();
      }).then(function () {
        return props.onLoadMediaItems();
      }).then(function () {
        return props.onLoadDeletedMediaItems();
      }).then(function () {
        return props.onSetAppInitialized();
      });
  }, []);

  const getLeftColumn = (): JSX.Element => {
    return (
      <div className='leftColumnStyle'>
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
    );
  };

  const getPhotoDisplay = (): JSX.Element => {
    if (props.photoLayout === PhotoLayout.Loupe) {
      return (
        <React.Fragment>
          <div id='centerColumn' className='centerColumnStyle'>
            <LoupeViewController />
          </div>
        </React.Fragment>
      );
    } else if (props.photoLayout === PhotoLayout.Survey) {
      return (
        <React.Fragment>
          {getLeftColumn()}
          <div id='centerColumn' className='centerColumnStyle'>
            <SurveyView />
          </div>
          <div className='rightColumnStyle'>Right Panel</div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          {getLeftColumn()}
          <div id='centerColumn' className='centerColumnStyle'>
            <GridView />
          </div>
          <div className='rightColumnStyle'>Right Panel</div>
        </React.Fragment>
      );
    }
  };

  const photoDisplay: JSX.Element = getPhotoDisplay();

  return (
    <div>
      <React.Fragment>
        <TopToolbar />
      </React.Fragment>
      <div className='appStyle'>
        {photoDisplay}
      </div>
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
    onLoadDeletedMediaItems: loadDeletedMediaItems,
    onSetAppInitialized: setAppInitialized,
    onLoadTakeouts: loadTakeouts,
    onImportFromTakeout: importFromTakeout,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

