import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
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

import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import {
  loadAppTagAvatars,
  loadMediaItems,
  loadTags,
  loadUserTagAvatars,
  loadViewSpec,
} from '../controllers';
import { TedTaggerDispatch } from '../models';
import PhotoGrid from './PhotoGrid';
import AssignTags from './AssignTags';
import TagManager from './TagManager';
import ViewSpec from './ViewSpec';
import PhotoProperties from './PhotoProperties';

const leftSideDrawerWidth = 240;
const rightSideDrawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export interface HomeProps {
  onLoadAppTagAvatars: () => any;
  onLoadMediaItems: () => any;
  onLoadTags: () => any;
  onLoadUserTagAvatars: () => any;
  onLoadViewSpec: () => any;
}

const Home = (props: HomeProps) => {

  // TEDTODO - rename
  const [drawerContents, setDrawerContents] = React.useState('viewSpec');
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    props.onLoadViewSpec()
      .then(() => {
        props.onLoadAppTagAvatars()
          .then(() => {
            props.onLoadUserTagAvatars()
              .then(() => {
                props.onLoadTags()
                  .then(() => {
                    props.onLoadMediaItems();
                  });
              });
          });
      });
  }, []);

  const handleClose = () => {
    setDrawerContents('');
  };

  const getDrawerContents = (): JSX.Element | null => {
    if (drawerContents === 'viewSpec') {
      return (
        <ViewSpec
          onClose={handleClose}
        />
      );
    } else if (drawerContents === 'assignTags') {
      return (
        <AssignTags
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

  /*
    <ListItemText    style={ this.state.checkboxState ? { fontWeight: 'normal' } : { fontWeight: 'bold' } }
  
    <ListItemText
      disableTypography
      style={{ fontWeight: 'bold' }}
    >
  
    const text = {
      color: "red"
    };
    <ListItemText primaryTypographyProps={{ style: text }} primary="MyText">
  */
  const
    selectedPropertyPanelText = {
      fontWeight: 'bold',
      color: 'red',
    };
  const unselectedPropertyPanelText = {
    fontWeight: 'normal',
    color: 'black',
  };

  let viewSpecTextStyle: any = unselectedPropertyPanelText;
  let assignTagsTextStyle: any = unselectedPropertyPanelText;
  let tagManagerTextStyle: any = unselectedPropertyPanelText;

  switch (drawerContents) {
    case 'viewSpec':
    case '':
      viewSpecTextStyle = selectedPropertyPanelText;
      break;
    case 'assignTags':
      assignTagsTextStyle = selectedPropertyPanelText;
      break;
    case 'tagManager':
      tagManagerTextStyle = selectedPropertyPanelText;
      break;
    default:
      debugger;
      break;
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const appBarWidth = open ? `calc(100% - ${leftSideDrawerWidth + rightSideDrawerWidth}px)` : `calc(100% - ${leftSideDrawerWidth}px)`;
  const marginRightWidth = open ? `${rightSideDrawerWidth}px` : 0;

  // TEDTODO - split into multiple components
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={{ width: appBarWidth, marginRight: marginRightWidth }}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            Ted Tagger
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: leftSideDrawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: leftSideDrawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem key={2} disablePadding>
              <ListItemButton onClick={() => setDrawerContents('viewSpec')}>
                {/* <ListItemText primaryTypographyProps={{ style: text }} primary="MyText"> */}
                <ListItemText
                  primaryTypographyProps={{ style: viewSpecTextStyle }}
                >
                  View Spec
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem key={0} disablePadding>
              <ListItemButton onClick={() => setDrawerContents('assignTags')}>
                <ListItemText
                  primaryTypographyProps={{ style: assignTagsTextStyle }}
                >
                  Assign Tags
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem key={1} disablePadding>
              <ListItemButton onClick={() => setDrawerContents('tagManager')}>
                <ListItemText
                  primaryTypographyProps={{ style: tagManagerTextStyle }}
                >
                  Tag Manager
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          {drawerContentsJSX}
        </Box>
      </Drawer >
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'lightgray', width: '1450px' }}>
        <Toolbar />
        <PhotoGrid />
      </Box>
      <Drawer
        sx={{
          width: open ? rightSideDrawerWidth : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: rightSideDrawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronRightIcon />
            </IconButton>
            <span style={{ marginLeft: '8px' }}>Properties</span>
          </div>
        </DrawerHeader>
        <Divider />
        <PhotoProperties />
      </Drawer>
    </Box >
  );
};

function mapStateToProps(state: any) {
  return {
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onLoadAppTagAvatars: loadAppTagAvatars,
    onLoadMediaItems: loadMediaItems,
    onLoadTags: loadTags,
    onLoadUserTagAvatars: loadUserTagAvatars,
    onLoadViewSpec: loadViewSpec,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

