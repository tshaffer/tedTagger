import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { TedTaggerDispatch, setLoupeViewMediaItemIdRedux, setPhotoLayoutRedux, } from '../models';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { getMediaItems, getPhotoLayout, getSelectedMediaItemIds } from '../selectors';
import { MediaItem, PhotoLayout } from '../types';

import ZoomGroup from './ZoomGroup';

export interface ViewSpecProps {
  photoLayout: PhotoLayout;
  loupeViewMediaItemId: string;
  onSetPhotoLayout: (photoLayout: PhotoLayout) => void;
  onSetLoupeViewMediaItemId: (id: string) => any;
  onSetPhotoLayoutRedux: (photoLayout: PhotoLayout) => any;
}

const ViewSpec = (props: ViewSpecProps) => {

  function handleUpdatePhotoLayout(event: React.ChangeEvent<HTMLInputElement>, value: string): void {
    const photoLayout: PhotoLayout = value as PhotoLayout;

    if (photoLayout === PhotoLayout.Loupe) {
      props.onSetLoupeViewMediaItemId(props.loupeViewMediaItemId);
      props.onSetPhotoLayoutRedux(PhotoLayout.Loupe);
    } else {
      props.onSetPhotoLayout(photoLayout);
    }
  }

  const getZoomGroupJsx = (): JSX.Element | null => {
    return props.photoLayout === PhotoLayout.Grid ? <ZoomGroup /> : null;
  };

  const zoomGroupLayout: JSX.Element | null = getZoomGroupJsx();

  const renderPhotoLayout = (): JSX.Element => {

    return (
      <FormControl style={{ marginLeft: '6px' }}>
        <span>Layout</span>
        <RadioGroup
          row
          value={props.photoLayout}
          onChange={handleUpdatePhotoLayout}
          style={{ marginLeft: '8px' }}
        >
          <FormControlLabel value={'grid'} control={<Radio />} label="Grid" />
          <FormControlLabel value={'loupe'} control={<Radio />} label="Loupe" />
          <FormControlLabel value={'survey'} control={<Radio />} label="Survey" />
        </RadioGroup>
        {zoomGroupLayout}
      </FormControl>
    );
  };

  const photoLayoutSpec: JSX.Element = renderPhotoLayout();

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          View Spec
        </AccordionSummary>
        <AccordionDetails>
          {photoLayoutSpec}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

function mapStateToProps(state: any) {

  let loupeViewMediaItemId: string = '';
  const selectedMediaItemIds: string[] = getSelectedMediaItemIds(state);
  if (selectedMediaItemIds.length > 0) {
    loupeViewMediaItemId = selectedMediaItemIds[0];
  } else {
    const mediaItems: MediaItem[] = getMediaItems(state);
    if (mediaItems.length === 0) {
      loupeViewMediaItemId = '';
    } else {
      loupeViewMediaItemId = mediaItems[0].googleId;
    }
  }

  return {
    photoLayout: getPhotoLayout(state),
    loupeViewMediaItemId,
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onSetPhotoLayout: setPhotoLayoutRedux,
    onSetLoupeViewMediaItemId: setLoupeViewMediaItemIdRedux,
    onSetPhotoLayoutRedux: setPhotoLayoutRedux,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewSpec);

