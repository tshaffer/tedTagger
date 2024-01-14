import * as React from 'react';
import { connect } from 'react-redux';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, DialogActions, DialogContent } from '@mui/material';
import { getAppInitialized, getKeywordNodesByNodeId, getKeywordRootNodeId, getKeywordsAsTree, getKeywordsById } from '../selectors';
import { KeywordTreeDeep, StringToKeywordLUT, StringToKeywordNodeLUT, KeywordNode, Keyword } from '../types';
import { isNil } from 'lodash';

export interface AddKeywordDialogPropsFromParent {
  open: boolean;
  onAddKeyword: (
    keywordLabel: string,
  ) => void;
  onClose: () => void;
}

export interface AddKeywordDialogProps extends AddKeywordDialogPropsFromParent {
  appInitialized: boolean;
  keywordRootNodeId: string;
  keywordsAsTree: KeywordTreeDeep | undefined;
  keywordsById: StringToKeywordLUT;
  keywordNodesByNodeId: StringToKeywordNodeLUT
}

const AddKeywordDialog = (props: AddKeywordDialogProps) => {

  const [keywordLabel, setKeywordLabel] = React.useState('');

  const { open, onClose } = props;

  if (!props.appInitialized) {
    return null;
  }

  if (!open) {
    return null;
  }

  console.log('AddKeywordDlg proceed beyond initial checks');

  const traverseKeywordTree = (parentNodeId: string, keywordLabels: string[]): void => {
    const keywordNode = props.keywordNodesByNodeId[parentNodeId];
    const keywordId: string = keywordNode.keywordId;
    const keyword: Keyword = props.keywordsById[keywordId];
    keywordLabels.push(keyword.label);

    if (!isNil(keywordNode.childrenNodeIds)) {
      keywordNode.childrenNodeIds.forEach((childNodeId: string) => {
        traverseKeywordTree(childNodeId, keywordLabels);
      });
    }
  };

  const getKeywords = (): string[] => {
    const keywordLabels: string[] = [];
    const keywordRootNodeId = props.keywordRootNodeId;
    traverseKeywordTree(keywordRootNodeId, keywordLabels);
    return keywordLabels;
  };

  const handleAddNewKeyword = (): void => {
    if (keywordLabel !== '') {
      props.onAddKeyword(keywordLabel);
      props.onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  const keywordLabels: string[] = getKeywords();
  console.log('keywordLabels: ' + keywordLabels);
  
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
            <TextField
              label="Keyword Label"
              value={keywordLabel}
              onChange={(event) => setKeywordLabel(event.target.value)}
            />
          </div>
        </Box>
      </DialogContent>
      <DialogActions
      >
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddNewKeyword} autoFocus>
          Add
        </Button>
      </DialogActions>

    </Dialog>
  );
};

function mapStateToProps(state: any) {
  return {
    appInitialized: getAppInitialized(state),
    keywordRootNodeId: getKeywordRootNodeId(state),
    keywordsAsTree: getKeywordsAsTree(state),
    keywordsById: getKeywordsById(state),
    keywordNodesByNodeId: getKeywordNodesByNodeId(state),
  };
}

export default connect(mapStateToProps)(AddKeywordDialog);



