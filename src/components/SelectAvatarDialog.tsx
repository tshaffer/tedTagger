import * as React from 'react';
import { connect } from 'react-redux';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { DialogContent, Stack } from '@mui/material';
import { isNil } from 'lodash';
import { Tag } from '../types';
import { bindActionCreators } from 'redux';
import { uploadTagIconFile } from '../controllers';
import { TedTaggerDispatch } from '../models';

export interface SelectAvatarDialogPropsFromParent {
  tag: Tag;
  open: boolean;
  onClose: () => void;
}

export interface SelectAvatarDialogProps extends SelectAvatarDialogPropsFromParent {
  onUploadTagIconFile: (tag: Tag, formData: FormData) => any;
}

function SelectAvatarDialog(props: SelectAvatarDialogProps) {

  const hiddenFileInput = React.useRef(null);

  const handleClose = () => {
    props.onClose();
  };

  const handleSelectAvatarFile = () => {
    if (!isNil(hiddenFileInput) && !isNil(hiddenFileInput.current)) {
      (hiddenFileInput.current as any).click();
    }
  };

  const handleAvatarFileSelected = (event: any) => {
    console.log('handleSelectFile', event.target.files[0]);
    if (!isNil(props.tag)) {
      const selectedFile = event.target.files[0];
      const data = new FormData();
      data.append('file', selectedFile);
      props.onUploadTagIconFile(props.tag, data);
      handleClose();
    }
  };

  return (
    <Dialog onClose={handleClose} open={props.open}>
      <DialogTitle>Select Avatar</DialogTitle>
      <DialogContent>
        <Stack spacing={1} direction="row">
          <input
            type="file"
            onChange={(e) => handleAvatarFileSelected(e)}
            ref={hiddenFileInput}
            style={{ display: 'none' }} // Make the file input element invisible
          />
          <Button
            variant="outlined"
            onClick={() => handleSelectAvatarFile()}
          >
            Select file
          </Button>
          <Button>
            <img
              src={'/builtinAvatars/snoopyWalksLikeAnEgyption.PNG'}
            />
          </Button>
          <Button>
            <img
              src={'/builtinAvatars/snoopyStarryNight.PNG'}
            />
          </Button>
          <Button>
            <img
              src={'/builtinAvatars/snoopyBiggestHugEver.PNG'}
            />
          </Button>
          <Button>
            <img
              src={'/builtinAvatars/snoopyTheSailor.PNG'}
            />
          </Button>
        </Stack>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

function mapStateToProps(state: any) {
  return {
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onUploadTagIconFile: uploadTagIconFile,
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(SelectAvatarDialog);




