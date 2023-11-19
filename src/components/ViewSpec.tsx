import * as React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TedTaggerDispatch } from '../models';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

import dayjs, { Dayjs } from 'dayjs';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { isNil } from 'lodash';
import { getEndDate, getStartDate, getViewSpecTagSpec, getViewSpecType } from '../selectors';
import { ViewSpecTagType, ViewSpecType } from '../types';
import { loadMediaItems, setEndDate, setStartDate, setViewSpecType, setViewSpecTagSpec } from '../controllers';

export interface ViewSpecPropsFromParent {
  onClose: () => void;
}

export interface ViewSpecProps extends ViewSpecPropsFromParent {
  viewSpec: ViewSpecType;
  viewSpecTagSpec: ViewSpecTagType;
  startDate: string;
  endDate: string;
  onSetViewSpec: (viewSpec: ViewSpecType) => void;
  onSetViewSpecTagSpec: (tagSpec: ViewSpecTagType) => void;
  onSetStartDate: (startDate: string) => void;
  onSetEndDate: (endDate: string) => void;
  onReloadMediaItems: () => void;
}

const ViewSpec = (props: ViewSpecProps) => {

  const getViewSpecTypeAsString = (): string => {
    switch (props.viewSpec) {
      case ViewSpecType.All:
      default:
        return 'all';
      case ViewSpecType.ByDateRange:
        return 'byDateRange';
    }
  };

  const getViewSpecTagSpec = (): ViewSpecTagType => {
    return props.viewSpecTagSpec;
  };

  const handleViewSpecChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = (event.target as HTMLInputElement).value;
    console.log('handleViewSpecChange');
    console.log(newValue);

    let newViewSpec: ViewSpecType;
    switch (newValue.toLowerCase()) {
      case 'all':
      default:
        newViewSpec = ViewSpecType.All;
        break;
      case 'bydaterange':
        newViewSpec = ViewSpecType.ByDateRange;
        break;
    }
    props.onSetViewSpec(newViewSpec);
  };

  const handleViewSpecTagTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = (event.target as HTMLInputElement).value;
    console.log('handleViewSpecTagTypeChange');
    console.log(newValue);

    let newViewSpec: ViewSpecTagType;
    switch (newValue.toLowerCase()) {
      case 'any':
      default:
        newViewSpec = ViewSpecTagType.Any;
        break;
      case 'untagged':
        newViewSpec = ViewSpecTagType.Untagged;
        break;
    }
    props.onSetViewSpecTagSpec(newViewSpec);
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
      <FormControl>
        <FormLabel id="dateRangeFormControl">Date Range</FormLabel>
        <RadioGroup
          aria-labelledby="dateRangeFormControl"
          value={getViewSpecTypeAsString()}
          name="radio-buttons-group"
          onChange={handleViewSpecChange}
        >
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControl>
            <FormControlLabel value="byDateRange" control={<Radio />} label="By Date" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Start date"
                  value={dayjs(props.startDate)}
                  onChange={(newValue) => handleSetStartDate(newValue)}
                  disabled={props.viewSpec !== ViewSpecType.ByDateRange}
                />
              </DemoContainer>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="End date"
                  value={dayjs(props.endDate)}
                  onChange={(newValue) => handleSetEndDate(newValue)}
                  disabled={props.viewSpec !== ViewSpecType.ByDateRange}
                />
              </DemoContainer>
            </LocalizationProvider>
          </FormControl>
        </RadioGroup>
      </FormControl>
    );
  };

  // TEDTODO
  // <FormLabel id="tagSpecFormControl" style={{ fontWeight: 'bold'}}>Tags</FormLabel>

  const getTagSpecification = (): JSX.Element => {
    return (
      <FormControl style={ { marginTop: '32px'}}>
        <FormLabel id="tagSpecFormControl">Tags</FormLabel>
        <RadioGroup
          aria-labelledby="tagSpecFormControl"
          value={getViewSpecTagSpec()}
          name="radio-buttons-group"
          onChange={handleViewSpecTagTypeChange}
        >
          <FormControlLabel value="any" control={<Radio />} label="Any" />
          <FormControlLabel value="untagged" control={<Radio />} label="Untagged" />
        </RadioGroup>
      </FormControl>
    );
  };


  const dateRangeSpecification: JSX.Element = getDateRangeSpecification();
  const tagSpecification: JSX.Element = getTagSpecification();

  return (
    <Box sx={{ marginLeft: '8px', width: '100%', minWidth: 300, maxWidth: 360, bgcolor: 'background.paper' }}>
      <div>
        {dateRangeSpecification}
        {tagSpecification}
      </div>
      <br />
      <Button onClick={handleSearch}>Search</Button>
      <br />
      <Button onClick={handleClose}>Close</Button>
    </Box>
  );

};

function mapStateToProps(state: any) {
  return {
    viewSpec: getViewSpecType(state),
    viewSpecTagSpec: getViewSpecTagSpec(state),
    startDate: getStartDate(state),
    endDate: getEndDate(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onReloadMediaItems: loadMediaItems,
    onSetViewSpec: setViewSpecType,
    onSetViewSpecTagSpec: setViewSpecTagSpec,
    onSetStartDate: setStartDate,
    onSetEndDate: setEndDate,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewSpec);
