import { cloneDeep } from 'lodash';
import { bordersSize } from '../constants';
import { GridRowData, MediaItem } from '../types';

export const getGridRowHeight = (
  rowWidth: number,
  targetHeight: number,
  mediaItems: MediaItem[],
  startingMediaItemIndex: number,
  maxRowIndex: number
): GridRowData => {
  const margin = 8; // Total margin (4px left + 4px right)
  let totalWidth = 0;
  let totalImageWidth = 0;
  let itemCount = 0;
  let adjustedHeight = targetHeight;
  const itemWidths: number[] = [];
  const itemWidthsWithoutMargin: number[] = [];

  const roundToPrecision = (value: number, precision: number): number => {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  };

  // First pass: Determine how many items can fit in the row using the target height
  for (let i = startingMediaItemIndex; i <= maxRowIndex; i++) {
    const item = mediaItems[i];
    const itemAspectRatio = item.width! / item.height!;
    const scaledWidth = itemAspectRatio * targetHeight;
    const scaledWidthWithMargin = scaledWidth + margin;

    // Check if adding this item would exceed the row width
    if (totalWidth + scaledWidthWithMargin > rowWidth) {
      break;
    }

    totalWidth += scaledWidthWithMargin;
    totalImageWidth += scaledWidth;
    itemCount++;
  }

  // Adjust height if the row was not filled using the target height
  if (totalWidth < rowWidth && itemCount > 0) {
    adjustedHeight = targetHeight * ((rowWidth - (itemCount * margin)) / totalImageWidth);
  }

  // Second pass: Calculate the rendered width of each item in the row using the adjusted height
  totalWidth = 0;
  for (let i = startingMediaItemIndex; i < startingMediaItemIndex + itemCount; i++) {
    const item = mediaItems[i];
    const itemAspectRatio = item.width! / item.height!;
    const scaledWidth = itemAspectRatio * adjustedHeight;
    const scaledWidthWithMargin = roundToPrecision(scaledWidth + margin, 2);
    itemWidths.push(scaledWidthWithMargin);
    itemWidthsWithoutMargin.push(roundToPrecision(scaledWidth, 2));
    totalWidth += scaledWidthWithMargin;
  }

  // Sum the values in itemWidths
  const totalItemWidths = itemWidthsWithoutMargin.reduce((acc, width) => acc + width, 0);

  // Output the sum of the itemWidths to the console
  console.log('Total width of items including margins:', totalItemWidths);

  return {
    // finalHeight: adjustedHeight,
    // numberOfItems: itemCount,
    // itemWidths: itemWidths,
    mediaItemIndex: startingMediaItemIndex,
    numMediaItems: itemCount,
    rowHeight: adjustedHeight,
    cellWidths: itemWidthsWithoutMargin,
  };
};

export const getGridRowHeight_chatty_2 = (
  rowWidth: number,
  targetHeight: number,
  mediaItems: MediaItem[],
  startingMediaItemIndex: number,
  maxRowIndex: number
): GridRowData => {
  const margin = 8; // Total margin (4px left + 4px right)
  let totalWidth = 0;
  let totalImageWidth = 0;
  let itemCount = 0;
  let adjustedHeight = targetHeight;
  const itemWidths: number[] = [];
  const itemWidthsWithoutMargin: number[] = [];

  console.log('rowWidth', rowWidth);
  console.log('targetHeight', targetHeight);
  console.log('mediaItems[0] width & height', mediaItems[0].width, mediaItems[0].height);
  console.log('mediaItems[1] width & height', mediaItems[1].width, mediaItems[1].height);
  console.log('mediaItems[2] width & height', mediaItems[2].width, mediaItems[2].height);
  console.log('mediaItems[3] width & height', mediaItems[3].width, mediaItems[3].height);
  console.log('mediaItems[4] width & height', mediaItems[4].width, mediaItems[4].height);
  console.log('mediaItems[5] width & height', mediaItems[5].width, mediaItems[5].height);
  console.log('mediaItems[6] width & height', mediaItems[6].width, mediaItems[6].height);
  console.log('startingMediaItemIndex', startingMediaItemIndex);
  console.log('maxRowIndex', maxRowIndex);

  // First pass: Determine how many items can fit in the row using the target height
  for (let i = startingMediaItemIndex; i <= maxRowIndex; i++) {
    const item = mediaItems[i];
    const itemAspectRatio = item.width! / item.height!;
    const scaledWidth = itemAspectRatio * targetHeight;
    const scaledWidthWithMargin = scaledWidth + margin;

    // Check if adding this item would exceed the row width
    if (totalWidth + scaledWidthWithMargin > rowWidth) {
      break;
    }

    totalWidth += scaledWidthWithMargin;
    totalImageWidth += scaledWidth;
    itemCount++;
  }

  // Adjust height if the row was not filled using the target height
  if (totalWidth < rowWidth && itemCount > 0) {
    adjustedHeight = targetHeight * ((rowWidth - (itemCount * margin)) / totalImageWidth);
  }

  // Second pass: Calculate the rendered width of each item in the row using the adjusted height
  totalWidth = 0;
  for (let i = startingMediaItemIndex; i < startingMediaItemIndex + itemCount; i++) {
    const item = mediaItems[i];
    const itemAspectRatio = item.width! / item.height!;
    const scaledWidth = itemAspectRatio * adjustedHeight;
    const scaledWidthWithMargin = scaledWidth + margin;
    itemWidths.push(scaledWidthWithMargin);
    itemWidthsWithoutMargin.push(scaledWidth);
    totalWidth += scaledWidthWithMargin;
  }

  console.log('adjustedHeight', adjustedHeight);
  console.log('itemCount', itemCount);
  console.log('itemWidths', itemWidths);

  // Sum the values in itemWidths
  const totalItemWidths = itemWidths.reduce((acc, width) => acc + width, 0);

  // Output the sum of the itemWidths to the console
  console.log('Total width of items including margins:', totalItemWidths);

  return {
    // finalHeight: adjustedHeight,
    // numberOfItems: itemCount,
    // itemWidths: itemWidths,
    mediaItemIndex: startingMediaItemIndex,
    numMediaItems: itemCount,
    rowHeight: adjustedHeight,
    cellWidths: itemWidthsWithoutMargin,
  };
};

export const getGridRowHeight_chatty_1 = (
  rowWidth: number,
  targetHeight: number,
  mediaItems: MediaItem[],
  startingMediaItemIndex: number,
  maxRowIndex: number
): GridRowData => {
  const margin = 8; // Total margin (4px left + 4px right)
  let totalWidth = 0;
  let itemCount = 0;
  let adjustedHeight = targetHeight;
  const itemWidths: number[] = [];

  // First pass: Determine how many items can fit in the row using the target height
  for (let i = startingMediaItemIndex; i <= maxRowIndex; i++) {
    const item = mediaItems[i];
    const itemAspectRatio = item.width! / item.height!;
    const scaledWidth = itemAspectRatio * targetHeight + margin;

    // Check if adding this item would exceed the row width
    if (totalWidth + scaledWidth > rowWidth) {
      break;
    }

    totalWidth += scaledWidth;
    itemCount++;
  }

  // Adjust height if the row was not filled using the target height
  if (totalWidth < rowWidth && itemCount > 0) {
    adjustedHeight = targetHeight * (rowWidth / totalWidth);
  }

  // Second pass: Calculate the rendered width of each item in the row using the adjusted height
  totalWidth = 0;
  for (let i = startingMediaItemIndex; i < startingMediaItemIndex + itemCount; i++) {
    const item = mediaItems[i];
    const itemAspectRatio = item.width! / item.height!;
    const scaledWidth = itemAspectRatio * adjustedHeight + margin;
    itemWidths.push(scaledWidth);
    totalWidth += scaledWidth;
  }

  return {
    // finalHeight: adjustedHeight,
    // numberOfItems: itemCount,
    // itemWidths: itemWidths,
    mediaItemIndex: startingMediaItemIndex,
    numMediaItems: itemCount,
    rowHeight: adjustedHeight,
    cellWidths: itemWidths,
  };
};

export const getGridRowHeight_chatty_0 = (
  rowWidth: number,
  targetHeight: number,
  mediaItems: MediaItem[],
  startingMediaItemIndex: number,
  maxRowIndex: number
): GridRowData => {
  let totalWidth = 0;
  let itemCount = 0;
  let adjustedHeight = targetHeight;
  const itemWidths: number[] = [];

  // First pass: Determine how many items can fit in the row using the target height
  for (let i = startingMediaItemIndex; i <= maxRowIndex; i++) {
    const item = mediaItems[i];
    const itemAspectRatio = item.width! / item.height!;
    const scaledWidth = itemAspectRatio * targetHeight;

    // Check if adding this item would exceed the row width
    if (totalWidth + scaledWidth > rowWidth) {
      break;
    }

    totalWidth += scaledWidth;
    itemCount++;
  }

  // Adjust height if the row was not filled using the target height
  if (totalWidth < rowWidth && itemCount > 0) {
    adjustedHeight = targetHeight * (rowWidth / totalWidth);
  }

  // Second pass: Calculate the rendered width of each item in the row using the adjusted height
  totalWidth = 0;
  for (let i = startingMediaItemIndex; i < startingMediaItemIndex + itemCount; i++) {
    const item = mediaItems[i];
    const itemAspectRatio = item.width! / item.height!;
    const scaledWidth = itemAspectRatio * adjustedHeight;
    itemWidths.push(scaledWidth);
    totalWidth += scaledWidth;
  }

  console.log(adjustedHeight, itemWidths);

  return {
    mediaItemIndex: startingMediaItemIndex,
    numMediaItems: itemCount,
    rowHeight: adjustedHeight,
    cellWidths: itemWidths,
  };
};

export const getGridRowHeight_mine = (rowWidth: number, targetHeight: number, mediaItems: MediaItem[], startingMediaItemIndex: number, maxRowIndex: number): GridRowData => {

  debugger;

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

  // calculate the available rowWidth minus the space used by margins
  // the number of margins used here is the number of cells in the row + 1, as another cell may get added
  rowWidth = rowWidth - (bordersSize * (index - startingMediaItemIndex));
  const widthUnderflow = (previousCumulativeWidth - (bordersSize * (index - 1))) / rowWidth;

  // const widthUnderflow = previousCumulativeWidth / rowWidth;

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