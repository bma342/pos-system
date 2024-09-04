import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setSelectedLocations } from '../redux/slices/userSlice';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from '@mui/material';

const LocationSelector: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector((state: RootState) => state.locations.locations);
  const selectedLocations = useSelector((state: RootState) => state.user.selectedLocations);

  const handleLocationChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const locationIds = event.target.value as string[];
    dispatch(setSelectedLocations(locationIds));
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="location-select-label">Locations</InputLabel>
      <Select
        labelId="location-select-label"
        id="location-select"
        multiple
        value={selectedLocations}
        onChange={handleLocationChange}
        renderValue={(selected) => (selected as string[]).join(', ')}
      >
        {locations.map((location) => (
          <MenuItem key={location.id} value={location.id}>
            <Checkbox checked={selectedLocations.indexOf(location.id) > -1} />
            <ListItemText primary={location.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LocationSelector;
