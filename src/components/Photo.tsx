import { Grid, Card, CardMedia, FormGroup, FormLabel } from '@mui/material';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TedTaggerDispatch } from '../models';
import { toggleMediaItemSelectionAction } from '../controllers';
import { isMediaItemSelected } from '../selectors';
import { MediaItem } from '../types';

import path from 'path-browserify';

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

  const toggledPhotoSelected = () => {
    props.onToggleMediaItemSelection(props.mediaItem);
  };

  const handleClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    console.log('handleClick: ', (e.target as any).id);
    toggledPhotoSelected();
  };

  const filePath = getFileUrl();

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
        <FormGroup>
          <FormLabel>
            Tags
          </FormLabel>
        </FormGroup>
      </Card>
    </Grid>
  );
}

// export default Photo;
function mapStateToProps(state: any, ownProps: any) {
  return {
    mediaItem: ownProps.mediaItem,
    isSelected: isMediaItemSelected(state, ownProps.mediaItem),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onToggleMediaItemSelection: toggleMediaItemSelectionAction,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
