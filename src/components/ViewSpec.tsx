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
import { getEndDate, getStartDate, getViewSpecType } from '../selectors';
import { ViewSpecType } from '../types';
import { getMediaItemsToDisplayFromServer, setEndDate, setStartDate, setViewSpecType } from '../controllers';

export interface ViewSpecPropsFromParent {
  onClose: () => void;
}

export interface ViewSpecProps extends ViewSpecPropsFromParent {
  viewSpec: ViewSpecType;
  startDate: string;
  endDate: string;
  onSetViewSpec: (viewSpec: ViewSpecType) => void;
  onSetStartDate: (startDate: string) => void;
  onSetEndDate: (endDate: string) => void;
  onUpdateMediaItemsToDisplay: () => void;
}

const ViewSpec = (props: ViewSpecProps) => {

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
    props.onUpdateMediaItemsToDisplay();
  };

  const handleClose = () => {
    props.onClose();
  };

  return (
    <Box sx={{ width: '100%', minWidth: 300, maxWidth: 360, bgcolor: 'background.paper' }}>
      <div>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">View Spec</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="all"
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
    startDate: getStartDate(state),
    endDate: getEndDate(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
    onUpdateMediaItemsToDisplay: getMediaItemsToDisplayFromServer,
    onSetViewSpec: setViewSpecType,
    onSetStartDate: setStartDate,
    onSetEndDate: setEndDate,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewSpec);
