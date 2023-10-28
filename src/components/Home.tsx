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

const drawerWidth = 240;

export interface HomeProps {
  mediaItems: MediaItem[],
  onLoadMediaItems: () => any;
  onLoadTags: () => any;
}

const Home = (props: HomeProps) => {

  React.useEffect(() => {
    props.onLoadTags()
      .then(() => {
        props.onLoadMediaItems();
      });
  }, []);

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
              <ListItemButton>
                <ListItemText>
                  Assign Tags
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem key={1} disablePadding>
              <ListItemButton>
                <ListItemText>
                  Tag Manager
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <PhotoGrid />
      </Box>
    </Box>
  );
};



// import * as React from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

// import { MediaItem } from '../types';
// import { loadMediaItems } from '../controllers/mediaItems';
// import { TedTaggerDispatch } from '../models';
// import { getMediaItems } from '../selectors';
// import { isNil } from 'lodash';

// import PhotoGrid from './PhotoGrid';
// import Box from '@mui/material/Box';
// import { Drawer } from '@mui/material';

// import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';

// import MoreIcon from '@mui/icons-material/MoreVert';

// import TagsPropertyPanel from './TagsPropertyPanel';
// import TagManager from './TagManager';
// import { loadTags } from '../controllers';

// export interface HomeProps {
//   mediaItems: MediaItem[],
//   onLoadMediaItems: () => any;
//   onLoadTags: () => any;
// }

// const Home = (props: HomeProps) => {

//   const [sheetOpen, setSheetOpen] = React.useState(false);
//   const [drawerContents, setDrawerContents] = React.useState('');
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);

//   React.useEffect(() => {
//     props.onLoadTags()
//       .then(() => {
//         props.onLoadMediaItems();
//       });
//   }, []);

//   // return (
//   //   <div>Loading...</div>
//   // );

//   if (isNil(props.mediaItems) || props.mediaItems.length === 0) {
//     return (
//       <div>Loading...</div>
//     );
//   }

//   const handleShowMore = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setSheetOpen(false);
//     setAnchorEl(null);
//   };

//   const handleShowAssignTags = () => {
//     setDrawerContents('AssignTags');
//     setSheetOpen(true);
//     setAnchorEl(null);
//   };

//   const handleShowTagManager = () => {
//     setDrawerContents('TagManager');
//     setSheetOpen(true);
//     setAnchorEl(null);
//   };

//   const getDrawerContents = (): JSX.Element => {
//     if (drawerContents === 'AssignTags') {
//       return (
//         <TagsPropertyPanel
//           open={sheetOpen}
//           onClose={handleClose}
//         />
//       );
//       // } else if (drawerContents === 'TagManager') {
//     } else {
//       return (
//         <TagManager
//           open={sheetOpen}
//           onClose={handleClose}
//         />
//       );
//     }
//   };

//   const drawerContentElement: JSX.Element = getDrawerContents();

//   return (
//     <div style={{ height: '100vh' }}>
//       <div>
//         <PhotoGrid />
//       </div>
//       <Drawer
//         BackdropProps={{ style: { opacity: 0 } }}
//         open={sheetOpen}
//         variant="persistent"
//         anchor="right"
//       >
//         {drawerContentElement}
//       </Drawer>
//       <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
//         <Toolbar>
//           <Box sx={{ flexGrow: 1 }} />
//           <IconButton
//             onClick={handleShowMore}
//             color="inherit"
//           >
//             <MoreIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       <Menu
//         id="basic-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         MenuListProps={{
//           'aria-labelledby': 'basic-button',
//         }}
//       >
//         <MenuItem onClick={handleShowAssignTags}>Edit Tags</MenuItem>
//         <MenuItem onClick={handleShowTagManager}>Tag Manager</MenuItem>
//         <MenuItem onClick={handleClose}>Properties</MenuItem>
//       </Menu>
//     </div>
//   );

// };

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
