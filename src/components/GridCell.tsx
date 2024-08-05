import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TedTaggerDispatch, setLoupeViewMediaItemIdRedux, setPhotoLayoutRedux } from '../models';

import '../styles/TedTagger.css';
import { MediaItem, PhotoLayout } from '../types';
import { getDisplayMetadata, getKeywordLabelsForMediaItem, getMediaItems, isMediaItemSelected } from '../selectors';
import { getPhotoUrl } from '../utilities';
import { Tooltip, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { selectPhoto } from '../controllers';
import { borderSizeStr } from '../constants';
import heic2any from 'heic2any';

export interface GridCellPropsFromParent {
  mediaItemIndex: number;
  mediaItem: MediaItem
  rowHeight: number;
  cellWidth: number;
}

export interface GridCellProps extends GridCellPropsFromParent {
  displayMetadata: boolean;
  isSelected: boolean;
  keywordLabels: string[];
  onClickPhoto: (id: string, commandKey: boolean, shiftKey: boolean) => any;
  onSetLoupeViewMediaItemId: (id: string) => any;
  onSetPhotoLayoutRedux: (photoLayout: PhotoLayout) => any;
}

const GridCell = (props: GridCellProps) => {

  const [clickTimeout, setClickTimeout] = React.useState<NodeJS.Timeout | null>(null);

  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  async function fetchAndConvertHeic(url: string) {
    try {
      console.log('fetchAndConvertHeic:', url);
      // Fetch the HEIC file from the URL
      const response = await fetch(url);
      console.log('received response');
      const heicBlob = await response.blob();

      // Convert the HEIC file to JPEG
      console.log('invoke heic2any');
      const conversionResult = await heic2any({
        blob: heicBlob,
        toType: 'image/jpeg',
      });
      console.log('conversionResult:', conversionResult);

      // Return the converted JPEG Blob
      return conversionResult;
    } catch (error) {
      console.error('Error converting HEIC file:', error);
      throw error;
    }
  }

  const mediaItem: MediaItem = props.mediaItem;

  React.useEffect(() => {
    const convertAndSetImage = async (heicUrl: string) => {
      console.log('convertAndSetImage:', heicUrl);
      try {
        const jpegBlob = await fetchAndConvertHeic(heicUrl);
        console.log('fetchAndConvertHeic returned');
        const jpegUrl: string = URL.createObjectURL(jpegBlob as Blob);
        console.log(jpegUrl);
        setImageSrc(jpegUrl);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    console.log('useEffect for GridCell:', mediaItem);

    const photoUrl = getPhotoUrl(mediaItem);

    console.log('photoUrl:', photoUrl);

    if (photoUrl.endsWith('.HEIC')
      //  &&
      // (photoUrl === '/images/c/8/e3ad9a14-0ac5-4078-b6e5-fb05b683d5c8.HEIC') ||
      // (photoUrl === '/images/f/d/0ec37af4-499b-41aa-a00d-dde84e98c4fd.HEIC')
    ) {
      console.log('Converting HEIC to JPEG:', photoUrl);
      convertAndSetImage(photoUrl);
    } else {
      console.log('Setting imageSrc:', photoUrl);
      // setImageSrc(photoUrl);
      setLoading(true);
    }

  }, [props.mediaItem]);


  const handleDoubleClick = () => {
    props.onSetLoupeViewMediaItemId(props.mediaItem.googleId);
    props.onSetPhotoLayoutRedux(PhotoLayout.Loupe);
  };

  const handleClickPhoto = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    props.onClickPhoto(props.mediaItem.googleId, e.metaKey, e.shiftKey);
  };

  const handleClicks = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (clickTimeout !== null) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      handleDoubleClick();
    } else {
      const clickTimeout = setTimeout(() => {
        clearTimeout(clickTimeout);
        setClickTimeout(null);
        handleClickPhoto(e);
      }, 200);
      setClickTimeout(clickTimeout);
    }
  };


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
  const metadataHeight: number = props.displayMetadata ? 60 : 0;
  const imgHeightAttribute: string = props.rowHeight.toString() + 'px';
  const divHeightAttribute: string = (props.rowHeight + metadataHeight).toString() + 'px';

  const metadataJsx: JSX.Element | null = getMetadataJsx();

  const photoUrl = getPhotoUrl(mediaItem);
  console.log('photoUrl:', photoUrl);

  let borderAttr: string = borderSizeStr + ' ';
  borderAttr += props.isSelected ? ' solid blue' : ' solid white';

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading image: {(error as any).message}</p>;
  }

  return (
    <Tooltip
      title={props.mediaItem.fileName}
      placement='top'
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -32],
              },
            },
          ],
        },
      }}
    >
      <div
        style={{
          display: 'inline-block',
          width: widthAttribute,
          height: divHeightAttribute,
          border: borderAttr,
        }}
        onClick={handleClicks}
      >
        {metadataJsx}
        <img
          src={imageSrc as string}
          width={widthAttribute}
          height={imgHeightAttribute}
          loading='lazy'
        />
      </div>
    </Tooltip>
  );
};

function mapStateToProps(state: any, ownProps: GridCellPropsFromParent) {
  return {
    displayMetadata: getDisplayMetadata(state),
    isSelected: isMediaItemSelected(state, ownProps.mediaItem),
    mediaItem: ownProps.mediaItem,
    keywordLabels: getKeywordLabelsForMediaItem(state, getMediaItems(state)[ownProps.mediaItemIndex]),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onClickPhoto: selectPhoto,
    onSetLoupeViewMediaItemId: setLoupeViewMediaItemIdRedux,
    onSetPhotoLayoutRedux: setPhotoLayoutRedux,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GridCell);
