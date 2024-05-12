import { GridRowData, MediaItem } from '../types';

import { bordersSize } from '../types';

export const getGridRowHeight = (rowWidth: number, mediaItems: MediaItem[], startingMediaItemIndex: number, maxRowIndex: number): GridRowData => {

  const cellWidths: number[] = [];

  let previousCumulativeWidth = 0;
  let cumulativeWidth = 0;
  const targetHeight = 220;

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
  while (((cumulativeWidth + 5) < rowWidth) && (index <= maxRowIndex)) {
    const mediaItem = mediaItems[index];
    const aspectRatio = mediaItem.width! / mediaItem.height!;
    const width = calculatedHeight * aspectRatio;
    cellWidths.push(width);
    previousCumulativeWidth = cumulativeWidth;
    cumulativeWidth += width + bordersSize;
    index++;
  }

  return {
    rowHeight: calculatedHeight,
    mediaItemIndex: startingMediaItemIndex,
    numMediaItems: index - startingMediaItemIndex,
    cellWidths,
  };

};