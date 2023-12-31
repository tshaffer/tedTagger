import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Button, IconButton } from '@mui/material';
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

import { setMainDisplayMode } from '../models';

import {
  loadAppTagAvatars,
  loadMediaItems,
  loadTags,
  loadUserTagAvatars,
  // loadPhotosToDisplaySpec,
  deselectAllPhotos,
  loadDefaultTagAvatarId,
} from '../controllers';
import { TedTaggerDispatch } from '../models';

import FullScreenPhoto from './FullScreenPhoto';
import PhotoGrid from './PhotoGrid';
import AssignTags from './AssignTags';
import TagManager from './TagManager';
import PhotoToDisplaySpec from './PhotoToDisplaySpec';
import PhotoProperties from './PhotoProperties';
import { getFullScreenMediaItemId, getMainDisplayMode, getSelectedMediaItemIds } from '../selectors';
import { MainDisplayMode } from '../types';

const leftSideDrawerWidth = 256;
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
  mainDisplayMode: MainDisplayMode;
  fullScreenMediaItemId: string;
  selectedMediaItemIds: string[];
  onLoadDefaultTagAvatarId: () => any;
  onLoadAppTagAvatars: () => any;
  onLoadMediaItems: () => any;
  onLoadTags: () => any;
  onLoadUserTagAvatars: () => any;
  // onLoadPhotosToDisplay: () => any;
  onDeselectAllPhotos: () => any;
  onSetMainDisplayMode: (mainDisplayMode: MainDisplayMode) => any;
}

const Home = (props: HomeProps) => {

  // TEDOTODO
  // const boxRef: any = React.useRef();
  // const toolbarRef: any = React.useRef();

  // React.useEffect(() => {
  //   if (!isNil(boxRef) && !isNil(boxRef.current)) {
  //     const { width, height } = (boxRef.current as any).getBoundingClientRect();
  //     console.log('box width, height', width, height);
  //     console.log('home offsetWidth', boxRef.current.parentElement.offsetWidth);
  //     console.log('home offsetHeight', boxRef.current.parentElement.offsetHeight);
  //     console.log('home clientHeight', boxRef.current.parentElement.clientHeight);

  //   }
  //   if (!isNil(toolbarRef) && !isNil(toolbarRef.current)) {
  //     const { width, height } = (toolbarRef.current as any).getBoundingClientRect();
  //     console.log('toolbar width, height', width, height);
  //   }
  //   // Do something with the dimensions
  // }, []);

  // TEDTODO - rename
  const [drawerContents, setDrawerContents] = React.useState('photoToDisplaySpec');
  const [rightDrawerOpen, setRightDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    // props.onLoadPhotosToDisplay()
    // .then(() => {
    props.onLoadDefaultTagAvatarId()
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
    // });
  }, []);

  React.useEffect(() => {
    const handleEscapeKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // Handle the escape key press here
        console.log('Escape key pressed!');
        // Add your logic to handle the escape key press globally
      }
    };

    // Add the event listener when the component mounts
    console.log('addEventListener!');
    document.addEventListener('keydown', handleEscapeKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      console.log('removeEventListener!');
      document.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  const getDrawerContents = (): JSX.Element | null => {
    if (drawerContents === 'photoToDisplaySpec') {
      return (
        <PhotoToDisplaySpec
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

  const
    selectedPropertyPanelText = {
      fontWeight: 'bold',
      color: 'red',
    };
  const unselectedPropertyPanelText = {
    fontWeight: 'normal',
    color: 'black',
  };

  let photoToDisplaySpecTextStyle: any = unselectedPropertyPanelText;
  let assignTagsTextStyle: any = unselectedPropertyPanelText;
  let tagManagerTextStyle: any = unselectedPropertyPanelText;

  switch (drawerContents) {
    case 'photoToDisplaySpec':
    case '':
      photoToDisplaySpecTextStyle = selectedPropertyPanelText;
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

  const getReturnToGridElement = () => {
    return (
      <div>
        <Button
          style={{
            verticalAlign: 'bottom',
          }}
          onClick={() => props.onSetMainDisplayMode(MainDisplayMode.Grid)}
        >
          X
        </Button>
        <span
          style={{
            fontFamily: 'Google-Sans,Roboto,Arial,sans-serif',
            fontSize: '1.125rem',
            letterSpacing: '0',
            fontWeight: '400',
            lineHeight: '38px',
            verticalAlign: 'bottom',
          }}
        >
          Return to Grid
        </span>

      </div >
    );
  };

  const getSelectPhotosElement = () => {

    if (props.selectedMediaItemIds.length === 0) {
      return null;
    }

    return (
      <div>
        <Button
          style={{
            verticalAlign: 'bottom',
          }}
          onClick={props.onDeselectAllPhotos}
        >
          X</Button>
        <span
          style={{
            fontFamily: 'Google-Sans,Roboto,Arial,sans-serif',
            fontSize: '1.125rem',
            letterSpacing: '0',
            fontWeight: '400',
            lineHeight: '38px',
            verticalAlign: 'bottom',
          }}
        >
          {props.selectedMediaItemIds.length} selected
        </span>

      </div>
    );
  };

  const getUpperLeftButton = () => {
    if (props.mainDisplayMode === MainDisplayMode.FullScreen) {
      return getReturnToGridElement();
      return null;
    } else {
      return getSelectPhotosElement();
    }
  };

  const getMainDisplayContents = (): JSX.Element => {
    if (props.mainDisplayMode === MainDisplayMode.FullScreen) {
      return (
        <FullScreenPhoto />
      );
    } else {
      return (
        <PhotoGrid />
      );
    }
  };

  const handleClose = () => {
    setDrawerContents('');
  };

  const handleRightDrawerOpen = () => {
    setRightDrawerOpen(true);
  };

  const handleRightDrawerClose = () => {
    setRightDrawerOpen(false);
  };

  const appBarWidth = rightDrawerOpen ? `calc(100% - ${leftSideDrawerWidth + rightSideDrawerWidth}px)` : `calc(100% - ${leftSideDrawerWidth}px)`;
  const marginRightWidth = rightDrawerOpen ? `${rightSideDrawerWidth}px` : 0;
  const mainDisplayContents = getMainDisplayContents();

  const displayMenuIcon: boolean = !(rightDrawerOpen || (props.mainDisplayMode === MainDisplayMode.FullScreen));

  const displayLeftDrawerContents = props.mainDisplayMode !== MainDisplayMode.FullScreen ? 'block' : 'none';

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
            onClick={handleRightDrawerOpen}
            sx={{ ...(displayMenuIcon && { display: 'none' }) }}
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
        <Toolbar>
          {getUpperLeftButton()}
        </Toolbar>
        <Box 
          display={displayLeftDrawerContents}
          sx={{ overflow: 'auto' }}
        >
          <List>
            <ListItem key={2} disablePadding>
              <ListItemButton onClick={() => setDrawerContents('photoToDisplaySpec')}>
                <ListItemText
                  primaryTypographyProps={{ style: photoToDisplaySpecTextStyle }}
                >
                  Specify Photos to Display
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
        {mainDisplayContents}
      </Box>
      <Drawer
        sx={{
          width: rightDrawerOpen ? rightSideDrawerWidth : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: rightSideDrawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={rightDrawerOpen}
      >
        <DrawerHeader>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleRightDrawerClose}>
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
    mainDisplayMode: getMainDisplayMode(state),
    fullScreenMediaItemId: getFullScreenMediaItemId(state),
    selectedMediaItemIds: getSelectedMediaItemIds(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onLoadDefaultTagAvatarId: loadDefaultTagAvatarId,
    onLoadAppTagAvatars: loadAppTagAvatars,
    onLoadMediaItems: loadMediaItems,
    onLoadTags: loadTags,
    onLoadUserTagAvatars: loadUserTagAvatars,
    // onLoadPhotosToDisplay: loadPhotosToDisplaySpec,
    onDeselectAllPhotos: deselectAllPhotos,
    onSetMainDisplayMode: setMainDisplayMode,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

