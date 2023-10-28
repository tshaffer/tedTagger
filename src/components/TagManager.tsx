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
import { Box, Button, IconButton, ListItemButton, ListItemIcon, TextField, Tooltip } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SaveIcon from '@mui/icons-material/Save';
import { addTagToDb } from '../controllers';
import { isNil } from 'lodash';

export interface TagManagerPropsFromParent {
  onClose: () => void;
}

export interface TagManagerProps extends TagManagerPropsFromParent {
  tags: Tag[],
  onAddTag: (label: string) => void;
}

const TagManager = (props: TagManagerProps) => {

  const [newTag, setNewTag] = React.useState('');

  const hiddenFileInput = React.useRef(null);

  const handleClose = () => {
    console.log('onClose');
    props.onClose();
  };

  const handleClickTag = (tag: any) => {
    console.log('handleClickTag');
    console.log(tag);
  };


  const handleClick = () => {
    if (!isNil(hiddenFileInput) && !isNil(hiddenFileInput.current)) {
      (hiddenFileInput.current as any).click();
    }
  };

  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];
    console.log('handleChange', fileUploaded);
    // handleFile(fileUploaded);
  };


  const getListItems = (): JSX.Element[] => {
    const listItems = props.tags.map((tag: Tag) => {
      return (
        <ListItem
          key={tag.id}
        >
          <ListItemButton onClick={handleClick}>
            Select
          </ListItemButton>
          <input
            type="file"
            onChange={handleChange}
            ref={hiddenFileInput}
            style={{ display: 'none' }} // Make the file input element invisible
          />
          <ListItemText id={tag.id} primary={tag.label} />
        </ListItem>
      );
    });

    return listItems;
  };

  // const handleChange = (text: any) => {
  //   setNewTag(text);
  // };

  const handleSave = () => {
    console.log('handleSave');
    console.log(newTag);
    props.onAddTag(newTag);
    setNewTag('');
  };

  const listItems: JSX.Element[] = getListItems();

  return (
    <Box sx={{ width: '100%', minWidth: 300, maxWidth: 360, bgcolor: 'background.paper' }}>
      <List
        sx={{ width: '100%' }}
        subheader={<ListSubheader>Tags</ListSubheader>}
      >
        {listItems}
      </List>
      <div>
        <TextField
          value={newTag}
          onChange={(e: any) => handleChange(e.target.value)}
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
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TagManager);
