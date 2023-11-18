import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TedTaggerDispatch } from '../models';
import { Tag } from '../types';
import { getAllTags } from '../selectors';
import { Box, Button, IconButton, ListItemIcon, TextField, Tooltip } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SaveIcon from '@mui/icons-material/Save';
import { addTagToDb, uploadTagIconFile } from '../controllers';
import { isNil } from 'lodash';
import path from 'path-browserify';

export interface TagManagerPropsFromParent {
  onClose: () => void;
}

export interface TagManagerProps extends TagManagerPropsFromParent {
  tags: Tag[],
  onAddTag: (label: string) => void;
  onUploadTagIconFile: (tag: Tag, formData: FormData) => any;
}

const TagManager = (props: TagManagerProps) => {

  const [selectedTag, setSelectedTag] = React.useState<Tag | null>();

  const [newTag, setNewTag] = React.useState('');

  const hiddenFileInput = React.useRef(null);

  const handleClose = () => {
    props.onClose();
  };

  const handleClickTag = (tag: Tag) => {
    setSelectedTag(tag);
    if (!isNil(hiddenFileInput) && !isNil(hiddenFileInput.current)) {
      (hiddenFileInput.current as any).click();
    }
  };

  const handleSetNewTag = (text: any) => {
    setNewTag(text);
  };

  const handleSelectFile = (event: any) => {
    if (!isNil(selectedTag)) {
      const selectedFile = event.target.files[0];
      const data = new FormData();
      data.append('file', selectedFile);
      props.onUploadTagIconFile(selectedTag, data);
    }
  };


  const getTagIcon = (tag: Tag) : JSX.Element => {
    if (isNil(tag.iconFileName)) {
      return (
        <span></span>
      );
    }
    const filePath = path.join(
      '/tagIconImages',
      tag.iconFileName);
    return (
      <img src={filePath} alt={tag.label}/>
    );
  };
  

  const getListItems = (): JSX.Element[] => {
    const listItems = props.tags.map((tag: Tag) => {
      return (
        <ListItem
          key={tag.id}
        >
          <ListItemIcon
            onClick={() => handleClickTag(tag)}
          >
            <AssignmentIndIcon />
          </ListItemIcon>
          <input
            type="file"
            onChange={(e) => handleSelectFile(e)}
            ref={hiddenFileInput}
            style={{ display: 'none' }} // Make the file input element invisible
          />
          {getTagIcon(tag)}
          <ListItemText id={tag.id} primary={tag.label} />
        </ListItem>
      );
    });

    return listItems;
  };

  const handleSave = () => {
    props.onAddTag(newTag);
    setNewTag('');
  };

  const listItems: JSX.Element[] = getListItems();

  return (
    <Box sx={{ width: '100%', minWidth: 300, maxWidth: 360, bgcolor: 'background.paper' }}>
      <List
        sx={{ width: '100%' }}
      >
        {listItems}
      </List>
      <div>
        <TextField
          value={newTag}
          onChange={(e: any) => handleSetNewTag(e.target.value)}
        >
        </TextField>
        <Tooltip title="Save">
          <IconButton
            onClick={() => handleSave()}
          >
            <SaveIcon />
          </IconButton>
        </Tooltip>

      </div>
      <Button onClick={handleClose}>Close</Button>
    </Box>
  );
};

function mapStateToProps(state: any) {
  return {
    tags: getAllTags(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onAddTag: addTagToDb,
    onUploadTagIconFile: uploadTagIconFile,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TagManager);
