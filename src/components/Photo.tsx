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
  paddingLeft: '8px',
  paddingTop: '8px',
};

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  margin: '8px',
  // height: '273px',
};

const selectedCardMediaStyle = {
  objectFit: 'contain',
  border: 4,
  borderColor: 'red',
  width: '97%',
  // height: '97%',
  // height: '273px',
};

const unselectedCardMediaStyle = {
  objectFit: 'contain',
  border: 4,
  borderColor: 'white',
  // width: '97%',
  // height: '97%',
  height: '273px',
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

  /*
    <Grid item xs={3}>
    <Grid item lg={12/5}>
  */

  const numColumns: number = props.numGridColumns;
  const gridItemSize: GridSize = 12 / numColumns;

  /*
    what parameter impacts what setting:
      unselectedCardMediaStyle.height => 97% of grid item height
      img.style => photo height, no border
      resulting photoWidth should be aspect ratio calculated from photoSizeProto


    current code in photoSizeProto
    height: '273px',
    style={{ height: '254px' }}

    height, including border: 282px
    when setting style={{ height: '200px' }}, height is limited to 200px
    when setting style={{ height: '280px' }}, height is limited to 280px

  */

  let imageHeight: string = '';

  switch (numColumns) {
    case 2: {
      unselectedCardMediaStyle.height = '410px';
      imageHeight = '406px';
      break;
    }
    case 3: {
      unselectedCardMediaStyle.height = '273px';
      imageHeight = '270px';
      break;
    }
    case 4: {
      unselectedCardMediaStyle.height = '206px';
      imageHeight = '202px';
      break;
    }
    case 5: {
      unselectedCardMediaStyle.height = '162px';
      imageHeight = '158px';
      break;
    }
    default:
      unselectedCardMediaStyle.height = '134px';
      imageHeight = '130px';
      break;
  }

  const cardMediaClassName: string = props.isSelected ? 'selectedCardMediaStyle' : 'unselectedCardMediaStyle';
  const cardMediaStyle = props.isSelected ? selectedCardMediaStyle : unselectedCardMediaStyle;

  // console.log('Photo render: ', props.mediaItem.fileName);
  // console.log('Photo render: ', props.mediaItem.width, props.mediaItem.height);

  /*
            id={props.mediaItem.googleId}
            className={cardMediaClassName}
            component="img"
            loading="lazy"
            title={photoUrl}
            sx={cardMediaStyle}

          <img src={photoUrl} alt={props.mediaItem.fileName} style={{ width: '100%', height: '100%' }} />

                    <img src={photoUrl} alt={props.mediaItem.fileName} style={{ height: '254px' }} />

  */
  return (
    <Grid item lg={gridItemSize} style={gridItemStyle}>
      <Card
        sx={cardStyle}
      >
        <CardMedia
          id={props.mediaItem.googleId}
          className={cardMediaClassName}
          // loading="lazy"
          title={photoUrl}
          sx={cardMediaStyle}
          onClick={handleClicks}
        >
          <img
            src={photoUrl}
            alt={props.mediaItem.fileName}
            style={{ height: imageHeight}}
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
