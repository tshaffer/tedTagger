import * as React from 'react';
import { connect } from 'react-redux';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, DialogContent, Stack } from '@mui/material';
import { isNil } from 'lodash';
import { AppTagAvatar, Tag } from '../types';
import { bindActionCreators } from 'redux';
import { assignTagAvatarToTag, setTagUserAvatarFromFile } from '../controllers';
import { TedTaggerDispatch } from '../models';
import { getAllAppTagAvatars } from '../selectors';

export interface SelectAvatarDialogPropsFromParent {
  tag: Tag;
  open: boolean;
  onClose: () => void;
}

export interface SelectAvatarDialogProps extends SelectAvatarDialogPropsFromParent {
  appTagAvatars: AppTagAvatar[];
  onSetTagUserAvatarFromFile: (tag: Tag, formData: FormData) => any;
  onAssignTagAvatarToTag: (tagId: string, avatarType: string, avatarId: string) => any;
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
    console.log(props.tag);
    if (!isNil(props.tag)) {
      const selectedFile = event.target.files[0];
      const data = new FormData();
      data.append('file', selectedFile);
      props.onSetTagUserAvatarFromFile(props.tag, data);
      handleClose();
    }
  };

  const handleAppAvatarSelected = (event: any, appTagAvatar: AppTagAvatar) => {
    console.log('handleAppAvatarSelected', appTagAvatar);
    props.onAssignTagAvatarToTag(props.tag.id, 'app', appTagAvatar.id);
    handleClose();
  };

  const getAppTagAvatarElements = () => {
    const appTagAvatarElements = props.appTagAvatars.map((appTagAvatar: AppTagAvatar, index) => {
      return (
        <Button
          onClick={(e) => handleAppAvatarSelected(e, appTagAvatar)}
          key={index.toString()}
        >
          <img src={'/appAvatars/' + appTagAvatar.pathToLarge} />

        </Button>
      );
    });
    return appTagAvatarElements;
  };

  const getDialogContents = () => {
    const appTagAvatarElements = getAppTagAvatarElements();
    return (
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
        {appTagAvatarElements}
      </Stack>
      // </Box>
    );
  };

  const dialogContents = getDialogContents();
  return (
    <Dialog
      onClose={handleClose}
      open={props.open}
      fullWidth
      maxWidth="xl"
    >
      <DialogTitle>Select Avatar</DialogTitle>
      <DialogContent>
        {dialogContents}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

function mapStateToProps(state: any) {
  return {
    appTagAvatars: getAllAppTagAvatars(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onSetTagUserAvatarFromFile: setTagUserAvatarFromFile,
    onAssignTagAvatarToTag: assignTagAvatarToTag,
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(SelectAvatarDialog);




