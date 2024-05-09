import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TedTaggerDispatch } from '../models';

export interface CSSGridProps {
  rowHeights: number[];
  columnWidthsByRowIndex: { [index: number]: number[] };
  gridItemColorsByRowIndex: { [index: number]: string[] };
}

const CSSGrid = (props: CSSGridProps) => {
  const { rowHeights, columnWidthsByRowIndex, gridItemColorsByRowIndex } = props;

  return (
    <div className="grid-container">
      {rowHeights.map((rowHeight, rowIndex) => (
        <div
          key={rowIndex}
          className="grid-row"
          style={{ gridTemplateColumns: `repeat(${columnWidthsByRowIndex[rowIndex].length}, 1fr)` }}
        >
          {columnWidthsByRowIndex[rowIndex].map((columnWidth, columnIndex) => (
            <div
              key={columnIndex}
              className="grid-item"
              style={{
                width: columnWidth,
                height: rowHeight,
                backgroundColor: gridItemColorsByRowIndex[rowIndex][columnIndex]
              }}
            >
              {/* You can put content here */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CSSGrid);
