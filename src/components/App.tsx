import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/TedTagger.css';
import LoupeView from './LoupeView';
import { loadDefaultTagAvatarId, loadAppTagAvatars, loadMediaItems, loadTags, loadUserTagAvatars } from '../controllers';
import { TedTaggerDispatch, setAppInitialized } from '../models';
import GridView from './GridView';
import { addKeyword } from '../controllers';
import { KeywordNode } from '../types';
import { getKeywordRootNodeId } from '../selectors';
import Keywords from './Keywords';

export interface AppProps {
  onLoadDefaultTagAvatarId: () => any;
  onLoadAppTagAvatars: () => any;
  onLoadMediaItems: () => any;
  onLoadTags: () => any;
  onLoadUserTagAvatars: () => any;
  onSetAppInitialized: () => any;
  keywordRootNodeId: string;
  onAddKeyword: (parentId: string, keywordLabel: string, keywordType: string) => any;
}

const App = (props: AppProps) => {

  const buildTree = () => {
    const grandmaEmilyNode: KeywordNode = props.onAddKeyword(props.keywordRootNodeId, 'Grandma Emily', 'person');
    const tedNode: KeywordNode = props.onAddKeyword(grandmaEmilyNode.nodeId, 'Ted', 'person');
    const noahNode: KeywordNode = props.onAddKeyword(grandmaEmilyNode.nodeId, 'Noah', 'person');
    const samNode: KeywordNode = props.onAddKeyword(tedNode.nodeId, 'Sam', 'person');
    const joelNode: KeywordNode = props.onAddKeyword(tedNode.nodeId, 'Joel', 'person');
    const rachelNode: KeywordNode = props.onAddKeyword(tedNode.nodeId, 'Rachel', 'person');
    const mattNode: KeywordNode = props.onAddKeyword(noahNode.nodeId, 'Matt', 'person');
    const andrewNode: KeywordNode = props.onAddKeyword(noahNode.nodeId, 'Andrew', 'person');
    const elenaNode: KeywordNode = props.onAddKeyword(mattNode.nodeId, 'Elena', 'person');
  };

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
        return buildTree();
      }).then(function () {
        return props.onSetAppInitialized();
      }, []);
  });

  // React.useEffect(() => {
  //   const handleKeyPress = (event: KeyboardEvent) => {
  //     // if (event.key === 'Escape') {
  //     //   // Handle the escape key press here
  //     //   console.log('Escape key pressed!');
  //     //   // Add your logic to handle the escape key press globally
  //     // }
  //     console.log('key pressed: ' + event.key);

  //     if (event.key === 's') {
  //       const samNode = props.onAddKeyword(props.keywordRootNodeId, 'Sam', 'person');
  //       console.log('samNode: ');
  //       console.log(samNode);
  //     } else if (event.key === 'j') {
  //       const joelNode = props.onAddKeyword(props.keywordRootNodeId, 'Joel', 'person');
  //       console.log('joelNode: ');
  //       console.log(joelNode);
  //     } else if (event.key === 'r') {
  //       const rachelNode = props.onAddKeyword(props.keywordRootNodeId, 'Rachel', 'person');
  //       console.log('rachelNode: ');
  //       console.log(rachelNode);
  //     } else if (event.key === 'a') {
  //       const grandmaEmilyNode: KeywordNode = props.onAddKeyword(props.keywordRootNodeId, 'Grandma Emily', 'person');
  //       const tedNode: KeywordNode = props.onAddKeyword(grandmaEmilyNode.nodeId, 'Ted', 'person');
  //       const noahNode: KeywordNode = props.onAddKeyword(grandmaEmilyNode.nodeId, 'Noah', 'person');
  //       const samNode: KeywordNode = props.onAddKeyword(tedNode.nodeId, 'Sam', 'person');
  //       const joelNode: KeywordNode = props.onAddKeyword(tedNode.nodeId, 'Joel', 'person');
  //       const rachelNode: KeywordNode = props.onAddKeyword(tedNode.nodeId, 'Rachel', 'person');
  //       const mattNode: KeywordNode = props.onAddKeyword(noahNode.nodeId, 'Matt', 'person');
  //       const andrewNode: KeywordNode = props.onAddKeyword(noahNode.nodeId, 'Andrew', 'person');
  //       const elenaNode: KeywordNode = props.onAddKeyword(mattNode.nodeId, 'Elena', 'person');
  //       console.log('all nodes added');
  //     }
  //   };

  //   // Add the event listener when the component mounts
  //   console.log('addEventListener!');
  //   document.addEventListener('keydown', handleKeyPress);

  //   // Remove the event listener when the component unmounts
  //   return () => {
  //     console.log('removeEventListener!');
  //     document.removeEventListener('keydown', handleKeyPress);
  //   };
  // }, []); // Empty dependency array ensures that the effect runs only once on mount


  // <LoupeView mediaItemId={'AEEKk92TFxiITyv1uvnEtu4aGKNUyEDUUMoy2rNoJ3HlErxsTjpi8wyK0-BJt3Uzly0ipMNrYrxnf1Xp57m40NlLF9bxUVpsSg'} />
  // <LoupeView mediaItemId={'AEEKk90Fx9zbfbE_1YBjDw6BrHlfnSWVtuYvPtcYmkWW8ZCUyL2QlqL2_krRkWMaTlA2gMTNx6eU0ob79Lqd_A9v9YYpXKyaow'} />
  // <GridView />

  return (
    <div>
      <div className='toolbarStyle' />
      <div className='appStyle'>
        <div className='leftColumnStyle'>
          <Keywords />
        </div>
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
  return {
    keywordRootNodeId: getKeywordRootNodeId(state),
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

