import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MediaItem } from '../types';
import { TedTaggerDispatch } from '../models';
import { getAppInitialized, getDisplayMetadata, getMediaItems } from '../selectors';
import GridCell from './GridCell';
import { bordersSize } from '../constants';

export interface GridRowPropsFromParent {
  mediaItemIndex: number;
  numMediaItems: number;
  rowHeight: number;
  cellWidths: number[];
}

export interface GridRowProps extends GridRowPropsFromParent {
  appInitialized: boolean;
  allMediaItems: MediaItem[],
  displayMetadata: boolean;
}

const GridRow = (props: GridRowProps) => {

  if (!props.appInitialized) {
    return null;
  }

  if (props.allMediaItems.length === 0) {
    return null;
  }

  const getGridCell = (mediaItemIndex: number, cellWidth: number, includePadding: boolean): JSX.Element => {
    return (
      <GridCell
        mediaItemIndex={mediaItemIndex}
        mediaItem={props.allMediaItems[mediaItemIndex]}
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

  const metadataHeight: number = props.displayMetadata ? 60 : 0;
  const heightAttribute: string = (props.rowHeight + metadataHeight + bordersSize).toString() + 'px';

  return (
    <div style={{
      height: heightAttribute,
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
    displayMetadata: getDisplayMetadata(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GridRow);
