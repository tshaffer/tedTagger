import { Grid, Card, CardMedia, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
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
  margin: '0 auto',
  padding: '0.1em',
};

const cardMediaStyle = {
  padding: '1em 1em 0 1em',
  objectFit: 'contain',
};

export interface PhotoPropsFromParent {
  mediaItem: MediaItem;
}

export interface PhotoProps extends PhotoPropsFromParent {
  isSelected: boolean;
  onToggleMediaItemSelection: (fielPath: string) => any;
}

function Photo(props: PhotoProps) {

  const toggledPhotoSelected = (event: React.ChangeEvent<HTMLInputElement>, filePath: string) => {
    console.log('togglePhotoSelected');
    console.log(event.target.checked);
    console.log(filePath);
    props.onToggleMediaItemSelection(filePath);
  };

  const basename: string = path.basename(props.mediaItem.filePath!);
  const numChars = basename.length;
  const filePath = path.join(
    '/images',
    basename.charAt(numChars - 6),
    basename.charAt(numChars - 5),
    basename,
  );
  
  return (
    <Grid xs={3}>
      <Card
        sx={cardStyle}
      >
        <CardMedia
          className='cardMedia'
          image={filePath}
          component="img"
          title={filePath}
          sx={cardMediaStyle}
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(event) => toggledPhotoSelected(event, filePath)}
                checked={props.isSelected}
              />
            }
            label="Selected"
          />
        </FormGroup>
      </Card>
    </Grid>
  );
}

// export default Photo;
function mapStateToProps(state: any, ownProps: any) {
  return {
    mediaItem: ownProps.mediaItem,
    isSelected: isMediaItemSelected(state, ownProps.mediaItem.filePath),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onToggleMediaItemSelection: toggleMediaItemSelectionAction,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
