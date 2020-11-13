import React from 'react';
import {
  Select,
  InputLabel,
  Checkbox,
  ListItemText,
  MenuItem,
  Input,
} from '@material-ui/core';
import { RoomType } from '../types';

export const SelectNames = (props: any) => {
  const { members, setSelectedNames, openNameSelect, author } = props;
  const [personName, setPersonName] = React.useState([author]);

  const handleChange = (event: Event) => {
    if (event.target) {
      setPersonName(event.target.value);
      setSelectedNames(event.target.value);
    }
  };

  return (
    <React.Fragment>
      <InputLabel id='mutiple-checkbox-label'>Select Members</InputLabel>
      <Select
        labelId='mutiple-checkbox-label'
        id='mutiple-checkbox'
        multiple
        value={personName}
        onChange={handleChange}
        onClose={e => console.log(e)}
        input={<Input />}
        renderValue={(selected: string[]) => selected.join(', ')}
      >
        {members.map((name: RoomType['members']) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={personName.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </React.Fragment>
  );
};
