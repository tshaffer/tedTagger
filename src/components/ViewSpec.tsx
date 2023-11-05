import * as React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TedTaggerDispatch } from '../models';
import { Box, Button } from '@mui/material';

import dayjs, { Dayjs } from 'dayjs';


import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { isNil } from 'lodash';

export interface ViewSpecPropsFromParent {
  onClose: () => void;
}

export interface ViewSpecProps extends ViewSpecPropsFromParent {
}

const ViewSpec = (props: ViewSpecProps) => {

  const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs('2010-01-01'));
  const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs('2023-11-01'));

  const handleSetStartDate = (startDateDayJs: Dayjs | null) => {
    console.log('handleSetStartDate');
    if (!isNil(startDateDayJs)) {
      const startDate: Date = startDateDayJs.toDate();
      console.log(startDate);
    }
  };

  const handleSetEndDate = (endDateDayJs: Dayjs | null) => {
  
    console.log('handleSetEndDate');
    if (!isNil(endDateDayJs)) {
      const endDate: Date = endDateDayJs.toDate();
      console.log(endDate);
      console.log(endDate.toISOString());
    }
  };

  const handleClose = () => {
    props.onClose();
  };

  return (
    <Box sx={{ width: '100%', minWidth: 300, maxWidth: 360, bgcolor: 'background.paper' }}>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label="Start date"
            value={startDate}
            onChange={(newValue) => handleSetStartDate(newValue)}
          />
        </DemoContainer>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label="End date"
            value={endDate}
            onChange={(newValue) => handleSetEndDate(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>
      <Button onClick={handleClose}>Close</Button>
    </Box>
  );

};

function mapStateToProps(state: any) {
  return {
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewSpec);
