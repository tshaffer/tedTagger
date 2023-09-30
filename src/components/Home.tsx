import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { MediaItem } from '../types';
import { loadMediaItems } from '../controllers/mediaItems';
import { TedTaggerDispatch } from '../models';
import { getMediaItems } from '../selectors';
import { isNil } from 'lodash';

import BasicGrid from './BasicGrid';

export interface HomeProps {
  mediaItems: MediaItem[],
  onLoadMediaItems: () => any;
}

const Home = (props: HomeProps) => {


  React.useEffect(() => {
    console.log('React.useEffect');
    props.onLoadMediaItems();
  }, []);

  if (isNil(props.mediaItems) || props.mediaItems.length === 0) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div>
      <BasicGrid/>
    </div>
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
