import { Grid, Card, CardMedia, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import * as React from 'react';

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
}

function Photo(props: PhotoProps) {
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
          <FormControlLabel control={<Checkbox defaultChecked />} label="Selected" />
        </FormGroup>

      </Card>
    </Grid>
  );
}

export default Photo;
