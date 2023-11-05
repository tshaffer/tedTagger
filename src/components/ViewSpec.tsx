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

export interface ViewSpecPropsFromParent {
  onClose: () => void;
}

export interface ViewSpecProps extends ViewSpecPropsFromParent {
}

const ViewSpec = (props: ViewSpecProps) => {

  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  const handleClose = () => {
    props.onClose();
  };

  return (
    <Box sx={{ width: '100%', minWidth: 300, maxWidth: 360, bgcolor: 'background.paper' }}>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label="Controlled picker"
            value={value}
            onChange={(newValue) => setValue(newValue)}
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
