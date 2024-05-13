import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GridRowData, MediaItem } from '../types';
import { TedTaggerDispatch } from '../models';
import { getAppInitialized, getMediaItems, getNumGridColumns } from '../selectors';
import GridRow from './GridRow';
import { getGridRowHeight } from '../utilities';
import { centerColumnWidth, targetHeights } from '../constants';

export interface GridViewProps {
  appInitialized: boolean;
  allMediaItems: MediaItem[],
  numGridColumns: number;
}

const GridView = (props: GridViewProps) => {

  if (!props.appInitialized) {
    return null;
  }

  if (props.allMediaItems.length === 0) {
    return null;
  }

  const getGridRowData = (): GridRowData[] => {

    const targetHeight = targetHeights[props.numGridColumns - 2];

    const gridRows: GridRowData[] = [];
    let mediaItemIndex = 0;
    while (mediaItemIndex < props.allMediaItems.length) {
      const gridRowData: GridRowData = getGridRowHeight(centerColumnWidth, targetHeight, props.allMediaItems, mediaItemIndex, props.allMediaItems.length - 1);
      mediaItemIndex = mediaItemIndex + gridRowData.numMediaItems;
      gridRows.push(gridRowData);
    }
    return gridRows;
  };

  const renderGridRow = (gridRowData: GridRowData): JSX.Element => {
    const { mediaItemIndex, numMediaItems, rowHeight, cellWidths } = gridRowData;
    return (
      <GridRow
        key={mediaItemIndex}
        mediaItemIndex={mediaItemIndex}
        numMediaItems={numMediaItems}
        rowHeight={rowHeight}
        cellWidths={cellWidths}
      />
    );
  };

  const renderGridRows = (gridRows: GridRowData[]): JSX.Element[] => {
    const renderedGridRows: JSX.Element[] = gridRows.map((gridRowData: GridRowData, index: number) => {
      const renderedGridRow = renderGridRow(gridRowData);
      return renderedGridRow;
    });

    return renderedGridRows;
  };

  const gridRows: GridRowData[] = getGridRowData();
  const renderedGridRows = renderGridRows(gridRows);

  return (
    <div>
      {renderedGridRows}
    </div>
  );
};

function mapStateToProps(state: any, ownProps: any) {
  return {
    appInitialized: getAppInitialized(state),
    allMediaItems: getMediaItems(state),
    numGridColumns: getNumGridColumns(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GridView);
