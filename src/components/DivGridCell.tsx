import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TedTaggerDispatch } from '../models';

import '../styles/TedTagger.css';
import { MediaItem } from '../types';
import { getDisplayMetadata, getKeywordLabelsForMediaItem, getMediaItems, isMediaItemSelected } from '../selectors';
import { getPhotoUrl } from '../utilities';
import { Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

export interface DivGridCellPropsFromParent {
  mediaItemIndex: number;
  mediaItem: MediaItem
  rowHeight: number;
  cellWidth: number;
  includePadding: boolean;
}

export interface DivGridCellProps extends DivGridCellPropsFromParent {
  displayMetadata: boolean;
  isSelected: boolean;
  keywordLabels: string[];
}

const DivGridCell = (props: DivGridCellProps) => {

  const mediaItem: MediaItem = props.mediaItem;

  const getMetadataJsx = (): JSX.Element | null => {

    if (!props.displayMetadata) {
      return null;
    }

    const creationDate: Dayjs = dayjs(mediaItem.creationTime!);
    const formattedCreationDate: string = creationDate.format('MM/DD/YYYY hh:MM A');
    const keywords: string = props.keywordLabels.join(', ');

    return (
      <div style={{
        backgroundColor: 'silver',
        minHeight: '60px',
        padding: '4px'
      }}
      >
        <Typography variant='body2' color='black' fontSize='12px'>
          {mediaItem.fileName}
          <br />
          {formattedCreationDate}
          <br />
          {keywords}
        </Typography>
      </div >
    );

  };

  const widthAttribute: string = props.cellWidth.toString() + 'px';
  const metadataHeight: number = props.displayMetadata ? 68 : 0;
  const imgHeightAttribute: string = props.rowHeight.toString() + 'px';
  const divHeightAttribute: string = (props.rowHeight + metadataHeight).toString() + 'px';

  const metadataJsx: JSX.Element | null = getMetadataJsx();

  const photoUrl = getPhotoUrl(mediaItem);

  const dynamicImageStyle = props.isSelected ? 'selectedImageStyle' : 'unselectedImageStyle';

  return (
    <div style={{
      display: 'inline-block',
      width: widthAttribute,
      height: divHeightAttribute,
      paddingRight: props.includePadding ? '4px' : '0px',

    }}>
      {metadataJsx}
      <img
        src={photoUrl}
        className={dynamicImageStyle}
        width={widthAttribute}
        height={imgHeightAttribute}
        loading='lazy'
      />
    </div>
  );
};

function mapStateToProps(state: any, ownProps: DivGridCellPropsFromParent) {
  return {
    displayMetadata: getDisplayMetadata(state),
    isSelected: isMediaItemSelected(state, ownProps.mediaItem),
    mediaItem: ownProps.mediaItem,
    keywordLabels: getKeywordLabelsForMediaItem(state, getMediaItems(state)[ownProps.mediaItemIndex]),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DivGridCell);
