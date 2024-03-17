import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { TedTaggerDispatch, setPhotoLayoutRedux, } from '../models';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { getPhotoLayout } from '../selectors';
import { PhotoLayout } from '../types';

import ZoomGroup from './ZoomGroup';

export interface ViewSpecProps {
  photoLayout: PhotoLayout;
  onSetPhotoLayout: (photoLayout: PhotoLayout) => void;
}

const ViewSpec = (props: ViewSpecProps) => {

  function handleUpdatePhotoLayout(event: React.ChangeEvent<HTMLInputElement>, value: string): void {
    const photoLayout: PhotoLayout = value as PhotoLayout;
    props.onSetPhotoLayout(photoLayout);
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

  return {
    photoLayout: getPhotoLayout(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onSetPhotoLayout: setPhotoLayoutRedux,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewSpec);

