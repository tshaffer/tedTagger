import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Box, Button, IconButton, ListItemIcon, TextField, Tooltip } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import { AppTagAvatar, StringToBooleanLUT, Tag, UserTagAvatar } from '../types';
import { TedTaggerDispatch } from '../models';
import { addTagToDb, deleteTag, updateTagLabel } from '../controllers';
import { getAllAppTagAvatars, getAllTags, getAllUserTagAvatars, isTagInUse } from '../selectors';
import SelectAvatarDialog from './SelectAvatarDialog';
import TagAvatar from './TagAvatar';
import EditableTextLabel from './EditableTextLabel';

export interface TagManagerPropsFromParent {
  onClose: () => void;
}

export interface TagManagerProps extends TagManagerPropsFromParent {
  tags: Tag[],
  tagInUseByTagId: StringToBooleanLUT,
  appTagAvatars: AppTagAvatar[];
  userTagAvatars: UserTagAvatar[];
  onAddTag: (label: string) => void;
  onUpdateTagLabel: (tagId: string, label: string) => void;
  onDeleteTag: (tagId: string) => void;
}

const TagManager = (props: TagManagerProps) => {

  const [selectedTag, setSelectedTag] = React.useState<Tag | null>();

  const [newTag, setNewTag] = React.useState('');

  const [showSelectAvatarDialog, setShowSelectAvatarDialog] = React.useState(false);

  const getListItems = (): JSX.Element[] => {
    const listItems = props.tags.map((tag: Tag) => {
      return (
        <ListItem
          key={tag.id}
          style={{ paddingLeft: '8px' }}
        >
          <Tooltip title="Select avatar">
            <ListItemIcon
              style={{ cursor: 'pointer', width: '32px', minWidth: '32px' }}
              onClick={() => handleClickTag(tag)}
            >
              <AssignmentIndIcon />
            </ListItemIcon>
          </Tooltip>
          <TagAvatar avatarType={tag.avatarType} avatarId={tag.avatarId} />
          <EditableTextLabel
            key={tag.id}
            // style={{ width: '85px' }}
            text={tag.label}
            onBlur={(text: string) => handleBlur(tag.id, text)}
          />
          <Tooltip title="Delete tag">
            <IconButton
              style={{ cursor: 'pointer', width: '40px' }}
              disabled={props.tagInUseByTagId[tag.id]}
              onClick={() => handleDeleteTag(tag.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>

        </ListItem >
      );
    });

    return listItems;
  };

  const handleClose = () => {
    props.onClose();
  };

  const handleClickTag = (tag: Tag) => {
    setSelectedTag(tag);
    setShowSelectAvatarDialog(true);
  };

  const handleSetNewTag = (text: string) => {
    setNewTag(text);
  };

  const handleBlur = (tagId: string, text: string) => {
    console.log(text);
    props.onUpdateTagLabel(tagId, text);
  };

  const handleCloseSelectAvatar = () => {
    setShowSelectAvatarDialog(false);
  };

  const handleSaveTag = () => {
    props.onAddTag(newTag);
    setNewTag('');
  };

  const handleDeleteTag = (tagId: string) => {
    props.onDeleteTag(tagId);
  };

  const listItems: JSX.Element[] = getListItems();

  return (
    <Box sx={{ width: '100%', minWidth: 300, maxWidth: 360, bgcolor: 'background.paper' }}>
      <div>
        <SelectAvatarDialog
          tag={selectedTag!}
          open={showSelectAvatarDialog}
          onClose={handleCloseSelectAvatar}
        />
      </div>

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
            onClick={() => handleSaveTag()}
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

  const tagInUseByTagId: StringToBooleanLUT = {};
  const tags: Tag[] = getAllTags(state);
  tags.forEach((tag: Tag) => {
    tagInUseByTagId[tag.id] = isTagInUse(state, tag.id);
  });

  return {
    tags,
    tagInUseByTagId,
    appTagAvatars: getAllAppTagAvatars(state),
    userTagAvatars: getAllUserTagAvatars(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onAddTag: addTagToDb,
    onUpdateTagLabel: updateTagLabel,
    onDeleteTag: deleteTag,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TagManager);
