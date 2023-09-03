/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { MediaItem } from '../types';
import { loadMediaItems } from '../controllers/mediaItems';
import { TedTaggerDispatch } from '../models';
import { getMediaItems } from '../selectors';
import { isNil } from 'lodash';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

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

  const imageIndex = getRandomInt(props.mediaItems.length - 1);

  const prefix = '/Users/tedshaffer/Documents/pgData/GoogleMediaItems/';
  const prefixLength = prefix.length;
  const relativePath = props.mediaItems[imageIndex].filePath!.substring(prefixLength);
  console.log('relativePath: ' + relativePath);
  const relativeUrl = 'images/' + relativePath;
  console.log('relative url: ' + relativeUrl);

  const imgStyle = {
    display: 'block',
    maxWidth: '1600px',
    maxHeight: '840px',
    width: 'auto',
    height: 'auto'
  };

  return (
    <div>
      <img style={imgStyle} src={relativeUrl}></img>
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
