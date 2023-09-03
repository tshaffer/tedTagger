/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AppState } from '../types';
import { loadMediaItems } from '../controllers/mediaItems';
import { TedTaggerDispatch } from '../models';
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
  onLoadMediaItems: () => any;
}


const Home = (props: HomeProps) => {


  React.useEffect(() => {
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
  return (
    <div>Pizza</div>
  );
};

function mapStateToProps(state: any) {
  return {
    // appInitialized: getAppInitialized(state),
    // appState: getAppState(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onLoadMediaItems: loadMediaItems,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
