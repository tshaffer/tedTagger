import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TedTaggerDispatch } from '../models';

import '../styles/TedTagger.css';
import { MediaItem } from '../types';
import { getMediaItems } from '../selectors';

export interface DivGridCellPropsFromParent {
  mediaItemIndex: number;
  rowHeight: number;
  cellWidth: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DivGridCellProps extends DivGridCellPropsFromParent {
  allMediaItems: MediaItem[],
}

const DivGridCell = (props: DivGridCellProps) => {

  const mediaItem: MediaItem = props.allMediaItems[props.mediaItemIndex];
  const widthAttribute: string = props.cellWidth.toString() + 'px';
  const heightAttribute: string = props.rowHeight.toString() + 'px';

  return (
    <div style={{
      display: 'inline-block',
      width: widthAttribute,
      height: heightAttribute,
    }}>
      {mediaItem.fileName}
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
    allMediaItems: getMediaItems(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DivGridCell);
