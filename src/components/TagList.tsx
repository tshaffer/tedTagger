
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TedTaggerDispatch, addTagToMediaItemRedux, deleteTag } from '../models';
import { MediaItem, Tag } from '../types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Autocomplete, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { isNil, isObject, isString } from 'lodash';
import { getAllTags, getMediaItem } from '../selectors';
import { addTagToMediaItem } from '../controllers';

interface TagOption {
  // value: string | null;
  value: Tag | null;
  label: string;
}

export interface TagListPropsPropsFromParent {
  mediaItemId: string,
  tags: Tag[],
}

export interface TagListProps extends TagListPropsPropsFromParent {
  allTags: Tag[],
  mediaItem: MediaItem,
  onAddTagToMediaItem: (mediaItem: MediaItem, tag: Tag) => any;
  onDeleteTagFromMediaItem: (mediaItem: MediaItem, tag: Tag) => any;
}

const TagList = (props: TagListProps) => {

  const tagOptions: TagOption[] = [];
  props.allTags.forEach((tag: Tag) => {
    tagOptions.push({
      value: tag,
      label: tag.label,
    });
  });

  const handleDeleteTag = (tag: Tag | null) => {
    console.log('handleDeleteTag: ', tag);
    if (!isNil(tag)) {
      props.onDeleteTagFromMediaItem(props.mediaItem, tag);
    }
  };

  const getRenderedDeleteIcon = (tag: Tag | null) => {
    if (isNil(tag)) {
      return null;
    }
    return (
      <IconButton
        id={tag.id}
        onClick={() => handleDeleteTag(tag)}
      >
        <DeleteIcon />
      </IconButton>
    );
  };

  const handleOpenAutoComplete = () => {
    // console.log('autocomplete open');
  };

  const handleAutoCompleteChange = (
    selectedTag: TagOption | string | null,
    existingTag: Tag | string | null,
  ) => {
    console.log('handleAutoCompleteChange');
    console.log(selectedTag);
    console.log(existingTag);

    if (isString(selectedTag)) {
      // debugger;
      // Occurs when clicking enter on previously entered tag without changing anything
      return;
    }
    if (isString(existingTag)) {
      debugger;
    }

    if (!isObject(selectedTag)) {
      return;
    }

    // if (isString(existingTag)){
    //   debugger;
    // }

    if (isNil(existingTag)) {
      // add tag to media item
      // props.onAddTagToMediaItem(props.mediaItem, (selectedTag as TagOption).value as Tag);
      console.log('add tag: ' + selectedTag.label); // selectedTag is object - verified
      props.onAddTagToMediaItem(props.mediaItem, (selectedTag as TagOption).value as Tag);
    } else {
      // replace tag in media item
      console.log('replace tag:', existingTag, selectedTag.label); // existingTag is object - verified
      debugger;
    }

  };

  const handleAutoCompleteInputChange = (
    newValue: any,
  ) => {
    // console.log('handleAutoCompleteInputChange open');
    // console.log(newValue);
  };

  const handleCloseAutoComplete = () => {
    // console.log('autocomplete close');
  };

  const handleAutoCompleteKeyDown = () => {
    // console.log('handleAutoCompleteKeyDown');
  };

  const myIsOptionEqualToValue = (option: any, value: any) => {
    if (isNil(option.value)) {
      return (option.label === value.label);
    }

    if (isNil(option.value.id)) {
      return false;
    }
    if (isNil(value) || isNil(value.value) || isNil(value.value.id)) {
      return false;
    }

    return option.value.id === value.value.id;
  };

  const getTagListItem = (tagOption: TagOption, id: string, tag: Tag | null) => {
    const renderedDeleteIcon = getRenderedDeleteIcon(tag);
    return (
      <ListItem key={id}>
        <Autocomplete
          freeSolo
          options={tagOptions}
          value={tagOption}
          autoHighlight={true}
          disablePortal
          id="combo-box-demo"
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Tag" />}
          onChange={(event: any, newValue: string | TagOption | null) => {
            handleAutoCompleteChange(newValue as TagOption, tag);
          }}
          onInputChange={(event, value, reason) => handleAutoCompleteInputChange(value)}
          onOpen={handleOpenAutoComplete}
          onClose={handleCloseAutoComplete}
          onKeyDown={handleAutoCompleteKeyDown}
          key={id}
          isOptionEqualToValue={myIsOptionEqualToValue}
        />
        {renderedDeleteIcon}

      </ListItem>
    );
  };

  const getRenderedTagSelect = (tag: Tag): JSX.Element => {
    const ingredientOption: TagOption = { value: tag, label: tag.label };
    return getTagListItem(ingredientOption, tag.id, tag);
  };

  const getPlaceholderSelect = (): JSX.Element => {
    const tagOption: TagOption = { value: null, label: '' };
    return getTagListItem(tagOption, 'placeholder', null);
  };

  const getRenderedListOfTags = (): JSX.Element[] => {

    let listOfTags: JSX.Element[] = [];

    listOfTags = props.tags.map((tag: Tag) => {
      return getRenderedTagSelect(tag);
    });

    const renderedPlaceholderSelect = getPlaceholderSelect();
    listOfTags.push(renderedPlaceholderSelect);

    return listOfTags;
  };

  const renderedListOfTags = getRenderedListOfTags();

  console.log('re-render tagList');

  return (
    <List>
      {renderedListOfTags}
    </List>
  );
};

function mapStateToProps(state: any, ownProps: any) {
  return {
    allTags: getAllTags(state),
    mediaItemId: ownProps.mediaItem,
    mediaItem: getMediaItem(state, ownProps.mediaItemId) as MediaItem,
    tags: ownProps.tags,
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onAddTagToMediaItem: addTagToMediaItem,
    onDeleteTagFromMediaItem: deleteTag,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TagList);


