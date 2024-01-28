import * as React from 'react';
import { connect } from 'react-redux';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';

import { getAppInitialized } from '../selectors';
import { Button, DialogActions, DialogContent, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';

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

  const [matchRule, setMatchRule] = React.useState('all');

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


  const handleChangeMatchRule = (event: SelectChangeEvent<string>, child: React.ReactNode): void => {
    console.log('handleChangeMatchRule', event.target.value);
    setMatchRule(event.target.value || 'all');
  };

  const renderSearchRule = () : JSX.Element => {
    return (
      <div>search rule</div>
    );
  };

  const renderSearchRules = (): JSX.Element => {
    return (
      <div>search rules</div>
    );
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Search</DialogTitle>
      <DialogContent style={{ paddingBottom: '0px' }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-dialog-select-label">Match rules:</InputLabel>
            <Select
              labelId="matchRuleLabel"
              id="matchRuleLabelSelect"
              value={matchRule}
              onChange={handleChangeMatchRule}
              input={<OutlinedInput label="Parent Keyword" />}
            >
              <MenuItem value={'all'}>all</MenuItem>
              <MenuItem value={'any'}>any</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
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


