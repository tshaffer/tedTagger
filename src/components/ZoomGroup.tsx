import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';

import { TedTaggerDispatch, setZoomFactorRedux } from '../models';
import { getZoomFactor } from '../selectors';

export interface ZoomGroupProps {
  zoomFactor: number;
  onSetZoomFactor: (zoomFactor: number) => void;
}

function ZoomGroup(props: ZoomGroupProps) {

  const handleZoomIn = (): void => {
    console.log('Zoom In');
    let currentZoomFactor = props.zoomFactor;
    currentZoomFactor = currentZoomFactor - 1;
    props.onSetZoomFactor(currentZoomFactor);
  };

  const handleZoomOut = (): void => {
    console.log('Zoom Out');
    let currentZoomFactor = props.zoomFactor;
    currentZoomFactor = currentZoomFactor + 1;
    props.onSetZoomFactor(currentZoomFactor);
  };

  return (
    <FormControl style={{ marginLeft: '0px' }}>
      <span style={{ marginTop: '6px', marginBottom: '6px', display: 'block' }}>Zoom</span>
      <Button
        variant="outlined"
        style={{
          marginBottom: '8px',
        }}
        onClick={handleZoomIn}
      >
        Zoom In
      </Button>
      <Button
        variant="outlined"
        onClick={handleZoomOut}
      >Zoom Out</Button>
    </FormControl>
  );
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    zoomFactor: getZoomFactor(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onSetZoomFactor: setZoomFactorRedux
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ZoomGroup);
