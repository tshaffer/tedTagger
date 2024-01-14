import * as React from 'react';
import { connect } from 'react-redux';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export interface AddKeywordDialogPropsFromParent {
  open: boolean;
  onClose: () => void;
}

export interface AddKeywordDialogProps extends AddKeywordDialogPropsFromParent {
}

function AddKeywordDialog(props: AddKeywordDialogProps) {

  const { open, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>AddKeyword MealWheel</DialogTitle>
      <div style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}>
        pizza
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
        }}
      >
      </div>
    </Dialog>
  );
}

function mapStateToProps(state: any) {
  return {
  };
}

export default connect(mapStateToProps)(AddKeywordDialog);



