import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { MediaItem } from '../types';
import { loadMediaItems, loadTags } from '../controllers';
import { TedTaggerDispatch } from '../models';
import { getMediaItems } from '../selectors';
import PhotoGrid from './PhotoGrid';
import TagsPropertyPanel from './TagsPropertyPanel';
import TagManager from './TagManager';

const drawerWidth = 240;

export interface HomeProps {
  mediaItems: MediaItem[],
  onLoadMediaItems: () => any;
  onLoadTags: () => any;
}

const Home = (props: HomeProps) => {

  const [drawerContents, setDrawerContents] = React.useState('');

  React.useEffect(() => {
    props.onLoadTags()
      .then(() => {
        props.onLoadMediaItems();
      });
  }, []);

  const handleClose = () => {
    setDrawerContents('');
  };

  const getDrawerContents = (): JSX.Element | null => {
    if (drawerContents === 'assignTags') {
      return (
        <TagsPropertyPanel
          onClose={handleClose}
        />
      );
    } else if (drawerContents === 'tagManager') {
      return (
        <TagManager
          onClose={handleClose}
        />
      );
    }
    return (
      <div></div>
    );
  };

  const drawerContentsJSX = getDrawerContents();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Ted Tagger
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem key={0} disablePadding>
              <ListItemButton onClick={() => setDrawerContents('assignTags')}>
                <ListItemText>
                  Assign Tags
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem key={1} disablePadding>
              <ListItemButton onClick={() => setDrawerContents('tagManager')}>
                <ListItemText>
                  Tag Manager
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          {drawerContentsJSX}
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <PhotoGrid />
      </Box>
    </Box>
  );
};

function mapStateToProps(state: any) {
  return {
    mediaItems: getMediaItems(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onLoadMediaItems: loadMediaItems,
    onLoadTags: loadTags,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
