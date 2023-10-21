import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TedTaggerDispatch } from '../models';
import { Tag } from '../types';
import { getAllTags } from '../selectors';
import { Box, IconButton, TextField, Tooltip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

export interface TagManagerPropsFromParent {
  open: boolean;
  onClose: () => void;
}

export interface TagManagerProps extends TagManagerPropsFromParent {
  tags: Tag[],
}

const TagManager = (props: TagManagerProps) => {

  const [newTag, setNewTag] = React.useState('');

  const getListItems = (): JSX.Element[] => {
    const listItems = props.tags.map((tag: Tag) => {
      return (
        <ListItem key={tag.id}>
          <ListItemText id={tag.id} primary={tag.label} />
        </ListItem>
      );
    });

    return listItems;
  };

  const handleChange = (text: any) => {
    setNewTag(text);
  };

  const handleSave = () => {
    console.log('handleSave');
  };

  const listItems: JSX.Element[] = getListItems();

  return (
    <Box sx={{ width: '100%', minWidth: 300, maxWidth: 360, bgcolor: 'background.paper' }}>
      <List
        sx={{ width: '100%' }}
        subheader={<ListSubheader>Tags</ListSubheader>}
      >
        {listItems}
      </List>
      <div>
        <TextField
          value={newTag}
          onChange={(e: any) => handleChange(e.target.value)}
        >
        </TextField>
        <Tooltip title="Save">
          <IconButton
            onClick={() => handleSave()}
          >
            <SaveIcon />
          </IconButton>
        </Tooltip>

      </div>
    </Box>
  );
};

function mapStateToProps(state: any) {
  return {
    tags: getAllTags(state),
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TagManager);

/*
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import WifiIcon from '@mui/icons-material/Wifi';
import BluetoothIcon from '@mui/icons-material/Bluetooth';

export default function SwitchListSecondary() {
  const [checked, setChecked] = React.useState(['wifi']);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      subheader={<ListSubheader>Settings</ListSubheader>}
    >
      <ListItem>
        <ListItemIcon>
          <WifiIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" />
        <Switch
          edge="end"
          onChange={handleToggle('wifi')}
          checked={checked.indexOf('wifi') !== -1}
          inputProps={{
            'aria-labelledby': 'switch-list-label-wifi',
          }}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <BluetoothIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-bluetooth" primary="Bluetooth" />
        <Switch
          edge="end"
          onChange={handleToggle('bluetooth')}
          checked={checked.indexOf('bluetooth') !== -1}
          inputProps={{
            'aria-labelledby': 'switch-list-label-bluetooth',
          }}
        />
      </ListItem>
    </List>
  );
}*/