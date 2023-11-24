import * as React from 'react';
import { connect } from 'react-redux';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { DialogContent } from '@mui/material';
import { isNil } from 'lodash';

export interface AccountDialogPropsFromParent {
  open: boolean;
  onClose: () => void;
}

export interface AccountDialogProps extends AccountDialogPropsFromParent {
}

function SelectAvatarDialog(props: AccountDialogProps) {

  const handleClose = () => {
    props.onClose();
  };

  return (
    <Dialog onClose={handleClose} open={props.open}>
      <DialogTitle>Account</DialogTitle>
      <DialogContent>
        pizza
      </DialogContent>
      <DialogActions>
        <Button>Eat Pizza</Button>
      </DialogActions>
    </Dialog>
  );
}

function mapStateToProps(state: any) {
  return {
  };
}

export default connect(mapStateToProps)(SelectAvatarDialog);




