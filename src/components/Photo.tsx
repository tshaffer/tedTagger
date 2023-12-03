import { Grid, Card, CardMedia, Tooltip } from '@mui/material';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TedTaggerDispatch } from '../models';
import { handleClickPhoto } from '../controllers';
import { getAllAppTagAvatars, getAllUserTagAvatars, getTagsLUT, isMediaItemSelected } from '../selectors';
import { AppTagAvatar, MediaItem, StringToTagLUT, Tag, UserTagAvatar } from '../types';

import path from 'path-browserify';
import TagAvatar from './TagAvatar';

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 325,
  margin: 2,
};

const selectedCardMediaStyle = {
  objectFit: 'contain',
  border: 4,
  borderColor: 'red',
  width: '97%',
};

const unselectedCardMediaStyle = {
  objectFit: 'contain',
  border: 4,
  borderColor: 'white',
  width: '97%',
};

export interface PhotoPropsFromParent {
  mediaItem: MediaItem;
}

export interface PhotoProps extends PhotoPropsFromParent {
  appTagAvatars: AppTagAvatar[];
  userTagAvatars: UserTagAvatar[];
  tagsLUT: StringToTagLUT;
  isSelected: boolean;
  onClickPhoto: (id: string, commandKey: boolean, shiftKey: boolean) => any;
}

function Photo(props: PhotoProps) {

  const getPhotoUrl = (): string => {
    const basename: string = path.basename(props.mediaItem.filePath!);
    const numChars = basename.length;
    const photoUrl = path.join(
      '/images',
      basename.charAt(numChars - 6),
      basename.charAt(numChars - 5),
      basename,
    );
    return photoUrl;
  };

  const getTagAvatar = (photoTag: Tag): JSX.Element => {
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

  const handleClickPhoto = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    console.log('handleClick: ', (e.target as any).id);
    console.log('shiftKey: ', e.shiftKey);
    console.log('ctrlKey: ', e.ctrlKey);
    console.log('altKey: ', e.altKey);
    console.log('metaKey: ', e.metaKey);

    props.onClickPhoto((e.target as any).id, e.metaKey, e.shiftKey);
  };

  const photoTags: Tag[] = [];
  props.mediaItem.tagIds.forEach((tagId: string) => {
    const tag: Tag = props.tagsLUT[tagId];
    photoTags.push(tag);
  });

  const photoUrl = getPhotoUrl();

  const tagAvatars = getTagAvatars(photoTags);

  const cardMediaClassName: string = props.isSelected ? 'selectedCardMediaStyle' : 'unselectedCardMediaStyle';
  const cardMediaStyle = props.isSelected ? selectedCardMediaStyle : unselectedCardMediaStyle;

  return (
    <Grid item xs={3}>
      <Card
        sx={cardStyle}
      >
        <CardMedia
          id={props.mediaItem.googleId}
          className={cardMediaClassName}
          image={photoUrl}
          component="img"
          title={photoUrl}
          sx={cardMediaStyle}
          onClick={(e) => handleClickPhoto(e)}
        />
        {tagAvatars}
      </Card>
    </Grid>
  );
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    mediaItem: ownProps.mediaItem,
    appTagAvatars: getAllAppTagAvatars(state),
    userTagAvatars: getAllUserTagAvatars(state),
    tagsLUT: getTagsLUT(state),
    isSelected: isMediaItemSelected(state, ownProps.mediaItem),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onClickPhoto: handleClickPhoto,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
