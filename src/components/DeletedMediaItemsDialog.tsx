import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import List from '@mui/material/List';
import { getDeletedMediaItems } from '../selectors';
import { Dialog, DialogTitle, DialogContent, Box, DialogActions, Button, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { MediaItem } from '../types';
import { removeDeleteMediaItem } from '../controllers';

export interface DeletedMediaItemsDialogPropsFromParent {
  open: boolean;
  onClose: () => void;
}

export interface DeletedMediaItemsDialogProps extends DeletedMediaItemsDialogPropsFromParent {
  deleteMediaItems: MediaItem[];
  onRemoveDeleteMediaItem: (mediaItemId: string) => void;
}

const DeletedMediaItemsDialog = (props: DeletedMediaItemsDialogProps) => {

  const { open, onClose, onRemoveDeleteMediaItem } = props;

  const handleClose = () => {
    onClose();
  };

  const handleRemoveDeletedMediaItem = (googleId: string) => {
    console.log('handleRemoveDeletedMediaItem: ', googleId);
    onRemoveDeleteMediaItem(googleId);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Deleted Media Items</DialogTitle>
      <DialogContent style={{ paddingBottom: '0px' }}>
        <div>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {props.deleteMediaItems.map((mediaItem: MediaItem, index: number) => {
                const labelId = `checkbox-list-label-${mediaItem.fileName}`;
                return (
                  <ListItem
                    key={mediaItem.googleId}
                  // disablePadding
                  >
                    <ListItemButton role={undefined} onClick={() => {handleRemoveDeletedMediaItem(mediaItem.googleId);}} dense>
                      <ListItemIcon>
                        <RemoveCircleIcon />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={mediaItem.fileName} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

function mapStateToProps(state: any) {
  return {
    deleteMediaItems: getDeletedMediaItems(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onRemoveDeleteMediaItem: removeDeleteMediaItem,
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(DeletedMediaItemsDialog);


