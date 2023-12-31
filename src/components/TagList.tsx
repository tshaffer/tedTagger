
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Autocomplete, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import { TedTaggerDispatch } from '../models';
import { MediaItem, Tag } from '../types';
import { cloneDeep, isNil, isObject, isString } from 'lodash';
import { getAllTags, getMediaItem, getTagById } from '../selectors';
import { addTagToMediaItems, deleteTagFromMediaItems, replaceTagInMediaItems } from '../controllers';

interface TagOption {
  value: Tag | null;
  label: string;
}

export interface TagListPropsPropsFromParent {
  mediaItemIds: string[],
}

export interface TagListProps extends TagListPropsPropsFromParent {
  commonTags: Tag[],
  allTags: Tag[],
  mediaItems: MediaItem[],
  onAddTagToMediaItems: (mediaItems: MediaItem[], tag: Tag) => any;
  onReplaceTagInMediaItems: (mediaItems: MediaItem[], oldTag: Tag, newTag: Tag) => any;
  onDeleteTagFromMediaItems: (tagId: string, mediaItems: MediaItem[]) => any;
}

const TagList = (props: TagListProps) => {

  const tagOptions: TagOption[] = [];
  props.allTags.forEach((tag: Tag) => {
    tagOptions.push({
      value: tag,
      label: tag.label,
    });
  });

  const commonTagOptions: TagOption[] = [];
  props.commonTags.forEach((tag: Tag) => {
    commonTagOptions.push({
      value: tag,
      label: tag.label,
    });
  });

  const handleDeleteTagFromMediaItems = (tag: Tag | null) => {
    if (!isNil(tag)) {
      props.onDeleteTagFromMediaItems(tag.id, props.mediaItems);
    }
  };

  const getRenderedDeleteIcon = (tag: Tag | null) => {
    if (isNil(tag)) {
      return null;
    }
    return (
      <IconButton
        id={tag.id}
        onClick={() => handleDeleteTagFromMediaItems(tag)}
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

    if (isNil(existingTag)) {
      // add tags to media items
      console.log('add tag: ' + selectedTag.label); // selectedTag is object - verified
      props.onAddTagToMediaItems(props.mediaItems, (selectedTag as TagOption).value as Tag);
    } else {
      // replace tag in media items
      console.log('replace tag:', existingTag, selectedTag.label); // existingTag is object - verified
      props.onReplaceTagInMediaItems(props.mediaItems, existingTag as Tag, (selectedTag as TagOption).value as Tag);
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

  function filterTags(allTags: TagOption[], commonTags: TagOption[], selectedTagOption: TagOption): TagOption[] {
    // Create a set of common tag IDs for efficient lookup
    const commonTagIds = new Set(commonTags.map(tag => tag.value));

    // Filter the allTags array based on the conditions
    const filteredTags = allTags.filter(tag => {
      // Include the selectedTagOption regardless of commonTags
      if (tag.value === selectedTagOption.value) {
        return true;
      }
      // Exclude tags present in commonTags
      return !commonTagIds.has(tag.value);
    });

    return filteredTags;
  }

  const getTagListItem = (tagOption: TagOption, id: string, tag: Tag | null) => {
    const tagOptionsFiltered = filterTags(tagOptions, commonTagOptions, tagOption);
    const renderedDeleteIcon = getRenderedDeleteIcon(tag);
    return (
      <ListItem key={id}>
        <Autocomplete
          freeSolo
          options={tagOptionsFiltered}
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
          // TEDTODO - this is a hack to set the height of the autocomplete popup - not sure what I really want here!!
          ListboxProps={
            {
              style: {
                maxHeight: '300px',
                border: '1px solid red'
              }
            }
          }
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

    listOfTags = props.commonTags.map((tag: Tag) => {
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

// should be much easier if I knew how to use filter.
const getCommonTags = (state: any, mediaItems: MediaItem[]): Tag[] => {

  const commonTagsIds: string[] = cloneDeep(mediaItems[0].tagIds);

  const commonTagIdIndicesToRemove: number[] = [];

  for (let j = 1; j < mediaItems.length; j++) {
    const mediaItem: MediaItem = mediaItems[j];
    const tagIdsInMediaItem: string[] = mediaItem.tagIds;
    commonTagsIds.forEach((commonTagId: string, index: number) => {
      if (!tagIdsInMediaItem.includes(commonTagId)) {
        commonTagIdIndicesToRemove.push(index);
      }
    });
    // commonTagsIds = commonTagsIds.filter((commonTagId: string) => {
    //   mediaItem.tagIds.includes(commonTagId);
    // });
  }

  for (let i = commonTagIdIndicesToRemove.length - 1; i >= 0; i--) {
    const indexOfTagIdToRemove = commonTagIdIndicesToRemove[i];
    commonTagsIds.splice(indexOfTagIdToRemove, 1);
  }

  const commonTags: Tag[] = [];
  commonTagsIds.forEach((commonTagId: string) => {
    const tag: Tag | null = getTagById(state, commonTagId);
    if (!isNil(tag)) {
      commonTags.push(tag);
    }
  });

  return commonTags;
};

function mapStateToProps(state: any, ownProps: any) {

  const mediaItems: MediaItem[] = getMediaItems(state, ownProps.mediaItemIds);
  const commonTags: Tag[] = getCommonTags(state, mediaItems);

  return {
    mediaItemIds: ownProps.mediaItemIds,
    allTags: getAllTags(state),
    mediaItems,
    commonTags,
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onAddTagToMediaItems: addTagToMediaItems,
    onReplaceTagInMediaItems: replaceTagInMediaItems,
    onDeleteTagFromMediaItems: deleteTagFromMediaItems,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TagList);


