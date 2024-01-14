import * as React from 'react';
import { connect } from 'react-redux';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, DialogActions, DialogContent } from '@mui/material';

export interface AddKeywordDialogPropsFromParent {
  open: boolean;
  onClose: () => void;
}

export interface AddKeywordDialogProps extends AddKeywordDialogPropsFromParent {
}

function AddKeywordDialog(props: AddKeywordDialogProps) {

  const [keywordLabel, setKeywordLabel] = React.useState('');

  const { open, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  function handleAddNewKeyword(): void {
    console.log('handleAddNewKeyword');
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>AddKeyword MealWheel</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}>
            <TextField
              label="Keyword Label"
              value={keywordLabel}
              onChange={(event) => setKeywordLabel(event.target.value)}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
            }}
          >
          </div>
        </Box>
      </DialogContent>
      <DialogActions
        style={{ marginTop: '10px' }}
      >
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddNewKeyword} autoFocus>
          Add
        </Button>
      </DialogActions>

    </Dialog>
  );
}

function mapStateToProps(state: any) {
  return {
  };
}

export default connect(mapStateToProps)(AddKeywordDialog);



