import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Grid, Card, CardMedia, GridSize, CardContent, Typography } from '@mui/material';
import { Tooltip } from '@mui/material';

import { TedTaggerDispatch, setLoupeViewMediaItemIdRedux, setPhotoLayoutRedux } from '../models';
import { selectPhoto } from '../controllers';
import { isMediaItemSelected } from '../selectors';
import { MediaItem, PhotoLayout } from '../types';

import { getPhotoUrl } from '../utilities';

const gridItemStyle = {
  width: '100%',
  height: '100%',
  // paddingLeft: '8px',
  // paddingRight: '8px',
  // width: 'calc(100% - 32px)',
  // height: 'calc(100% - 32px)',
  // margin: '16px',
  backgroundColor: '#A9A9A9',
  // paddingTop: '64px',
  border: '2px solid #909090',
  boxSizing: 'border-box',
};

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  backgroundColor: 'lightcoral',
  boxShadow: 'none',
};

const cardMediaStyle = {
  objectFit: 'contain',
  height: '1080px',
  backgroundColor: '#A9A9A9',
};

export interface PhotoPropsFromParent {
  mediaItem: MediaItem;
  numGridColumns: number;
}

export interface PhotoProps extends PhotoPropsFromParent {
  isSelected: boolean;
  onClickPhoto: (id: string, commandKey: boolean, shiftKey: boolean) => any;
  onSetLoupeViewMediaItemId: (id: string) => any;
  onSetPhotoLayoutRedux: (photoLayout: PhotoLayout) => any;
}

function Photo(props: PhotoProps) {

  const [clickTimeout, setClickTimeout] = React.useState<NodeJS.Timeout | null>(null);

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

  const photoUrl = getPhotoUrl(props.mediaItem);

  const numColumns: number = props.numGridColumns;
  const gridItemSize: GridSize = 12 / numColumns;

  let cardMediaHeight: number = 0;

  switch (numColumns) {
    case 2: {
      cardMediaHeight = 410;
      break;
    }
    case 3: {
      cardMediaHeight = 264;
      break;
    }
    case 4: {
      cardMediaHeight = 206;
      break;
    }
    case 5: {
      cardMediaHeight = 162;
      break;
    }
    case 6: {
      cardMediaHeight = 140;
      break;
    }
    case 7: {
      cardMediaHeight = 130;
      break;
    }
    case 8: {
      cardMediaHeight = 120;
      break;
    }
    case 9: {
      cardMediaHeight = 110;
      break;
    }
    case 10: {
      cardMediaHeight = 100;
      break;
    }
    default:
      cardMediaHeight = 134;
      break;
  }

  cardMediaStyle.height = cardMediaHeight.toString() + 'px';

  const dynamicImageStyle = props.isSelected ? 'selectedImageStyle' : 'unselectedImageStyle';

  //             <div style={{ backgroundColor: '#A9A9A9' }}>
  // <div style={{ backgroundColor: 'lightGray' }}>

  return (
    <Grid
      id={'grid:' + props.mediaItem.googleId}
      item lg={gridItemSize}
      style={gridItemStyle}
    >
      <Card
        id={'card:' + props.mediaItem.googleId}
        sx={cardStyle}
      >
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
          <div>
            <div style={{ backgroundColor: 'silver' }}>
              <CardContent>
                <Typography variant='body2' color='black'>
                  {props.mediaItem.fileName}
                </Typography>
              </CardContent>

            </div>
            <CardMedia
              id={'cardMedia:' + props.mediaItem.googleId}
              className='image-container'
              title={photoUrl}
              sx={cardMediaStyle}
              onClick={handleClicks}
            >
              <img
                src={photoUrl}
                className={dynamicImageStyle}
                loading='lazy'
              />
            </CardMedia>
          </div>
        </Tooltip>
      </Card>
    </Grid>
  );
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    mediaItem: ownProps.mediaItem,
    isSelected: isMediaItemSelected(state, ownProps.mediaItem),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onClickPhoto: selectPhoto,
    onSetLoupeViewMediaItemId: setLoupeViewMediaItemIdRedux,
    onSetPhotoLayoutRedux: setPhotoLayoutRedux,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
