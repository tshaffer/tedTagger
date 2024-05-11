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

  const getGridCell = (mediaItemIndex: number, cellWidth: number, includePadding: boolean): JSX.Element => {
    return (
      <DivGridCell
        mediaItemIndex={mediaItemIndex}
        rowHeight={props.rowHeight}
        cellWidth={cellWidth}
        includePadding={includePadding}
      />
    );
  };

  const getGridCells = (): JSX.Element[] => {
    const gridCells: JSX.Element[] = [];
    for (let index = props.mediaItemIndex; index < (props.mediaItemIndex + props.numMediaItems); index++) {
      const cellWidth = props.cellWidths[index - props.mediaItemIndex];
      const includePadding = index < (props.mediaItemIndex + props.numMediaItems - 1);
      const gridCellElement = getGridCell(index, cellWidth, includePadding);
      gridCells.push(gridCellElement);
    }
    return gridCells;
  };

  const gridCells = getGridCells();

  return (
    <div style={{
      height: props.rowHeight.toString() + 'px',
      paddingBottom: '4px',
      backgroundColor: 'white',
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
