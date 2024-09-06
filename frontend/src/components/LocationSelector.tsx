import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setSelectedLocation } from '../redux/slices/locationSlice';
import { Select, MenuItem } from '@mui/material';

const LocationSelector: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector((state: RootState) => state.location.locations);
  const selectedLocationId = useSelector((state: RootState) => state.location.selectedLocation);

  const handleLocationChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(setSelectedLocation(event.target.value as string));
  };

  return (
    <Select
      value={selectedLocationId || ''}
      onChange={handleLocationChange}
      displayEmpty
      fullWidth
    >
      <MenuItem value="" disabled>Select a location</MenuItem>
      {locations.map((location) => (
        <MenuItem key={location.id} value={location.id}>
          {location.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LocationSelector;
