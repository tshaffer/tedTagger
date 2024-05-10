import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MediaItem } from '../types';
import { TedTaggerDispatch } from '../models';
import { getAppInitialized, getMediaItems } from '../selectors';
import DivGridCell from './DivGridCell';

export interface DivGridRowPropsFromParent {
  mediaItemIndex: number;
  numMediaItems: number;
  rowHeight: number;
  cellWidths: number[];
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

  const getGridCell = (mediaItemIndex: number, cellWidth: number): JSX.Element => {
    return (
      <DivGridCell
        mediaItemIndex={mediaItemIndex}
        rowHeight={props.rowHeight}
        cellWidth={cellWidth}
      />
    );
  };

  const getGridCells = (): JSX.Element[] => {
    const gridCells: JSX.Element[] = [];
    for (let index = props.mediaItemIndex; index < (props.mediaItemIndex + props.numMediaItems); index++) {
      const cellWidth = props.cellWidths[index - props.mediaItemIndex];
      const gridCellElement = getGridCell(index, cellWidth);
      gridCells.push(gridCellElement);
    }
    return gridCells;
  };

  const gridCells = getGridCells();

  return (
    <div style={{
      height: props.rowHeight.toString() + 'px'
    }}>
      {gridCells}
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DivGridRow);
