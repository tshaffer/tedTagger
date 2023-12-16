import * as React from 'react';

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
import { getEndDate, getStartDate, getPhotosToDisplayDateTagSelector, getPhotosToDisplayDateSelector } from '../selectors';
import { TagSelectorType, DateSelectorType } from '../types';
import { loadMediaItems, setEndDate, setStartDate, setDateSelector, setTagSelector } from '../controllers';

export interface PhotosToDisplaySpecPropsFromParent {
  onClose: () => void;
}

export interface PhotosToDisplaySpecProps extends PhotosToDisplaySpecPropsFromParent {
  dateSelector: DateSelectorType;
  tagSelector: TagSelectorType;
  startDate: string;
  endDate: string;
  onSetPhotosToDisplaySpec: (dateSelector: DateSelectorType) => void;
  onSetPhotosToDisplaySpecTagSpec: (tagSpec: TagSelectorType) => void;
  onSetStartDate: (startDate: string) => void;
  onSetEndDate: (endDate: string) => void;
  onReloadMediaItems: () => void;
}

const PhotoToDisplaySpec = (props: PhotosToDisplaySpecProps) => {

  const getPhotosToDisplaySpecTypeAsString = (): string => {
    switch (props.dateSelector) {
      case DateSelectorType.All:
      default:
        return 'all';
      case DateSelectorType.ByDateRange:
        return 'byDateRange';
    }
  };

  const getPhotosToDisplaySpecTagSpec = (): TagSelectorType => {
    return props.tagSelector;
  };

  const handlePhotosToDisplaySpecChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = (event.target as HTMLInputElement).value;
    console.log('handlePhotosToDisplaySpecChange');
    console.log(newValue);

    let newPhotosToDisplaySpec: DateSelectorType;
    switch (newValue.toLowerCase()) {
      case 'all':
      default:
        newPhotosToDisplaySpec = DateSelectorType.All;
        break;
      case 'bydaterange':
        newPhotosToDisplaySpec = DateSelectorType.ByDateRange;
        break;
    }
    props.onSetPhotosToDisplaySpec(newPhotosToDisplaySpec);
  };

  const handlePhotosToDisplaySpecTagTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = (event.target as HTMLInputElement).value;
    console.log('handlePhotosToDisplaySpecTagTypeChange');
    console.log(newValue);

    let newPhotosToDisplaySpec: TagSelectorType;
    switch (newValue.toLowerCase()) {
      case 'any':
      default:
        newPhotosToDisplaySpec = TagSelectorType.Any;
        break;
      case 'untagged':
        newPhotosToDisplaySpec = TagSelectorType.Untagged;
        break;
    }
    props.onSetPhotosToDisplaySpecTagSpec(newPhotosToDisplaySpec);
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

  const handleSearch = () => {
    props.onReloadMediaItems();
  };

  const handleClose = () => {
    props.onClose();
  };

  const getDateRangeSpecification = (): JSX.Element => {
    return (
      <FormControl style={{ marginLeft: '16px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="Start date"
              value={dayjs(props.startDate)}
              onChange={(newValue) => handleSetStartDate(newValue)}
              disabled={props.dateSelector !== DateSelectorType.ByDateRange}
            />
          </DemoContainer>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="End date"
              value={dayjs(props.endDate)}
              onChange={(newValue) => handleSetEndDate(newValue)}
              disabled={props.dateSelector !== DateSelectorType.ByDateRange}
            />
          </DemoContainer>
        </LocalizationProvider>
      </FormControl>
    );
  };


  // TEDTODO
  // <FormLabel id="tagSpecFormControl" style={{ fontWeight: 'bold'}}>Tags</FormLabel>

  const getTagSpecification = (): JSX.Element => {
    return (
      <FormControl style={{ marginLeft: '16px' }}>
        <RadioGroup
          aria-labelledby="tagSpecFormControl"
          value={getPhotosToDisplaySpecTagSpec()}
          name="radio-buttons-group"
          onChange={handlePhotosToDisplaySpecTagTypeChange}
        >
          <FormControlLabel value="untagged" control={<Radio />} label="Untagged" />
          <FormControlLabel value="tagged" control={<Radio />} label="Tagged" />
        </RadioGroup>
      </FormControl>
    );
  };


  const dateRangeSpecification: JSX.Element = getDateRangeSpecification();
  const tagSpecification: JSX.Element = getTagSpecification();

  // return (
  //   <Box sx={{ marginLeft: '8px', width: '100%', minWidth: 300, maxWidth: 360, bgcolor: 'background.paper' }}>
  //     <div>
  //       {dateRangeSpecification}
  //       {tagSpecification}
  //     </div>
  //     <br />
  //     <Button onClick={handleSearch}>Search</Button>
  //     <br />
  //     <Button onClick={handleClose}>Close</Button>
  //   </Box>
  // );

  return (
    <Box sx={{ marginLeft: '8px', width: '100%', minWidth: 300, maxWidth: 360, bgcolor: 'background.paper' }}>
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Specify date range" />
        {dateRangeSpecification}
        <FormControlLabel control={<Checkbox />} label="Specify tag existence" />
        {tagSpecification}
        <FormControlLabel control={<Checkbox />} label="Specify tag(s)" />
      </FormGroup>
      <Button onClick={handleSearch}>Search</Button>
      <br />
      <Button onClick={handleClose}>Close</Button>
    </Box>
  );

};

function mapStateToProps(state: any) {
  return {
    dateSelector: getPhotosToDisplayDateSelector(state),
    tagSelector: getPhotosToDisplayDateTagSelector(state),
    startDate: getStartDate(state),
    endDate: getEndDate(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onReloadMediaItems: loadMediaItems,
    onSetPhotosToDisplaySpec: setDateSelector,
    onSetPhotosToDisplaySpecTagSpec: setTagSelector,
    onSetStartDate: setStartDate,
    onSetEndDate: setEndDate,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoToDisplaySpec);
