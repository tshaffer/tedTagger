import { cloneDeep } from 'lodash';
import { bordersSize } from '../constants';
import { GridRowData, MediaItem } from '../types';

export const getGridRowHeight = (rowWidth: number, targetHeight: number, mediaItems: MediaItem[], startingMediaItemIndex: number, maxRowIndex: number): GridRowData => {

  const cellWidths: number[] = [];

  let previousCumulativeWidth = 0;
  let cumulativeWidth = 0;

  let index = startingMediaItemIndex;
  while ((cumulativeWidth < rowWidth) && (index <= maxRowIndex)) {
    const mediaItem = mediaItems[index];
    const aspectRatio = mediaItem.width! / mediaItem.height!;
    const width = targetHeight * aspectRatio;
    previousCumulativeWidth = cumulativeWidth;
    cumulativeWidth += width + bordersSize;
    index++;
  }

  const widthUnderflow = previousCumulativeWidth / rowWidth;
  const calculatedHeight = targetHeight / widthUnderflow;

  cumulativeWidth = 0;

  index = startingMediaItemIndex;
  // HACK - to work around small round off error - not stopping to think about the correct code
  while (((cumulativeWidth + 0.25) < rowWidth) && (index <= maxRowIndex)) {
    const mediaItem = mediaItems[index];
    const aspectRatio = mediaItem.width! / mediaItem.height!;
    const width = calculatedHeight * aspectRatio;
    cellWidths.push(width);
    previousCumulativeWidth = cumulativeWidth;
    cumulativeWidth += width + bordersSize;
    index++;
  }

  const tmp = cloneDeep(cellWidths);
  const overflowCellWidth = tmp.pop();
  const sumOfCellWidths = tmp.reduce((partialSum, a) => partialSum + a, 0);
  const totalRowWidth = sumOfCellWidths + (tmp.length * bordersSize);

  console.log(startingMediaItemIndex, totalRowWidth, sumOfCellWidths, overflowCellWidth, sumOfCellWidths + overflowCellWidth! + bordersSize);

  return {
    rowHeight: calculatedHeight,
    mediaItemIndex: startingMediaItemIndex,
    numMediaItems: (index - 1) - startingMediaItemIndex,
    cellWidths,
  };

};