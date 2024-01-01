import * as React from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

import '../styles/TedTagger.css';

export interface AppProps {
  // TODO
  viewMode: string;
}

const App = (props: AppProps) => {
  console.log('poo6');
  return (
    <div>
      <div className='topPanel' >Top Panel</div>
      <div className='leftPanel'>Left Panel</div>
      <div className='centerPanel'>
        Flibbet
        {/* Content goes here */}
        {/* This panel supports vertical scrolling as needed */}
      </div>
      <div className='rightPanel'>Right Panel</div>
      <div className='bottomPanel'>Bottom Panel</div>
    </div>
  );
};

export default App;