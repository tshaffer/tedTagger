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
import { KeywordNode, KeywordTree } from '../types';

export interface AppProps {
  onLoadDefaultTagAvatarId: () => any;
  onLoadAppTagAvatars: () => any;
  onLoadMediaItems: () => any;
  onLoadTags: () => any;
  onLoadUserTagAvatars: () => any;
  onSetAppInitialized: () => any;
  rootKeywordId: string;
  onAddKeyword: (parentId: string, keywordLabel: string, keywordType: string) => any;
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
        const samNode = props.onAddKeyword(props.rootKeywordId, 'Sam', 'person');
        console.log('samNode: ');
        console.log(samNode);
      } else if (event.key === 'j') {
        const joelNode = props.onAddKeyword(props.rootKeywordId, 'Joel', 'person');
        console.log('joelNode: ');
        console.log(joelNode);
      } else if (event.key === 'r') {
        const rachelNode = props.onAddKeyword(props.rootKeywordId, 'Rachel', 'person');
        console.log('rachelNode: ');
        console.log(rachelNode);
      } else if (event.key === 'a') {
        debugger;
        const parentsNode: KeywordNode = props.onAddKeyword(props.rootKeywordId, 'Parents', 'person');
        const samNode: KeywordNode = props.onAddKeyword(parentsNode.nodeId, 'Sam', 'person');
        const joelNode: KeywordNode = props.onAddKeyword(parentsNode.nodeId, 'Joel', 'person');
        const rachelNode: KeywordNode = props.onAddKeyword(parentsNode.nodeId, 'Rachel', 'person');
        console.log('all nodes added');
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
  return {
    rootKeywordId: root.nodeId,
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

