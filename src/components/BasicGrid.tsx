import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Card, CardContent, Typography, CardActions, Button, CardMedia, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

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

export default function BasicGrid() {

  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={3}>
          <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              sx={{ width: 325 }}
              image="/images/z/Q/AEEKk93Oefh3SiR5UC607K3zECgYkcbfO6qjDJwNC2UJJz_noM4obDfCy1uh1YkZNIN3XUrWp94LBFLJCWFjPFR7mMhcgA1BzQ.jpeg"
              alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="body2">
                  Live From Space
                </Typography>
                <Typography variant="caption" color="text.secondary" component="div">
                  Mac Miller
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <Button>flibbet</Button>
                <IconButton aria-label="previous">
                  {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                </IconButton>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              sx={{ width: 325 }}
              image="/images/4/A/AEEKk91Tx4PJKJMmMr3W4-k068eueZaFsIrvVusXNu1UQr2yQSi79vSoNzyZz0V8R7TZlwD_8Y_s-XmluOCL4e0ey7HwqcJn4A.jpg"
              alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="body2">
                  Live From Space
                </Typography>
                <Typography variant="caption" color="text.secondary" component="div">
                  Mac Miller
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <Button>flibbet</Button>
                <IconButton aria-label="previous">
                  {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                </IconButton>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              sx={{ width: 325 }}
              image="/images/6/Q/AEEKk90c-DA0Pb0MXE6GGpSZf0xmEReu3AVjQBCJoEjHtXt3mpRufLB2xUFMGR1vMq00HA7wcJ1lrEaMSAA-D8BbEJKFyaMd6Q.jpg"
              alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="body2">
                  Live From Space
                </Typography>
                <Typography variant="caption" color="text.secondary" component="div">
                  Mac Miller
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <Button>flibbet</Button>
                <IconButton aria-label="previous">
                  {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                </IconButton>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              sx={{ width: 325 }}
              image="/images/9/Q/AEEKk92TG30_-78TtFuU-L16Cns_wA8J8bWBJ5uytMPqAZzPliMBWSLrXhrS4HjnkpyIW0YGpKLcK1mZpFphZekyt13x8jlK9Q.jpg"
              alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="body2">
                  Live From Space
                </Typography>
                <Typography variant="caption" color="text.secondary" component="div">
                  Mac Miller
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <Button>flibbet</Button>
                <IconButton aria-label="previous">
                  {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                </IconButton>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              sx={{ width: 325 }}
              image="/images/e/A/AEEKk912PZxymMuIR4HV6_HtZFKDfcHykbqqSrNnGE4Z-r_jgEHg4IEF1KnuEhFx6lkKKw-waIIEdT9ZkSagtd1hB4XHOnLCeA.jpg"
              alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="body2">
                  Live From Space
                </Typography>
                <Typography variant="caption" color="text.secondary" component="div">
                  Mac Miller
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <Button>flibbet</Button>
                <IconButton aria-label="previous">
                  {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                </IconButton>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              sx={{ width: 325 }}
              image="/images/k/g/AEEKk90ZybQCwNsN0R0fvlm0fEpEKxuCmh2G6LTv9TjFlhZIQMIpzpRzDGtjVXVz0StKaIbYQGYlx47qurRXt1e-OT8bbonQkg.jpg"
              alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="body2">
                  Live From Space
                </Typography>
                <Typography variant="caption" color="text.secondary" component="div">
                  Mac Miller
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <Button>flibbet</Button>
                <IconButton aria-label="previous">
                  {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                </IconButton>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              sx={{ width: 325 }}
              image="/images/test.jpg"
              alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="body2">
                  Live From Space
                </Typography>
                <Typography variant="caption" color="text.secondary" component="div">
                  Mac Miller
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <Button>flibbet</Button>
                <IconButton aria-label="previous">
                  {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                </IconButton>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              sx={{ width: 325 }}
              image="/images/test.jpg"
              alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="body2">
                  Live From Space
                </Typography>
                <Typography variant="caption" color="text.secondary" component="div">
                  Mac Miller
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <Button>flibbet</Button>
                <IconButton aria-label="previous">
                  {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                </IconButton>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
