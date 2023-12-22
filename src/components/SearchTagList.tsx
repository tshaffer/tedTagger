
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Autocomplete, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import { TedTaggerDispatch, addSearchTagRedux, removeSearchTagRedux, replaceSearchTagRedux, setTagSearchOperatorRedux } from '../models';
import { Tag, TagSearchOperator, TagSelectorType, TagsSpecification } from '../types';
import { isNil, isObject, isString } from 'lodash';
import { getAllTags, getSearchTags, getTagsSpecification } from '../selectors';

interface TagOption {
  value: Tag | null;
  label: string;
}

export interface SearchTagListProps {
  tagsSpecification: TagsSpecification;
  searchTags: Tag[];
  allTags: Tag[],
  onAddSearchTag: (tagId: string) => any;
  onRemoveSearchTag: (tagId: string) => any;
  onReplaceSearchTag: (existingTagId: string, newTagId: string) => any;
  onSetTagSearchOperatorRedux: (tagSearchOperator: TagSearchOperator) => any;
}

const SearchTagList = (props: SearchTagListProps) => {

  const tagOptions: TagOption[] = [];
  props.allTags.forEach((tag: Tag) => {
    tagOptions.push({
      value: tag,
      label: tag.label,
    });
  });

  const handleRemoveTag = (tag: Tag | null) => {
    if (!isNil(tag)) {
      console.log('remove tag: ' + tag.label);
      props.onRemoveSearchTag(tag.id);
    }
  };

  const getRenderedRemoveIcon = (tag: Tag | null) => {
    if (isNil(tag)) {
      return null;
    }
    return (
      <IconButton
        id={tag.id}
        onClick={() => handleRemoveTag(tag)}
      >
        <DeleteIcon />
      </IconButton>
    );
  };

  const handleTagSearchOperatorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = (event.target as HTMLInputElement).value;
    console.log('handleTagSearchOperatorChange');
    console.log(newValue);
    props.onSetTagSearchOperatorRedux(newValue as TagSearchOperator);
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
      // TEDTODO
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
      console.log('add tag: ' + selectedTag.label); // selectedTag is object - verified
      props.onAddSearchTag((selectedTag as TagOption).value!.id);
    } else {
      console.log('replace tag:', existingTag, selectedTag.label); // existingTag is object - verified
      props.onReplaceSearchTag((existingTag as Tag).id, (selectedTag as TagOption).value!.id);
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
    const renderedRemoveIcon = getRenderedRemoveIcon(tag);
    return (
      <ListItem key={id}>
        <Autocomplete
          freeSolo
          options={tagOptions}
          value={tagOption}
          autoHighlight={true}
          disablePortal
          id="combo-box-demo"
          sx={{ width: 176 }}
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
        {renderedRemoveIcon}

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

    listOfTags = props.searchTags.map((tag: Tag) => {
      return getRenderedTagSelect(tag);
    });

    const renderedPlaceholderSelect = getPlaceholderSelect();
    listOfTags.push(renderedPlaceholderSelect);

    return listOfTags;
  };

  const getSearchTagOperator = (): JSX.Element => {
    // const display: string = props.tagExistenceSpecification.specifyTagExistence ? 'block' : 'none';
    const display = 'block';
    return (
      <FormControl style={{ marginLeft: '31px', display }}>
        <span>Tag search operator</span>
        <RadioGroup
          aria-labelledby="tagSpecFormControl"
          value={props.tagsSpecification.tagSearchOperator ? props.tagsSpecification.tagSearchOperator : 'or'}
          name="radio-buttons-group"
          onChange={handleTagSearchOperatorChange}
        >
          <FormControlLabel value={TagSearchOperator.OR} control={<Radio />} label="Or" />
          <FormControlLabel value={TagSearchOperator.AND} control={<Radio />} label="And" />
        </RadioGroup>
      </FormControl>
    );
  };

  const renderedSearchTagOperator: JSX.Element = getSearchTagOperator();
  const renderedListOfTags: JSX.Element[] = getRenderedListOfTags();


  console.log('re-render tagList');

  return (
    <div>
      {renderedSearchTagOperator}
      <span style={{ marginLeft: '31px', marginTop: '8px' }}>Tag list</span>
      <div style={{ marginLeft: '14px' }}>
        <List>
          {renderedListOfTags}
        </List>
      </div>
    </div>
  );
};

function mapStateToProps(state: any, ownProps: any) {

  return {
    tagsSpecification: getTagsSpecification(state),
    searchTags: getSearchTags(state),
    allTags: getAllTags(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onAddSearchTag: addSearchTagRedux,
    onRemoveSearchTag: removeSearchTagRedux,
    onReplaceSearchTag: replaceSearchTagRedux,
    onSetTagSearchOperatorRedux: setTagSearchOperatorRedux,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTagList);


