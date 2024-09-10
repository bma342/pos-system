import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { setSelectedLocation } from '../redux/slices/locationSlice';
import { Location } from '../types/locationTypes';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Button, CircularProgress, SelectChangeEvent } from '@mui/material';
import { useSelectedLocation } from '../hooks/useSelectedLocation';
import { useSelectedClient } from '../hooks/useSelectedClient';

const OrderScheduling: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedLocation } = useSelectedLocation();
  const selectedClient = useSelectedClient();
  const locations = useSelector((state: RootState) => state.location.locations);
  const loading = useSelector((state: RootState) => state.location.loading);
  const error = useSelector((state: RootState) => state.location.error);

  const handleLocationChange = (event: SelectChangeEvent<string>) => {
    dispatch(setSelectedLocation(event.target.value));
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', pt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Order Scheduling
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="location-select-label">Select Location</InputLabel>
        <Select
          labelId="location-select-label"
          value={selectedLocation?.id || ''}
          onChange={handleLocationChange}
        >
          {locations.map((location: Location) => (
            <MenuItem key={location.id} value={location.id}>
              {location.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedLocation && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Schedule for {selectedLocation.name}
          </Typography>
          {/* Add date/time pickers, order details form, etc. */}
        </Box>
      )}
    </Box>
  );
};

export default OrderScheduling;