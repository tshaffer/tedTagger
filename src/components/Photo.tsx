import { Grid, Card, CardMedia, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TedTaggerDispatch } from '../models';
import { toggleMediaItemSelectionAction } from '../controllers';
import { isMediaItemSelected } from '../selectors';

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

const boxStyle = {
  display: 'flex',
  flexDirection: 'column',
};


export interface PhotoProps {
  filePath: string;
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

  return (
    <Grid xs={3}>
      <Card
        sx={cardStyle}
      >
        <CardMedia
          className='cardMedia'
          image={props.filePath}
          component="img"
          title="Live from space album cover"
          sx={cardMediaStyle}
        />
        <FormGroup>
          <FormControlLabel control={
            <Checkbox
              onChange={(event) => toggledPhotoSelected(event, props.filePath)}
              checked={props.isSelected}
            />
          } label="Selected" />
        </FormGroup>

      </Card>
    </Grid>
  );
}

// export default Photo;
function mapStateToProps(state: any, ownProps: any) {
  return {
    isSelected: isMediaItemSelected(state, ownProps.filePath),
    // mediaItems: getMediaItems(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    // onLoadMediaItems: loadMediaItems,
    onToggleMediaItemSelection: toggleMediaItemSelectionAction,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
