import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';

import { TableHead, TableRow, TableCell, TableSortLabel, AlertProps, Alert, Snackbar, Table, TableBody, TableContainer, TablePagination, Checkbox, TextField, IconButton, Tooltip } from '@mui/material';

import { getAppInitialized, getMatchRule, getSearchRules } from '../selectors';
import { Button, DialogActions, DialogContent, FormControl, InputLabel, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent } from '@mui/material';
import { DateSearchRule, DateSearchRuleType, KeywordSearchRule, KeywordSearchRuleType, MatchRule, SearchRule, SearchRuleType } from '../types';

import AddIcon from '@mui/icons-material/Add';
import { addSearchRule, updateSearchRule } from '../models';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import { isNil } from 'lodash';

export interface SearchSpecDialogPropsFromParent {
  open: boolean;
  onClose: () => void;
}

export interface SearchSpecDialogProps extends SearchSpecDialogPropsFromParent {
  appInitialized: boolean;
  matchRule: MatchRule;
  searchRules: SearchRule[];
  onAddSearchRule: (searchRule: SearchRule) => any;
  onUpdateSearchRule: (searchRuleIndex: number, searchRule: SearchRule) => any;
}

const SearchSpecDialog = (props: SearchSpecDialogProps) => {

  const [matchRule, setMatchRule] = React.useState('all');

  const { open, onClose } = props;

  if (!props.appInitialized) {
    return null;
  }

  if (!open) {
    return null;
  }

  const handleClose = () => {
    onClose();
  };

  function handleAddRow(): void {
    const newSearchRule: SearchRule = {
      searchRuleType: SearchRuleType.Date,
      searchRule: {
        dateSearchRuleType: DateSearchRuleType.IsBefore,
        date: new Date().toISOString(),
      }
    };
    props.onAddSearchRule(newSearchRule);
  }

  const handleChangeMatchRule = (event: SelectChangeEvent<string>, child: React.ReactNode): void => {
    setMatchRule(event.target.value || 'all');
  };

  const handleChangeSearchRuleType = (searchRuleIndex: number, event: SelectChangeEvent<string>): void => {
    console.log('handleChangeSearchRuleType', searchRuleIndex, event.target.value);

    switch (event.target.value) {
      case SearchRuleType.Keyword: {
        const newSearchRule: SearchRule = {
          searchRuleType: SearchRuleType.Keyword,
          searchRule: {
            keywordSearchRuleType: KeywordSearchRuleType.AreEmpty,
          }
        };
        props.onUpdateSearchRule(searchRuleIndex, newSearchRule);
        break;
      }
      case SearchRuleType.Date: {
        const newSearchRule: SearchRule = {
          searchRuleType: SearchRuleType.Date,
          searchRule: {
            dateSearchRuleType: DateSearchRuleType.IsBefore,
            date: new Date().toISOString(),
          }
        };
        props.onUpdateSearchRule(searchRuleIndex, newSearchRule);
        break;
      }
      default:
        debugger;
    }

  };

  const handleChangeDateSearchRuleType = (searchRuleIndex: number, event: SelectChangeEvent<string>): void => {
    console.log('handleChangeDateSearchRuleType', searchRuleIndex, event.target.value);

    const searchRules: SearchRule[] = props.searchRules;
    const searchRule: SearchRule = searchRules[searchRuleIndex];
    const dateSearchRule: DateSearchRule = searchRule.searchRule as DateSearchRule;

    dateSearchRule.dateSearchRuleType = event.target.value as DateSearchRuleType;

    props.onUpdateSearchRule(searchRuleIndex, searchRule);
  };

  const handleSetDate = (dateDayJs: Dayjs | null) => {
    if (!isNil(dateDayJs)) {
      const date: Date = dateDayJs.toDate();
      console.log('handleSetDate', date.toISOString());
    }
  };

  const getDateSearchRuleType = (searchRuleIndex: number): DateSearchRuleType => {
    const searchRules: SearchRule[] = props.searchRules;
    const searchRule: SearchRule = searchRules[searchRuleIndex];
    const dateSearchRule: DateSearchRule = searchRule.searchRule as DateSearchRule;
    return dateSearchRule.dateSearchRuleType;
  };

  const renderDateRow = (rowIndex: number, searchRule: SearchRule): JSX.Element => {

    const searchRuleRule: DateSearchRule = searchRule.searchRule as DateSearchRule;
    const dateSearchRuleType: DateSearchRuleType = getDateSearchRuleType(rowIndex);

    return (
      <TableRow>
        <TableCell>
          <Select
            labelId="searchRuleTypeLabel"
            id="searchRuleTypeSelect"
            value={SearchRuleType.Date.toString()}
            onChange={(event) => handleChangeSearchRuleType(rowIndex, event)}
            input={<OutlinedInput label="Rule Type" />}
          >
            <MenuItem value={SearchRuleType.Keyword}>Keyword</MenuItem>
            <MenuItem value={SearchRuleType.Date}>Date</MenuItem>
          </Select>
        </TableCell>
        <TableCell>
          <Select
            labelId="dateSearchRuleTypeLabel"
            id="dateSearchRuleTypeSelect"
            value={dateSearchRuleType}
            onChange={(event) => handleChangeDateSearchRuleType(rowIndex, event)}
            input={<OutlinedInput label="Rule Type" />}
          >
            <MenuItem value={DateSearchRuleType.IsInTheRange}>is in the range</MenuItem>
            <MenuItem value={DateSearchRuleType.IsBefore}>is before</MenuItem>
            <MenuItem value={DateSearchRuleType.IsAfter}>is after</MenuItem>
          </Select>
        </TableCell>
        <TableCell>
          <FormControl style={{ marginLeft: '6px', display: 'block' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Date"
                  value={dayjs(searchRuleRule.date)}
                  onChange={(newValue) => handleSetDate(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </FormControl>

        </TableCell>

      </TableRow>
    );
  };

  const renderKeywordRow = (rowIndex: number, searchRule: SearchRule): JSX.Element => {
    return (
      <TableRow>
        <TableCell>
          <Select
            labelId="keywordSearchRuleTypeLabel"
            id="keywordSearchRuleTypeSelect"
            value={SearchRuleType.Keyword.toString()}
            onChange={(event) => handleChangeSearchRuleType(rowIndex, event)}
            input={<OutlinedInput label="Rule Type" />}
          >
            <MenuItem value={SearchRuleType.Keyword}>Keyword</MenuItem>
            <MenuItem value={SearchRuleType.Date}>Date</MenuItem>
          </Select>
        </TableCell>
        <TableCell>

        </TableCell>

      </TableRow>
    );
  };

  const renderRow = (rowIndex: number, searchRule: SearchRule): JSX.Element => {

    let rowJsx: JSX.Element;
    switch (searchRule.searchRuleType) {
      case SearchRuleType.Keyword:
        rowJsx = renderKeywordRow(rowIndex, searchRule);
        break;
      case SearchRuleType.Date:
      default:
        rowJsx = renderDateRow(rowIndex, searchRule);
    }

    return (
      <div>
        {rowJsx}
      </div>
    );
  };

  const renderRows = (): JSX.Element[] => {
    const rows: JSX.Element[] = props.searchRules.map((searchRule: SearchRule, index: number) => {
      return renderRow(index, searchRule);
    });
    return rows;
  };

  const rows: JSX.Element[] = renderRows();

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Search</DialogTitle>
      <DialogContent style={{ paddingBottom: '0px' }}>
        <div>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">Match rules:</InputLabel>
              <Select
                labelId="matchRuleLabel"
                id="matchRuleLabelSelect"
                value={matchRule}
                onChange={handleChangeMatchRule}
                input={<OutlinedInput label="Parent Keyword" />}
              >
                <MenuItem value={'all'}>all</MenuItem>
                <MenuItem value={'any'}>any</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <div>
                <Button color="primary" startIcon={<AddIcon />} onClick={handleAddRow}>
                  Add rule
                </Button>
              </div>
              <TableContainer>
                <Table
                  sx={{ minWidth: 400 }}
                  size={'small'}
                >
                  <TableBody>
                    {rows}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

function mapStateToProps(state: any) {
  return {
    appInitialized: getAppInitialized(state),
    matchRule: getMatchRule(state),
    searchRules: getSearchRules(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    onAddSearchRule: addSearchRule,
    onUpdateSearchRule: updateSearchRule,
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchSpecDialog);


