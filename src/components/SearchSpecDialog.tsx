import * as React from 'react';
import { connect } from 'react-redux';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';

import { getAppInitialized } from '../selectors';
import { Button, DialogActions, DialogContent } from '@mui/material';

export interface SearchSpecDialogPropsFromParent {
  open: boolean;
  // onSearchSpec: (
  //   keywordLabel: string,
  //   parentKeywordNodeId: string,
  // ) => void;
  onClose: () => void;
}

export interface SearchSpecDialogProps extends SearchSpecDialogPropsFromParent {
  appInitialized: boolean;
  // keywordRootNodeId: string;
  // keywordsAsTree: KeywordTreeDeep | undefined;
  // keywordsById: StringToKeywordLUT;
  // keywordNodesByNodeId: StringToKeywordNodeLUT
}

const SearchSpecDialog = (props: SearchSpecDialogProps) => {

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


  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add Keyword</DialogTitle>
      <DialogContent style={{ paddingBottom: '0px' }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <div>
            pizza
          </div>
        </Box>
      </DialogContent>
      <DialogActions
      >
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

function mapStateToProps(state: any) {
  return {
    appInitialized: getAppInitialized(state),
    // keywordRootNodeId: getKeywordRootNodeId(state),
    // keywordsAsTree: getKeywordsAsTree(state),
    // keywordsById: getKeywordsById(state),
    // keywordNodesByNodeId: getKeywordNodesByNodeId(state),
  };
}

export default connect(mapStateToProps)(SearchSpecDialog);


