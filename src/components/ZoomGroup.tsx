import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { FormControl } from '@mui/material';
import { Label } from '@mui/icons-material';

const buttons = [
  <Button key="zoomIn">Zoom In</Button>,
  <Button key="zoomOut">Zoom Out</Button>,
];

export default function ZoomGroup() {
  // return (
  //   <Box
  //     sx={{
  //       display: 'flex',
  //       '& > *': {
  //         m: 1,
  //       },
  //     }}
  //   >
  //     <ButtonGroup
  //       orientation="vertical"
  //       aria-label="Vertical button group"
  //       variant="text"
  //     >
  //       {buttons}
  //     </ButtonGroup>
  //   </Box>
  // );

  return (
    <FormControl style={{ marginLeft: '0px' }}>
      <span style={{ marginTop: '6px', marginBottom: '6px', display: 'block' }}>Zoom</span>
      <Button variant="outlined"
        style={{
          marginBottom: '8px',
          paddingLeft: '0px',
          paddingRight: '0px',
        }}
      >
        Zoom In
      </Button>
      <Button variant="outlined">Zoom Out</Button>
    </FormControl>

  )
}
