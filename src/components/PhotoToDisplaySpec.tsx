import * as React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TedTaggerDispatch, setEndDateRedux, setSpecifyDateRangeRedux, setSpecifyTagsInSearchRedux, setStartDateRedux, setTagSelectorRedux } from '../models';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup } from '@mui/material';

import dayjs, { Dayjs } from 'dayjs';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { isNil } from 'lodash';

import { TagSelectorType, TagSearchOperator, MainDisplayMode } from '../types';
import { loadMediaItems } from '../controllers';
import SearchTagList from './SearchTagList';
import { getEndDate, getMainDisplayMode, getSpecifyDateRange, getSpecifyTagsInSearch, getStartDate, getTagIds, getTagSearchOperator, getTagSelector } from '../selectors';

export interface PhotosToDisplaySpecPropsFromParent {
  onClose: () => void;
}

export interface PhotosToDisplaySpecProps extends PhotosToDisplaySpecPropsFromParent {

  specifyDateRange: boolean;
  startDate: string;
  endDate: string;
  specifyTagsInSearch: boolean;
  tagSelector: TagSelectorType;
  tagIds: string[];
  tagSearchOperator: TagSearchOperator;
  mainDisplayMode: MainDisplayMode;

  onReloadMediaItems: () => void;
  onSetSpecifyDateRange: (specifyDateRange: boolean) => void;
  onSetStartDate: (startDate: string) => void;
  onSetEndDate: (startDate: string) => void;
  onSetSpecifyTagsInSearch: (specifyTagsInSearch: boolean) => void;
  onSetTagSelector: (tagSelector: TagSelectorType) => void;
}

const PhotoToDisplaySpec = (props: PhotosToDisplaySpecProps) => {

  const handleSpecifyDateRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const specifyDateRange: boolean = (event.target as HTMLInputElement).checked;
    console.log('handlePhotosToDisplaySpecTagTypeChange');
    console.log(specifyDateRange);
    props.onSetSpecifyDateRange(specifyDateRange);
  };

  const handleSetStartDate = (startDateDayJs: Dayjs | null) => {
    if (!isNil(startDateDayJs)) {
      const startDate: Date = startDateDayJs.toDate();
      props.onSetStartDate(startDate.toISOString());
    }
  };

  const handleSetEndDate = (endDateDayJs: Dayjs | null) => {
    if (!isNil(endDateDayJs)) {
      const endDate: Date = endDateDayJs.toDate();
      props.onSetEndDate(endDate.toISOString());
    }
  };

  const handleSpecifyTagsInSearchChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const specifyTagsInSearch: boolean = (event.target as HTMLInputElement).checked;
    console.log('handleSpecifyTagsInSearchChanged');
    console.log(specifyTagsInSearch);
    props.onSetSpecifyTagsInSearch(specifyTagsInSearch);
  };

  const handleTagSelectorChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = (event.target as HTMLInputElement).value;
    console.log('handleTagSelectorChanged');
    console.log(newValue);
    props.onSetTagSelector(newValue as TagSelectorType);
  };

  const handleSearch = () => {
    props.onReloadMediaItems();
  };

  const handleClose = () => {
    props.onClose();
  };

  const getDateRangeSpecification = (): JSX.Element => {
    const display: string = props.specifyDateRange ? 'block' : 'none';
    return (
      <FormControl style={{ marginLeft: '6px', display }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="Start date"
              value={dayjs(props.startDate)}
              onChange={(newValue) => handleSetStartDate(newValue)}
            />
          </DemoContainer>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="End date"
              value={dayjs(props.endDate)}
              onChange={(newValue) => handleSetEndDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </FormControl>
    );
  };

  const getSpecificTags = (): JSX.Element | null => {
    if (props.tagSelector !== TagSelectorType.TagList) {
      return null;
    }
    return (
      <SearchTagList />
    );
  };

  const getTagsInSearchSpecification = (): JSX.Element => {
    const display: string = props.specifyTagsInSearch ? 'block' : 'none';
    return (
      <FormControl style={{ marginLeft: '6px', display }}>
        <RadioGroup
          aria-labelledby="tagSpecFormControl"
          value={props.tagSelector}
          name="radio-buttons-group"
          onChange={handleTagSelectorChanged}
        >
          <FormControlLabel value="untagged" control={<Radio />} label="Untagged photos" />
          <FormControlLabel value="tagged" control={<Radio />} label="Tagged photos (any tag)" />
          <FormControlLabel value="tagList" control={<Radio />} label="Specific tag(s)" />
          {getSpecificTags()}
        </RadioGroup>
      </FormControl>
    );
  };

  const dateRangeSpecification: JSX.Element = getDateRangeSpecification();
  const tagsInSearchSpecification: JSX.Element = getTagsInSearchSpecification();

  return (
    <Box id='photosToDisplaySpecBox' sx={{ marginLeft: '8px', height: '600px', bgcolor: 'background.paper' }}>
      <FormGroup id='photosToDisplaySpecFormGroup' >
        <FormControlLabel
          control={
            <Checkbox
              checked={props.specifyDateRange}
              onChange={handleSpecifyDateRangeChange}
            />
          }
          label="Specify date range" />
        {dateRangeSpecification}
        <FormControlLabel
          control={
            <Checkbox
              checked={props.specifyTagsInSearch}
              onChange={handleSpecifyTagsInSearchChanged}
            />
          }
          label="Include tags in search" />
        {tagsInSearchSpecification}
      </FormGroup>
      <Button onClick={handleSearch}>Search</Button>
      <br />
      <Button onClick={handleClose}>Close</Button>
    </Box>
  );

};

function mapStateToProps(state: any) {
  return {
    specifyDateRange: getSpecifyDateRange(state),
    startDate: getStartDate(state),
    endDate: getEndDate(state),
    specifyTagsInSearch: getSpecifyTagsInSearch(state),
    tagSelector: getTagSelector(state),
    tagIds: getTagIds(state),
    tagSearchOperator: getTagSearchOperator(state),
    mainDisplayMode: getMainDisplayMode(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onReloadMediaItems: loadMediaItems,
    onSetSpecifyDateRange: setSpecifyDateRangeRedux,
    onSetStartDate: setStartDateRedux,
    onSetEndDate: setEndDateRedux,
    onSetSpecifyTagsInSearch: setSpecifyTagsInSearchRedux,
    onSetTagSelector: setTagSelectorRedux,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoToDisplaySpec);
