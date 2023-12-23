import * as React from 'react';
import { ChangeEvent } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TedTaggerDispatch, setSpecifyDateRangeRedux } from '../models';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from '@mui/material';

import dayjs, { Dayjs } from 'dayjs';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { isNil } from 'lodash';

import { TagSelectorType, DateRangeSpecification, TagsInSearchSpecification, PhotosToDisplaySpec, TagSearchOperator } from '../types';
import { loadMediaItems, 
  // setDateRangeSpecification, 
  // setTagExistenceSpecification
 } from '../controllers';
import SearchTagList from './SearchTagList';
import { getDateRangeSpecification, getEndDate, getSpecifyDateRange, getSpecifyTagsInSearch, getStartDate, getTagIds, getTagSearchOperator, getTagSelector, getTagsInSearchSpecification } from '../selectors';

export interface PhotosToDisplaySpecPropsFromParent {
  onClose: () => void;
}

export interface PhotosToDisplaySpecProps extends PhotosToDisplaySpecPropsFromParent {
  // dateRangeSpecification: DateRangeSpecification;
  // onSetDateRangeSpecification: (specifyDateRange: boolean, startDate?: string, endDate?: string) => void;
  // onSetTagExistenceSpecification: (specifyTagExistence: boolean, tagExistence?: TagSelectorType) => void;
  // onSetTagsSpecification: (specifySearchWithTags: boolean, tagIds: string[]) => void;
  // onReloadMediaItems: () => void;

  specifyDateRange: boolean;
  startDate: string;
  endDate: string;
  specifyTagsInSearch: boolean;
  tagSelector: TagSelectorType;
  tagIds: string[];
  tagSearchOperator: TagSearchOperator;

  onSetSpecifyDateRange: (specifyDateRange: boolean) => void;
}

const PhotoToDisplaySpec = (props: PhotosToDisplaySpecProps) => {

  const handleSpecifyDateRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const specifyDateRange: boolean = (event.target as HTMLInputElement).checked;
    console.log('handlePhotosToDisplaySpecTagTypeChange');
    console.log(specifyDateRange);
    props.onSetSpecifyDateRange(specifyDateRange);
    // props.onSetTagExistenceSpecification(props.tagExistenceSpecification.specifyTagExistence, newValue as TagSelectorType);
  };

  const handleSetStartDate = (startDateDayJs: Dayjs | null) => {
    if (!isNil(startDateDayJs)) {
      const startDate: Date = startDateDayJs.toDate();
      // props.onSetDateRangeSpecification(props.dateRangeSpecification.specifyDateRange, startDate.toISOString(), props.dateRangeSpecification.endDate);
    }
  };

  const handleSetEndDate = (endDateDayJs: Dayjs | null) => {
    if (!isNil(endDateDayJs)) {
      const endDate: Date = endDateDayJs.toDate();
      // props.onSetDateRangeSpecification(props.dateRangeSpecification.specifyDateRange, props.dateRangeSpecification.startDate, endDate.toISOString());
    }
  };

  const handleSearch = () => {
    // props.onReloadMediaItems();
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


  const getTagsInSearchSpecification = (): JSX.Element => {
    const display: string = props.specifyTagsInSearch ? 'block' : 'none';
    return (
      <FormControl style={{ marginLeft: '6px', display }}>
        <RadioGroup
          aria-labelledby="tagSpecFormControl"
          value={props.tagSelector}
          name="radio-buttons-group"
          // onChange={handlePhotosToDisplaySpecTagTypeChange}
        >
          <FormControlLabel value="untagged" control={<Radio />} label="Untagged photos" />
          <FormControlLabel value="tagged" control={<Radio />} label="Tagged photos (any tag)" />
          <FormControlLabel value="tagList" control={<Radio />} label="Specific tag(s)" />
        </RadioGroup>
      </FormControl>
    );
  };

  const getTagsSpecification = (): JSX.Element | null => {
    if (props.tagSelector !== TagSelectorType.TagList) {
      return null;
    }

    return (
      <SearchTagList />
    );
  };

  const dateRangeSpecification: JSX.Element = getDateRangeSpecification();
  const tagsInSearchSpecification: JSX.Element = getTagsInSearchSpecification();
  // const tagsSpecification: JSX.Element | null = getTagsSpecification();

  // function handleSpecifyDateRangeChanged(event: ChangeEvent<HTMLInputElement>, checked: boolean): void {
  //   console.log('handleSpecifyDateRangeChanged', event.target.checked);
  //   // props.onSetDateRangeSpecification(event.target.checked, props.dateRangeSpecification.startDate, props.dateRangeSpecification.endDate);
  // }

  // function handleSpecifyTagExistenceChanged(event: ChangeEvent<HTMLInputElement>, checked: boolean): void {
  //   console.log('handleSpecifyTagExistenceChanged', event.target.checked);
  //   // props.onSetTagExistenceSpecification(event.target.checked, props.tagExistenceSpecification.tagSelector);
  // }

  // function handleSpecifyTagsChanged(event: ChangeEvent<HTMLInputElement>, checked: boolean): void {
  //   console.log('handleSpecifyTagsChanged', event.target.checked);
  //   // props.onSetTagsSpecification(event.target.checked, props.tagsSpecification.tagIds);
  // }

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
              // onChange={handleSpecifyTagExistenceChanged}
            />
          }
          label="Include tags in search" />
        {tagsInSearchSpecification}
        {/* <FormControlLabel
          control={
            <Checkbox
              checked={props.tagsSpecification.specifySearchWithTags ? true : false}
              onChange={handleSpecifyTagsChanged}
            />
          }
          label="Specify tag(s)" />
        {tagsSpecification} */}
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
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onReloadMediaItems: loadMediaItems,
    // onSetDateRangeSpecification: setDateRangeSpecification,
    // onSetTagExistenceSpecification: setTagExistenceSpecification,
    // onSetTagsSpecification: setTagsSpecificationRedux,

    onSetSpecifyDateRange: setSpecifyDateRangeRedux,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoToDisplaySpec);
