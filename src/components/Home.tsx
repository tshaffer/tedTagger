import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { MediaItem } from '../types';
import { loadMediaItems } from '../controllers/mediaItems';
import { TedTaggerDispatch } from '../models';
import { getMediaItems } from '../selectors';
import { isNil } from 'lodash';

import PhotoGrid from './PhotoGrid';
import Box from '@mui/material/Box';
import { Drawer } from '@mui/material';

import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';

import MoreIcon from '@mui/icons-material/MoreVert';

import TagsPropertyPanel from './TagsPropertyPanel';
import TagManager from './TagManager';
import { loadTags } from '../controllers';

export interface HomeProps {
  mediaItems: MediaItem[],
  onLoadMediaItems: () => any;
  onLoadTags: () => any;
}

const Home = (props: HomeProps) => {

  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [drawerContents, setDrawerContents] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  React.useEffect(() => {
    props.onLoadTags()
      .then(() => {
        props.onLoadMediaItems();
      });
  }, []);

  // return (
  //   <div>Loading...</div>
  // );

  if (isNil(props.mediaItems) || props.mediaItems.length === 0) {
    return (
      <div>Loading...</div>
    );
  }

  const handleShowMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setSheetOpen(false);
    setAnchorEl(null);
  };

  const handleShowAssignTags = () => {
    setDrawerContents('AssignTags');
    setSheetOpen(true);
    setAnchorEl(null);
  };

  const handleShowTagManager = () => {
    setDrawerContents('TagManager');
    setSheetOpen(true);
    setAnchorEl(null);
  };

  const getDrawerContents = (): JSX.Element => {
    if (drawerContents === 'AssignTags') {
      return (
        <TagsPropertyPanel
          open={sheetOpen}
          onClose={handleClose}
        />
      );
      // } else if (drawerContents === 'TagManager') {
    } else {
      return (
        <TagManager
          open={sheetOpen}
          onClose={handleClose}
        />
      );
    }
  };

  const drawerContentElement: JSX.Element = getDrawerContents();

  return (
    <div style={{ height: '100vh' }}>
      <div>
        <PhotoGrid />
      </div>
      <Drawer
        BackdropProps={{ style: { opacity: 0 } }}
        open={sheetOpen}
        variant="persistent"
        anchor="right"
      >
        {drawerContentElement}
      </Drawer>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            onClick={handleShowMore}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleShowAssignTags}>Edit Tags</MenuItem>
        <MenuItem onClick={handleShowTagManager}>Tag Manager</MenuItem>
        <MenuItem onClick={handleClose}>Properties</MenuItem>
      </Menu>
    </div>
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
