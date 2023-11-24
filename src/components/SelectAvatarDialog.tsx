import * as React from 'react';
import { connect } from 'react-redux';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { DialogContent, Stack } from '@mui/material';
import { isNil } from 'lodash';

export interface SelectAvatarDialogPropsFromParent {
  open: boolean;
  onClose: () => void;
}

export interface SelectAvatarDialogProps extends SelectAvatarDialogPropsFromParent {
}

function SelectAvatarDialog(props: SelectAvatarDialogProps) {

  const hiddenFileInput = React.useRef(null);

  const handleClose = () => {
    props.onClose();
  };

  const handleClickTag = () => {
    // setSelectedTag(tag);
    if (!isNil(hiddenFileInput) && !isNil(hiddenFileInput.current)) {
      (hiddenFileInput.current as any).click();
    }
  };


  const handleSelectAvatarFile = (event: any) => {
    console.log('handleSelectFile', event.target.files[0]);
    // if (!isNil(selectedTag)) {
    //   const selectedFile = event.target.files[0];
    //   const data = new FormData();
    //   data.append('file', selectedFile);
    //   props.onUploadTagIconFile(selectedTag, data);
    // }
  };


  /*
          <Stack spacing={2} direction="row">
            <Button variant="outlined">
              <img
                src={'/builtinAvatars/snoopyWalksLikeAnEgyption.PNG'}
              />
            </Button>
            <input
              type="file"
              onChange={(e) => handleSelectFile(e)}
              ref={hiddenFileInput}
              style={{ display: 'none' }} // Make the file input element invisible
            />
            <Button variant="outlined">
              Select avatar from file system
            </Button>
            <Button variant="text">Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
          </Stack>


      <DialogContent>
        <input
          type="file"
          onChange={(e) => handleSelectAvatarFile(e)}
          ref={hiddenFileInput}
          style={{ display: 'none' }} // Make the file input element invisible
        />
        <Button
          variant="outlined"
          onClick={() => handleClickTag()}
        >
          Select avatar from file system
        </Button>
      </DialogContent>

  */
  return (
    <Dialog onClose={handleClose} open={props.open}>
      <DialogTitle>Select Avatar</DialogTitle>
      <DialogContent>
        <Stack spacing={2} direction="row">
          <input
            type="file"
            onChange={(e) => handleSelectAvatarFile(e)}
            ref={hiddenFileInput}
            style={{ display: 'none' }} // Make the file input element invisible
          />
          <Button
            variant="outlined"
            onClick={() => handleClickTag()}
          >
            Select file
          </Button>
          <Button variant="outlined">
            <img
              src={'/builtinAvatars/snoopyWalksLikeAnEgyption.PNG'}
            />
          </Button>
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
        </Stack>

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




