import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TedTaggerDispatch } from '../models';
import { getSelectdMediaItems as getSelectedMediaItems } from '../selectors';
import { ClientMediaItem } from '../types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Autocomplete, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { isNil } from 'lodash';

interface TagOption {
  value: string | null;
  label: string;
}

export interface TagsPropertyPanelProps {
  selectedMediaItems: ClientMediaItem[],
}

const TagsPropertyPanel = (props: TagsPropertyPanelProps) => {

  let tagOptions: TagOption[] = [];
  tagOptions = [
    {
      value: 'Sam',
      label: 'Sam',
    },
    {
      value: 'Joel',
      label: 'Joel',
    },
    {
      value: 'Rachel',
      label: 'Rachel',
    },
  ];

  const handleDeleteTag = (tag: string | null) => {
    console.log('handleDeleteTag: ', tag);
  };

  const getRenderedDeleteIcon = (tag: string | null) => {
    if (isNil(tag)) {
      return null;
    }
    return (
      <IconButton
        id={tag}
        onClick={() => handleDeleteTag(tag)}
      >
        <DeleteIcon />
      </IconButton>
    );
  };

  const handleOpenAutoComplete = () => {
    console.log('autocomplete open');
  };

  const handleAutoCompleteChange = (
    selectedTag: TagOption | string | null,
    existingTag: string | null,
  ) => {
    console.log('handleAutoCompleteChange');
  };

  const handleAutoCompleteInputChange = (
    newValue: any,
  ) => {
    console.log('handleAutoCompleteInputChange open');
    console.log(newValue);
  };

  const handleCloseAutoComplete = () => {
    console.log('autocomplete close');
  };

  const handleAutoCompleteKeyDown = () => {
    console.log('handleAutoCompleteKeyDown');
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

  const getTagListItem = (tagOption: TagOption, id: string, tag: string | null) => {
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

  const getRenderedTagSelect = (tag: string): JSX.Element => {
    const ingredientOption: TagOption = { value: tag, label: tag };
    return getTagListItem(ingredientOption, tag, tag);
  };

  const getPlaceholderSelect = (): JSX.Element => {
    const tagOption: TagOption = { value: null, label: '' };
    return getTagListItem(tagOption, 'placeholder', null);
  };


  const getRenderedListOfTags = () => {

    let listOfTags: JSX.Element[] = [];

    if (props.selectedMediaItems.length === 1) {
      const selectedClientMediaItem: ClientMediaItem = props.selectedMediaItems[0];
      listOfTags = selectedClientMediaItem.tags.map((tag: string) => {
        return getRenderedTagSelect(tag);
      });
    }

    const renderedPlaceholderSelect = getPlaceholderSelect();
    listOfTags.push(renderedPlaceholderSelect);

    return listOfTags;
  };

  const renderedListOfTags = getRenderedListOfTags();

  return (
    <div>
      <List>
        {renderedListOfTags}
      </List>
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
    selectedMediaItems: getSelectedMediaItems(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    // onLoadMediaItems: loadMediaItems,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TagsPropertyPanel);
