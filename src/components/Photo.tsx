import { Grid, Card, CardMedia, FormGroup, FormLabel, Tooltip } from '@mui/material';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TedTaggerDispatch } from '../models';
import { toggleMediaItemSelectionAction } from '../controllers';
import { getAllAppTagAvatars, getTagsLUT, isMediaItemSelected } from '../selectors';
import { AppTagAvatar, MediaItem, StringToTagLUT, Tag } from '../types';

import path from 'path-browserify';
import { getTagAvatarUrl } from '../utilities';

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
  tagsLUT: StringToTagLUT;
  isSelected: boolean;
  onToggleMediaItemSelection: (mediaItem: MediaItem) => any;
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

    const url: string = getTagAvatarUrl(photoTag, props.appTagAvatars);
    return (
      <Tooltip title={photoTag.label} key={photoTag.id + '::' + props.mediaItem.googleId} >
        <img key={photoTag.id} src={url} alt={photoTag.label} />
      </Tooltip>
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

  const toggledPhotoSelected = () => {
    props.onToggleMediaItemSelection(props.mediaItem);
  };

  const handleClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    console.log('handleClick: ', (e.target as any).id);
    toggledPhotoSelected();
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
          onClick={(e) => handleClick(e)}
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
    tagsLUT: getTagsLUT(state),
    isSelected: isMediaItemSelected(state, ownProps.mediaItem),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onToggleMediaItemSelection: toggleMediaItemSelectionAction,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
