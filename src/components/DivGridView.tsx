import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MediaItem } from '../types';
import { TedTaggerDispatch } from '../models';
import { getAppInitialized, getMediaItems } from '../selectors';
import DivGridRow from './DivGridRow';
import { getRowHeight } from '../utilities';

const centerColumnWidth = 1376;

export interface DivGridViewProps {
  appInitialized: boolean;
  allMediaItems: MediaItem[],
}

const DivGridView = (props: DivGridViewProps) => {

  if (!props.appInitialized) {
    return null;
  }

  if (props.allMediaItems.length === 0) {
    return null;
  }

  let mediaItemIndex = 0;
  while (mediaItemIndex < props.allMediaItems.length) {
    const { height, endingMediaItemIndex } = getRowHeight(centerColumnWidth, props.allMediaItems, mediaItemIndex, props.allMediaItems.length - 1);
    console.log('height: ', height);
    console.log('endingMediaItemIndex: ', endingMediaItemIndex);
    mediaItemIndex = endingMediaItemIndex + 1;
  }

  return (
    <DivGridRow
      startingMediaItemIndex={0}
    />
  );
};

function mapStateToProps(state: any, ownProps: any) {
  return {
    appInitialized: getAppInitialized(state),
    allMediaItems: getMediaItems(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DivGridView);
