import * as React from 'react';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';

export default function ZoomGroup() {

  function handleZoomIn(): void {
    console.log('Zoom In');
  }

  function handleZoomOut(): void {
    console.log('Zoom Out');
  }

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
