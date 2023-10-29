import { Grid, Card, CardMedia, FormGroup, FormLabel } from '@mui/material';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TedTaggerDispatch } from '../models';
import { toggleMediaItemSelectionAction } from '../controllers';
import { getTagsLUT, isMediaItemSelected } from '../selectors';
import { MediaItem, StringToTagLUT, Tag } from '../types';

import path from 'path-browserify';
import { isNil } from 'lodash';

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
  tagsLUT: StringToTagLUT;
  isSelected: boolean;
  onToggleMediaItemSelection: (mediaItem: MediaItem) => any;
}

function Photo(props: PhotoProps) {

  const getFileUrl = (): string => {
    const basename: string = path.basename(props.mediaItem.filePath!);
    const numChars = basename.length;
    const filePath = path.join(
      '/images',
      basename.charAt(numChars - 6),
      basename.charAt(numChars - 5),
      basename,
    );
    return filePath;
  };

  const getTagIcon = (photoTag: Tag) : JSX.Element => {
    if (isNil(photoTag.iconFileName)) {
      return (
        <span key={photoTag.id}></span>
      );
    }
    const filePath = path.join(
      '/tagIconImages',
      photoTag.iconFileName);
    return (
      <img key={photoTag.id} src={filePath} alt={photoTag.label}/>
    );
  };
  
  const getTagIcons = (photoTags: Tag[]) : JSX.Element => {
    const photoTagImages: JSX.Element[] = photoTags.map((photoTag: Tag) => {
      return getTagIcon(photoTag);
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

  const filePath = getFileUrl();

  const tagIcons = getTagIcons(photoTags);

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
          image={filePath}
          component="img"
          title={filePath}
          sx={cardMediaStyle}
          onClick={(e) => handleClick(e)}
        />
        {tagIcons}
      </Card>
    </Grid>
  );
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    mediaItem: ownProps.mediaItem,
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
