import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import '../styles/TedTagger.css';
import Photo from './Photo';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 325,
  margin: '0 auto',
  padding: '0.1em',
};

const cardContentStyle = {
  flex: '1 0 auto'
};

const cardMediaStyle = {
  padding: '1em 1em 0 1em',
  objectFit: 'contain',
};

const boxStyle = {
  display: 'flex',
  flexDirection: 'column',
};

export default function BasicGrid() {

  const filePath0 = '/images/z/Q/AEEKk93Oefh3SiR5UC607K3zECgYkcbfO6qjDJwNC2UJJz_noM4obDfCy1uh1YkZNIN3XUrWp94LBFLJCWFjPFR7mMhcgA1BzQ.jpeg';
  const filePath1 = '/images/4/A/AEEKk91Tx4PJKJMmMr3W4-k068eueZaFsIrvVusXNu1UQr2yQSi79vSoNzyZz0V8R7TZlwD_8Y_s-XmluOCL4e0ey7HwqcJn4A.jpg';
  const filePath2 = '/images/6/Q/AEEKk90c-DA0Pb0MXE6GGpSZf0xmEReu3AVjQBCJoEjHtXt3mpRufLB2xUFMGR1vMq00HA7wcJ1lrEaMSAA-D8BbEJKFyaMd6Q.jpg';
  const filePath3 = '/images/9/Q/AEEKk92TG30_-78TtFuU-L16Cns_wA8J8bWBJ5uytMPqAZzPliMBWSLrXhrS4HjnkpyIW0YGpKLcK1mZpFphZekyt13x8jlK9Q.jpg';
  const filePath4 = '/images/e/A/AEEKk912PZxymMuIR4HV6_HtZFKDfcHykbqqSrNnGE4Z-r_jgEHg4IEF1KnuEhFx6lkKKw-waIIEdT9ZkSagtd1hB4XHOnLCeA.jpg';
  const filePath5 = '/images/k/g/AEEKk90ZybQCwNsN0R0fvlm0fEpEKxuCmh2G6LTv9TjFlhZIQMIpzpRzDGtjVXVz0StKaIbYQGYlx47qurRXt1e-OT8bbonQkg.jpg';
  const filePath6 = '/images/test.jpg';
  const filePath7 = '/images/test.jpg';

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Photo
          filePath={filePath0}
        />
        <Photo
          filePath={filePath1}
        />
        <Photo
          filePath={filePath2}
        />
        <Photo
          filePath={filePath3}
        />
        <Photo
          filePath={filePath4}
        />
        <Photo
          filePath={filePath5}
        />
        <Photo
          filePath={filePath6}
        />
        <Photo
          filePath={filePath7}
        />
      </Grid>
    </Box>
  );
}
