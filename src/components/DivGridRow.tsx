import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MediaItem } from '../types';
import { TedTaggerDispatch } from '../models';
import { getAppInitialized, getMediaItems } from '../selectors';

const centerColumnWidth = 1376;

export interface DivGridRowPropsFromParent {
  startingMediaItemIndex: number;
}

export interface DivGridRowProps extends DivGridRowPropsFromParent {
  appInitialized: boolean;
  allMediaItems: MediaItem[],
}

const DivGridRow = (props: DivGridRowProps) => {

  if (!props.appInitialized) {
    return null;
  }

  if (props.allMediaItems.length === 0) {
    return null;
  }

  // let previousCumulativeWidth = 0;
  // let cumulativeWidth = 0;
  // const targetHeight = 220;

  // debugger;

  // let index = props.startingMediaItemIndex;
  // while (cumulativeWidth < centerColumnWidth) {
  //   const mediaItem = props.allMediaItems[index];
  //   const aspectRatio = mediaItem.width! / mediaItem.height!;
  //   const width = targetHeight * aspectRatio;
  //   previousCumulativeWidth = cumulativeWidth;
  //   cumulativeWidth += width;
  //   index++;
  // }

  // const widthUnderflow = previousCumulativeWidth / centerColumnWidth;
  // const calculatedHeight = targetHeight / widthUnderflow;

  // debugger;

  return (
    <div>pizza</div>
  );
};

function mapStateToProps(state: any, ownProps: any) {
  return {
    appInitialized: getAppInitialized(state),
    startingMediaItemIndex: ownProps.startingMediaItemIndex,
    allMediaItems: getMediaItems(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DivGridRow);
