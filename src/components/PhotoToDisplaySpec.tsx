import * as React from 'react';
import { ChangeEvent } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TedTaggerDispatch } from '../models';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from '@mui/material';

import dayjs, { Dayjs } from 'dayjs';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { isNil } from 'lodash';

import { TagSelectorType, TagExistenceSpecification, DateRangeSpecification, TagsSpecification } from '../types';
import { loadMediaItems, setDateRangeSpecification, setTagExistenceSpecification } from '../controllers';
import { setTagsSpecificationRedux } from '../models/';
import { getDateRangeSpecification, getTagExistenceSpecification, getTagsSpecification } from '../selectors';
import SearchTagList from './SearchTagList';

export interface PhotosToDisplaySpecPropsFromParent {
  onClose: () => void;
}

export interface PhotosToDisplaySpecProps extends PhotosToDisplaySpecPropsFromParent {
  dateRangeSpecification: DateRangeSpecification;
  tagExistenceSpecification: TagExistenceSpecification;
  tagsSpecification: TagsSpecification;
  onSetDateRangeSpecification: (specifyDateRange: boolean, startDate?: string, endDate?: string) => void;
  onSetTagExistenceSpecification: (specifyTagExistence: boolean, tagExistence?: TagSelectorType) => void;
  onSetTagsSpecification: (specifySearchWithTags: boolean, tagIds: string[]) => void;
  onReloadMediaItems: () => void;
}

const PhotoToDisplaySpec = (props: PhotosToDisplaySpecProps) => {

  const handlePhotosToDisplaySpecTagTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = (event.target as HTMLInputElement).value;
    console.log('handlePhotosToDisplaySpecTagTypeChange');
    console.log(newValue);
    props.onSetTagExistenceSpecification(props.tagExistenceSpecification.specifyTagExistence, newValue as TagSelectorType);
  };

  const handleSetStartDate = (startDateDayJs: Dayjs | null) => {
    if (!isNil(startDateDayJs)) {
      const startDate: Date = startDateDayJs.toDate();
      props.onSetDateRangeSpecification(props.dateRangeSpecification.specifyDateRange, startDate.toISOString(), props.dateRangeSpecification.endDate);
    }
  };

  const handleSetEndDate = (endDateDayJs: Dayjs | null) => {
    if (!isNil(endDateDayJs)) {
      const endDate: Date = endDateDayJs.toDate();
      props.onSetDateRangeSpecification(props.dateRangeSpecification.specifyDateRange, props.dateRangeSpecification.startDate, endDate.toISOString());
    }
  };

  const handleSearch = () => {
    props.onReloadMediaItems();
  };

  const handleClose = () => {
    props.onClose();
  };

  const getDateRangeSpecification = (): JSX.Element => {
    const display: string = props.dateRangeSpecification.specifyDateRange ? 'block' : 'none';
    return (
      <FormControl style={{ marginLeft: '6px', display }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="Start date"
              value={dayjs(props.dateRangeSpecification.startDate)}
              onChange={(newValue) => handleSetStartDate(newValue)}
            />
          </DemoContainer>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="End date"
              value={dayjs(props.dateRangeSpecification.endDate)}
              onChange={(newValue) => handleSetEndDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </FormControl>
    );
  };


  // TEDTODO
  // <FormLabel id="tagSpecFormControl" style={{ fontWeight: 'bold'}}>Tags</FormLabel>

  const getTagsExistenceSpecification = (): JSX.Element => {
    const display: string = props.tagExistenceSpecification.specifyTagExistence ? 'block' : 'none';
    return (
      <FormControl style={{ marginLeft: '6px', display }}>
        <RadioGroup
          aria-labelledby="tagSpecFormControl"
          value={props.tagExistenceSpecification.tagSelector ? props.tagExistenceSpecification.tagSelector : 'untagged'}
          name="radio-buttons-group"
          onChange={handlePhotosToDisplaySpecTagTypeChange}
        >
          <FormControlLabel value="untagged" control={<Radio />} label="Untagged" />
          <FormControlLabel value="tagged" control={<Radio />} label="Tagged" />
        </RadioGroup>
      </FormControl>
    );
  };

  const getTagsSpecification = (): JSX.Element | null => {
    if (!props.tagsSpecification.specifySearchWithTags) {
      return null;
    }

    return (
      <SearchTagList />
    );
  };

  const dateRangeSpecification: JSX.Element = getDateRangeSpecification();
  const tagsExistenceSpecification: JSX.Element = getTagsExistenceSpecification();
  const tagsSpecification: JSX.Element | null = getTagsSpecification();

  function handleSpecifyDateRangeChanged(event: ChangeEvent<HTMLInputElement>, checked: boolean): void {
    console.log('handleSpecifyDateRangeChanged', event.target.checked);
    props.onSetDateRangeSpecification(event.target.checked, props.dateRangeSpecification.startDate, props.dateRangeSpecification.endDate);
  }

  function handleSpecifyTagExistenceChanged(event: ChangeEvent<HTMLInputElement>, checked: boolean): void {
    console.log('handleSpecifyTagExistenceChanged', event.target.checked);
    props.onSetTagExistenceSpecification(event.target.checked, props.tagExistenceSpecification.tagSelector);
  }

  function handleSpecifyTagsChanged(event: ChangeEvent<HTMLInputElement>, checked: boolean): void {
    console.log('handleSpecifyTagsChanged', event.target.checked);
    props.onSetTagsSpecification(event.target.checked, props.tagsSpecification.tagIds);
  }

  return (
    <Box sx={{ marginLeft: '8px', width: '100%', minWidth: 300, maxWidth: 360, bgcolor: 'background.paper' }}>
      <FormGroup>
        <FormControlLabel control={
          <Checkbox
            checked={props.dateRangeSpecification.specifyDateRange ? true : false}
            onChange={handleSpecifyDateRangeChanged}
          />
        } label="Specify date range" />
        {dateRangeSpecification}
        <FormControlLabel control={
          <Checkbox
            checked={props.tagExistenceSpecification.specifyTagExistence ? true : false}
            onChange={handleSpecifyTagExistenceChanged}
          />
        } label="Specify tag existence" />
        {tagsExistenceSpecification}
        <FormControlLabel control={
          <Checkbox
            checked={props.tagsSpecification.specifySearchWithTags ? true : false}
            onChange={handleSpecifyTagsChanged}
          />
        } label="Specify tag(s)" />
        {tagsSpecification}
      </FormGroup>
      <Button onClick={handleSearch}>Search</Button>
      <br />
      <Button onClick={handleClose}>Close</Button>
    </Box>
  );

};

function mapStateToProps(state: any) {
  return {
    dateRangeSpecification: getDateRangeSpecification(state),
    tagExistenceSpecification: getTagExistenceSpecification(state),
    tagsSpecification: getTagsSpecification(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onReloadMediaItems: loadMediaItems,
    onSetDateRangeSpecification: setDateRangeSpecification,
    onSetTagExistenceSpecification: setTagExistenceSpecification,
    onSetTagsSpecification: setTagsSpecificationRedux,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoToDisplaySpec);
