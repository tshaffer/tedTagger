import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GridRowData, MediaItem } from '../types';
import { TedTaggerDispatch } from '../models';
import { getAppInitialized, getMediaItems } from '../selectors';
import DivGridRow from './DivGridRow';
import { getGridRowHeight } from '../utilities';

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
    const gridRowData: GridRowData = getGridRowHeight(centerColumnWidth, props.allMediaItems, mediaItemIndex, props.allMediaItems.length - 1);
    console.log('gridRowData: ', gridRowData);
    mediaItemIndex = mediaItemIndex + gridRowData.numMediaItems;
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
