import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/TedTagger.css';
import LoupeView from './LoupeView';
import { loadDefaultTagAvatarId, loadAppTagAvatars, loadMediaItems, loadTags, loadUserTagAvatars } from '../controllers';
import { TedTaggerDispatch, setAppInitialized } from '../models';
import GridView from './GridView';
import { addKeyword } from '../controllers';
import { getKeywords } from '../selectors';
import { Keyword, KeywordNode, KeywordTree } from '../types';

export interface AppProps {
  onLoadDefaultTagAvatarId: () => any;
  onLoadAppTagAvatars: () => any;
  onLoadMediaItems: () => any;
  onLoadTags: () => any;
  onLoadUserTagAvatars: () => any;
  onSetAppInitialized: () => any;
  rootKeywordId: string;
  onAddKeyword: (parentKeywordId: string, keyword: string) => any;
}

const App = (props: AppProps) => {

  React.useEffect(() => {
    props.onLoadDefaultTagAvatarId()
      .then(function () {
        return props.onLoadAppTagAvatars();
      }).then(function () {
        return props.onLoadUserTagAvatars();
      }).then(function () {
        return props.onLoadTags();
      }).then(function () {
        return props.onLoadMediaItems();
      }).then(function () {
        return props.onSetAppInitialized();
      }, []);
  });

  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // if (event.key === 'Escape') {
      //   // Handle the escape key press here
      //   console.log('Escape key pressed!');
      //   // Add your logic to handle the escape key press globally
      // }
      console.log('key pressed: ' + event.key);

      if (event.key === 's') {
        props.onAddKeyword(props.rootKeywordId, 'Sam');
      } else if (event.key === 'j') {
        props.onAddKeyword(props.rootKeywordId, 'Joel');
      } else if (event.key === 'r') {
        props.onAddKeyword(props.rootKeywordId, 'Rachel');
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


  // <LoupeView mediaItemId={'AEEKk92TFxiITyv1uvnEtu4aGKNUyEDUUMoy2rNoJ3HlErxsTjpi8wyK0-BJt3Uzly0ipMNrYrxnf1Xp57m40NlLF9bxUVpsSg'} />
  // <LoupeView mediaItemId={'AEEKk90Fx9zbfbE_1YBjDw6BrHlfnSWVtuYvPtcYmkWW8ZCUyL2QlqL2_krRkWMaTlA2gMTNx6eU0ob79Lqd_A9v9YYpXKyaow'} />
  // <GridView />

  console.log('poo8');
  return (
    <div>
      <div className='toolbarStyle' />
      <div className='appStyle'>
        <div className='leftColumnStyle'>Left Panel</div>
        <div className='centerColumnStyle'>
          <GridView />
        </div>
        <div className='rightColumnStyle'>Right Panel</div>
        {/* <div className='bottomPanel'>Bottom Panel</div> */}
      </div>
      <div className='footerStyle' />
    </div>

  );
};

function mapStateToProps(state: any) {
  const keywords: KeywordTree = getKeywords(state);
  const root: KeywordNode = keywords.root;
  const value: Keyword = root.value;
  return {
    rootKeywordId: value.id,
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onLoadDefaultTagAvatarId: loadDefaultTagAvatarId,
    onLoadAppTagAvatars: loadAppTagAvatars,
    onLoadMediaItems: loadMediaItems,
    onLoadTags: loadTags,
    onLoadUserTagAvatars: loadUserTagAvatars,
    onSetAppInitialized: setAppInitialized,
    onAddKeyword: addKeyword,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

