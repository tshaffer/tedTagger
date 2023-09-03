/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AppState, MediaItem } from '../types';
import { loadMediaItems } from '../controllers/mediaItems';
import { TedTaggerDispatch } from '../models';
import { getMediaItems } from '../selectors';
import { isNil } from 'lodash';
// import {
//   initializeApp,
// } from '../controllers';

// import {
//   getAppInitialized,
//   getAppState,
// } from '../selectors';
// import { MealWheelDispatch } from '../models';

// export interface HomeProps {
//   appInitialized: boolean;
//   appState: AppState,
//   onInitializeApp: () => any;
// }

export interface HomeProps {
  mediaItems: MediaItem[],
  onLoadMediaItems: () => any;
}


const Home = (props: HomeProps) => {


  React.useEffect(() => {
    console.log('React.useEffect');
    props.onLoadMediaItems();
  }, []);

  // React.useEffect(() => {
  //   if (!props.appInitialized) {
  //     props.onInitializeApp();
  //   }
  // }, [props.appInitialized]);


  // const divStyle = {
  //   height: '98vh',
  // };

  // if (!props.appInitialized) {
  //   return (
  //     <div style={divStyle}>Loading...</div>
  //   );
  // }

  // switch (props.appState.uiState) {
  //   case UiState.SelectUser:
  //     return <Navigate to='/login' />;
  //   case UiState.Other:
  //     return <Navigate to='/app' />;
  //   default:
  //     return (
  //       <div style={divStyle}>Loading...</div>
  //     );
  // }

  const mediaItemCount: number = isNil(props.mediaItems) ? 0 : props.mediaItems.length;
  return (
    <div>Pizza {mediaItemCount}</div>
  );
};

function mapStateToProps(state: any) {
  return {
    mediaItems: getMediaItems(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onLoadMediaItems: loadMediaItems,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
