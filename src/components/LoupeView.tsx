import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/TedTagger.css';
import { TedTaggerDispatch } from '../models';
import { getMediaItemById, getFullScreenMediaItemId } from '../selectors';
import { MediaItem } from '../types';

export interface LoupePropsFromParent {
  mediaItemId: string;
}

export interface LoupeProps extends LoupePropsFromParent {
  mediaItem: MediaItem | null;
}

const Loupe = (props: LoupeProps) => {
  console.log('poo6');
  console.log('props.mediaItemId', props.mediaItemId);
  console.log('props.mediaItem', props.mediaItem);
  
  return (
    <div>
      <div className='loupeView'>LoupeView</div>
    </div>
  );
};

function mapStateToProps(state: any, ownProps: any) {
  return {
    mediaItem: getMediaItemById(state, ownProps.mediaItemId),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Loupe);
