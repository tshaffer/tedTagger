import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Grid, Card, CardMedia, GridSize } from '@mui/material';
import { Tooltip } from '@mui/material';

import { TedTaggerDispatch, setLoupeViewMediaItemIdRedux, setPhotoLayoutRedux } from '../models';
import { selectPhoto } from '../controllers';
import { isMediaItemSelected } from '../selectors';
import { MediaItem, PhotoLayout } from '../types';

import { getPhotoUrl } from '../utilities';

const gridItemStyle = {
  paddingLeft: '8px',
  paddingRight: '8px',
  // paddingTop: '8px',
};

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  margin: '8px',
  width: '100%',
  height: '100%',
  backgroundColor: 'lightcoral',
  boxShadow: 'none',
};

const selectedCardMediaStyle = {
  objectFit: 'contain',
  height: '1080px',
  // paddingLeft: '8px',
  backgroundColor: 'purple',
  border: 4,
  borderColor: 'red',
  boxSizing: 'border-box',
};

const unselectedCardMediaStyle = {
  objectFit: 'contain',
  height: '1080px',
  // paddingLeft: '8px',
  backgroundColor: 'purple',
  // border: 2px solid #000,
  border: 4,
  borderColor: 'orange',
  boxSizing: 'border-box',
};

const imgStyle = {
  height: '100%',
  backgroundColor: 'green',
  display: 'block',
  margin: '0 auto',
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

  unselectedCardMediaStyle.height = cardMediaHeight.toString() + 'px';
  selectedCardMediaStyle.height = cardMediaHeight.toString() + 'px';

  const cardMediaStyle = props.isSelected ? selectedCardMediaStyle : unselectedCardMediaStyle;

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
          placement="top"
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
          <CardMedia
            id={'cardMedia:' + props.mediaItem.googleId}
            className='image-container'
            title={photoUrl}
            sx={cardMediaStyle}
            onClick={handleClicks}
          >
            <img
              src={photoUrl}
              alt={props.mediaItem.fileName}
              loading="lazy"
            />
          </CardMedia>
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
