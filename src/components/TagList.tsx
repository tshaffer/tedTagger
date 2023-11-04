
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Autocomplete, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import { TedTaggerDispatch, deleteTagFromMediaItemsRedux } from '../models';
import { MediaItem, Tag } from '../types';
import { isNil, isObject, isString } from 'lodash';
import { getAllTags, getMediaItem } from '../selectors';
import { addTagToMediaItems} from '../controllers';

interface TagOption {
  value: Tag | null;
  label: string;
}

export interface TagListPropsPropsFromParent {
  mediaItemIds: string[],
  tags: Tag[],
}

export interface TagListProps extends TagListPropsPropsFromParent {
  allTags: Tag[],
  mediaItems: MediaItem[],
  onAddTagToMediaItems: (mediaItems: MediaItem[], tag: Tag) => any;
  onDeleteTagFromMediaItems: (mediaItems: MediaItem[], tagId: string) => any;
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
      props.onDeleteTagFromMediaItems(props.mediaItems, tag.id);
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
      // add tags to media items
      console.log('add tag: ' + selectedTag.label); // selectedTag is object - verified
      props.onAddTagToMediaItems(props.mediaItems, (selectedTag as TagOption).value as Tag);
    } else {
      // replace tag in media items
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
    const tagOption: TagOption = { value: tag, label: tag.label };
    return getTagListItem(tagOption, tag.id, tag);
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

const getMediaItems = (state: any, mediaItemIds: string[]): MediaItem[] => {
  const mediaItems: MediaItem[] = [];
  mediaItemIds.forEach((mediaItemId: string) => {
    const mediaItem: MediaItem | null = getMediaItem(state, mediaItemId);
    if (!isNil(mediaItem)) {
      mediaItems.push(mediaItem);
    }
  });
  return mediaItems;
};

function mapStateToProps(state: any, ownProps: any) {
  return {
    allTags: getAllTags(state),
    mediaItemIds: ownProps.mediaItemIds,
    mediaItems: getMediaItems(state, ownProps.mediaItemIds),
    tags: ownProps.tags,
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onAddTagToMediaItems: addTagToMediaItems,
    onDeleteTagFromMediaItems: deleteTagFromMediaItemsRedux,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TagList);


