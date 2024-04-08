import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Grid, Card, CardMedia, GridSize } from '@mui/material';

import { TedTaggerDispatch, setLoupeViewMediaItemIdRedux, setPhotoLayoutRedux } from '../models';
import { selectPhoto } from '../controllers';
import { getAllAppTagAvatars, getAllUserTagAvatars, getTagsLUT, getNumGridColumns, isMediaItemSelected } from '../selectors';
import { AppTagAvatar, MediaItem, PhotoLayout, StringToTagLUT, Tag, UserTagAvatar } from '../types';

import TagAvatar from './TagAvatar';
import { isNil } from 'lodash';
import { getPhotoUrl } from '../utilities';

const gridItemStyle = {
  // paddingLeft: '8px',
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
  border: 4,
  borderColor: 'red',
  height: '1080px',
  // paddingLeft: '8px',
  backgroundColor: 'purple',
};

const unselectedCardMediaStyle = {
  objectFit: 'contain',
  border: 4,
  borderColor: 'orange',
  height: '1080px',
  // paddingLeft: '8px',
  backgroundColor: 'purple',
};

const imgStyle = {
  height: '100%',
  backgroundColor: 'green',
  display: 'block',
  margin: '0 auto',
};

export interface PhotoPropsFromParent {
  mediaItem: MediaItem;
}

export interface PhotoProps extends PhotoPropsFromParent {
  numGridColumns: number;
  appTagAvatars: AppTagAvatar[];
  userTagAvatars: UserTagAvatar[];
  tagsLUT: StringToTagLUT;
  isSelected: boolean;
  onClickPhoto: (id: string, commandKey: boolean, shiftKey: boolean) => any;
  onSetLoupeViewMediaItemId: (id: string) => any;
  onSetPhotoLayoutRedux: (photoLayout: PhotoLayout) => any;
}

function Photo(props: PhotoProps) {

  const [clickTimeout, setClickTimeout] = React.useState<NodeJS.Timeout | null>(null);

  const getTagAvatar = (photoTag: Tag): JSX.Element => {
    if (isNil(photoTag.avatarId) || isNil(photoTag.avatarType)) {
      debugger;
    }
    return (
      <TagAvatar
        key={props.mediaItem.googleId + photoTag.id}
        googleId={props.mediaItem.googleId}
        photoTag={photoTag}
        avatarType={photoTag.avatarType}
        avatarId={photoTag.avatarId}
      />
    );
  };

  const getTagAvatars = (photoTags: Tag[]): JSX.Element => {

    const photoTagImages: JSX.Element[] = photoTags.map((photoTag: Tag) => {
      return getTagAvatar(photoTag);
    });

    return (
      <div>
        {photoTagImages}
      </div>
    );
  };

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

  const photoTags: Tag[] = [];
  // props.mediaItem.tagIds.forEach((tagId: string) => {
  //   const tag: Tag = props.tagsLUT[tagId];
  //   photoTags.push(tag);
  // });

  const photoUrl = getPhotoUrl(props.mediaItem);

  const tagAvatars = getTagAvatars(photoTags);

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
    <Grid item lg={gridItemSize} style={gridItemStyle}>
      <Card
        sx={cardStyle}
      >
        <CardMedia
          id={props.mediaItem.googleId}
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
        {tagAvatars}
      </Card>
    </Grid>
  );
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    mediaItem: ownProps.mediaItem,
    numGridColumns: getNumGridColumns(state),
    appTagAvatars: getAllAppTagAvatars(state),
    userTagAvatars: getAllUserTagAvatars(state),
    tagsLUT: getTagsLUT(state),
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
