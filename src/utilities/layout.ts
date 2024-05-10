import { isNil } from 'lodash';
import { GridRowData, MediaItem } from '../types';

export const getGridRowHeight = (rowWidth: number, mediaItems: MediaItem[], startingMediaItemIndex: number, maxRowIndex: number): GridRowData => {

  let previousCumulativeWidth = 0;
  let cumulativeWidth = 0;
  const targetHeight = 220;

  let index = startingMediaItemIndex;
  while ((cumulativeWidth < rowWidth) && (index <= maxRowIndex)) {
    const mediaItem = mediaItems[index];
    const aspectRatio = mediaItem.width! / mediaItem.height!;
    const width = targetHeight * aspectRatio;
    previousCumulativeWidth = cumulativeWidth;
    cumulativeWidth += width;
    index++;
  }

  const widthUnderflow = previousCumulativeWidth / rowWidth;
  const calculatedHeight = targetHeight / widthUnderflow;

  cumulativeWidth = 0;

  index = startingMediaItemIndex;
  while ((cumulativeWidth < rowWidth) && (index <= maxRowIndex)) {
    const mediaItem = mediaItems[index];
    const aspectRatio = mediaItem.width! / mediaItem.height!;
    const width = calculatedHeight * aspectRatio;
    previousCumulativeWidth = cumulativeWidth;
    cumulativeWidth += width;
    index++;
  }

  return {
    mediaItemIndex: startingMediaItemIndex,
    numMediaItems: index - startingMediaItemIndex,
    rowHeight: calculatedHeight,
  };

};