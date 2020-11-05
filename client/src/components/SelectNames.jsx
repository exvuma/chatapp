import React from 'react';
import {
  Select,
  InputLabel,
  Checkbox,
  ListItemText,
  MenuItem,
  Input,
} from '@material-ui/core';
const dotenv = require('dotenv');
dotenv.config({ path: '../.env', debug: true });

export const SelectNames = props => {
  const { names, setSelectedNames } = props;
  const [personName, setPersonName] = React.useState([]);

  const handleChange = event => {
    setPersonName(event.target.value);
    console.log(event.target.value);
    setSelectedNames(event.target.value);
  };

  return (
    <React.Fragment>
      <InputLabel id='demo-mutiple-checkbox-label'>Select Members</InputLabel>
      <Select
        labelId='demo-mutiple-checkbox-label'
        id='demo-mutiple-checkbox'
        multiple
        value={personName}
        onChange={handleChange}
        input={<Input />}
        renderValue={selected => selected.join(', ')}
        // MenuProps={MenuProps}
      >
        {names.map(name => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={personName.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </React.Fragment>
  );
};
