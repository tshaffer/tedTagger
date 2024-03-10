import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { TedTaggerDispatch, } from '../models';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

export interface ViewSpecProps {
  photoLayoutTmp: string;
}

const ViewSpec = (props: ViewSpecProps) => {

  const [photoLayout, setPhotoLayout] = React.useState('grid');

  function handleViewSpecChange(event: React.ChangeEvent<HTMLInputElement>, value: string): void {
    setPhotoLayout(value);
  }

  const renderPhotoLayout = (): JSX.Element => {

    return (
      <FormControl style={{ marginLeft: '6px' }}>
        <span>Layout</span>
        <RadioGroup
          row
          value={photoLayout}
          onChange={handleViewSpecChange}
          style={{ marginLeft: '8px' }}
        >
          <FormControlLabel value={'grid'} control={<Radio />} label="Grid" />
          <FormControlLabel value={'loupe'} control={<Radio />} label="Loupe" />
        </RadioGroup>
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
    photoLayout: 'grid',
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewSpec);

