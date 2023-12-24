import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import path from 'path-browserify';

import { MediaItem } from '../types';
import { TedTaggerDispatch } from '../models';
import { getMediaItem, getFullScreenMediaItemId } from '../selectors';


export interface FullScreenPhotoProps {
  mediaItem: MediaItem | null;
}

function FullScreenPhoto(props: FullScreenPhotoProps) {

  const getPhotoUrl = (): string => {
    const basename: string = path.basename(props.mediaItem!.filePath!);
    const numChars = basename.length;
    const photoUrl = path.join(
      '/images',
      basename.charAt(numChars - 6),
      basename.charAt(numChars - 5),
      basename,
    );
    return photoUrl;
  };

  return (
    <img
      width={'200px'}
      height='auto'
      src={getPhotoUrl()}
    />
  );
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    mediaItem: getMediaItem(state, getFullScreenMediaItemId(state)),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FullScreenPhoto);
