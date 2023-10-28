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
import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { addTagToDb } from '../controllers';

export interface TagManagerPropsFromParent {
  onClose: () => void;
}

export interface TagManagerProps extends TagManagerPropsFromParent {
  tags: Tag[],
  onAddTag: (label: string) => void;
}

const TagManager = (props: TagManagerProps) => {

  const [newTag, setNewTag] = React.useState('');

  const handleClose = () => {
    console.log('onClose');
    props.onClose();
  };

  const getListItems = (): JSX.Element[] => {
    const listItems = props.tags.map((tag: Tag) => {
      return (
        <ListItem key={tag.id}>
          <ListItemText id={tag.id} primary={tag.label} />
        </ListItem>
      );
    });

    return listItems;
  };

  const handleChange = (text: any) => {
    setNewTag(text);
  };

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
