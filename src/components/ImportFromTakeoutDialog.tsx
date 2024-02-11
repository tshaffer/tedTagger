import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';

import { Stack, TextField } from '@mui/material';

import { getAppInitialized, getKeywordNodeIdToKeywordLUT, getKeywordRootNodeId, getMatchRule, getSearchRules } from '../selectors';
import { Button, DialogActions, DialogContent } from '@mui/material';

import { addSearchRule, updateSearchRule } from '../models';
import { loadMediaItemsFromSearchSpec } from '../controllers';
import { isNil } from 'lodash';

export interface ImportFromTakeoutDialogPropsFromParent {
  open: boolean;
  onClose: () => void;
}

export interface ImportFromTakeoutDialogProps extends ImportFromTakeoutDialogPropsFromParent {
  appInitialized: boolean;
}

const ImportFromTakeoutDialog = (props: ImportFromTakeoutDialogProps) => {

  const [albumName, setAlbumName] = React.useState('');
  const [fileInImportFolder, setFileInImportFolder] = React.useState('');

  const hiddenFileInput = React.useRef(null);

  const { open, onClose } = props;

  if (!props.appInitialized) {
    return null;
  }

  if (!open) {
    return null;
  }

  const handleSelectFileInImportFolder = () => {
    if (!isNil(hiddenFileInput) && !isNil(hiddenFileInput.current)) {
      (hiddenFileInput.current as any).click();
    }
  };

  const handleFileInImportFolderSelected = (event: any) => {
    console.log('handleFileInImportSelected', event.target.files[0]);
    setFileInImportFolder(event.target.files[0].name);
  };

  const handleClose = () => {
    onClose();
  };

  function handleImport(): void {
    console.log('Importing from Takeout');
    console.log('import from parent folder of ' + albumName);
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
            <Stack spacing={1} direction="row">
              <input
                type="file"
                onChange={(e) => handleFileInImportFolderSelected(e)}
                ref={hiddenFileInput}
                style={{ display: 'none' }} // Make the file input element invisible
              />
              <Button
                variant="outlined"
                onClick={() => handleSelectFileInImportFolder()}
              >
                Select file
              </Button>
            </Stack>
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


declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string;        // remember to make these attributes optional....
    webkitdirectory?: string;
  }
}
