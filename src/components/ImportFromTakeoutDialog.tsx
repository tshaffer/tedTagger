import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';

import { Table, TableBody, TableContainer, TextField } from '@mui/material';

import { getAppInitialized, getKeywordNodeIdToKeywordLUT, getKeywordRootNodeId, getMatchRule, getSearchRules } from '../selectors';
import { Button, DialogActions, DialogContent, FormControl, InputLabel, MenuItem, OutlinedInput, Paper, Select } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import { addSearchRule, updateSearchRule } from '../models';
import { loadMediaItemsFromSearchSpec } from '../controllers';

export interface ImportFromTakeoutDialogPropsFromParent {
  open: boolean;
  onClose: () => void;
}

export interface ImportFromTakeoutDialogProps extends ImportFromTakeoutDialogPropsFromParent {
  appInitialized: boolean;
}

const ImportFromTakeoutDialog = (props: ImportFromTakeoutDialogProps) => {

  const [albumName, setAlbumName] = React.useState('');

  const { open, onClose } = props;

  if (!props.appInitialized) {
    return null;
  }

  if (!open) {
    return null;
  }

  const handleClose = () => {
    onClose();
  };

  function handleImport(): void {
    console.log('Importing from Takeout');
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Import from Takeout</DialogTitle>
      <DialogContent style={{ paddingBottom: '0px' }}>
        <div>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                style={{ paddingBottom: '8px' }}
                label="Album name"
                value={albumName}
                onChange={(event) => setAlbumName(event.target.value)}
              />
            </div>
          </Box>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleImport} autoFocus>
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function mapStateToProps(state: any) {
  return {
    appInitialized: getAppInitialized(state),
    matchRule: getMatchRule(state),
    searchRules: getSearchRules(state),
    keywordNodeIdToKeywordLUT: getKeywordNodeIdToKeywordLUT(state),
    rootNodeId: getKeywordRootNodeId(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onAddSearchRule: addSearchRule,
    onUpdateSearchRule: updateSearchRule,
    onLoadMediaItemsFromSearchSpec: loadMediaItemsFromSearchSpec,

  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(ImportFromTakeoutDialog);


