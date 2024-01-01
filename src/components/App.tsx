import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/TedTagger.css';
import LoupeView from './LoupeView';
import { loadDefaultTagAvatarId, loadAppTagAvatars, loadMediaItems, loadTags, loadUserTagAvatars } from '../controllers';
import { TedTaggerDispatch } from '../models';

export interface AppProps {
  onLoadDefaultTagAvatarId: () => any;
  onLoadAppTagAvatars: () => any;
  onLoadMediaItems: () => any;
  onLoadTags: () => any;
  onLoadUserTagAvatars: () => any;
}

const App = (props: AppProps) => {

  React.useEffect(() => {
    props.onLoadDefaultTagAvatarId()
      .then(function () {
        return props.onLoadAppTagAvatars();
      }).then(function () {
        return props.onLoadTags();
      }).then(function () {
        return props.onLoadMediaItems();
      }, []);
  });

  console.log('poo8');
  return (
    <div>
      <div className='topPanel' >Top Panel</div>
      <div className='leftPanel'>Left Panel</div>
      <div className='centerPanel'>
        <LoupeView mediaItemId={'AEEKk92TFxiITyv1uvnEtu4aGKNUyEDUUMoy2rNoJ3HlErxsTjpi8wyK0-BJt3Uzly0ipMNrYrxnf1Xp57m40NlLF9bxUVpsSg'} />
      </div>
      <div className='rightPanel'>Right Panel</div>
      <div className='bottomPanel'>Bottom Panel</div>
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onLoadDefaultTagAvatarId: loadDefaultTagAvatarId,
    onLoadAppTagAvatars: loadAppTagAvatars,
    onLoadMediaItems: loadMediaItems,
    onLoadTags: loadTags,
    onLoadUserTagAvatars: loadUserTagAvatars,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

