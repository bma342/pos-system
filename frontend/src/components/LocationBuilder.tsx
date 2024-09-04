import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createLocation } from '../redux/slices/locationSlice';
import { Location } from '../types/locationTypes';
import { AppDispatch } from '../redux/store';
import { TextField, Button, Box, Typography } from '@mui/material';

const LocationBuilder: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [location, setLocation] = useState<Omit<Location, 'id'>>({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    email: '',
    latitude: 0,
    longitude: 0,
    isActive: true,
    clientId: '',
    taxRate: 0,
    timezone: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Location, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof Location, string>> = {};
    if (!location.name) newErrors.name = 'Name is required';
    if (!location.address) newErrors.address = 'Address is required';
    if (!location.city) newErrors.city = 'City is required';
    if (!location.state) newErrors.state = 'State is required';
    if (!location.zipCode) newErrors.zipCode = 'Zip Code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      dispatch(createLocation(location));
    }
  };

  return (
    <Box>
      <Typography variant="h2">Location Builder</Typography>
      <Box component="form" display="flex" flexDirection="column" gap={2}>
        <TextField
          name="name"
          label="Name"
          value={location.name}
          onChange={handleInputChange}
          error={!!errors.name}
          helperText={errors.name}
          required
        />
        <TextField
          name="address"
          label="Address"
          value={location.address}
          onChange={handleInputChange}
          required
        />
        <TextField
          name="city"
          label="City"
          value={location.city}
          onChange={handleInputChange}
          required
        />
        <TextField
          name="state"
          label="State"
          value={location.state}
          onChange={handleInputChange}
          required
        />
        <TextField
          name="zipCode"
          label="Zip Code"
          value={location.zipCode}
          onChange={handleInputChange}
          required
        />
        <TextField
          name="phoneNumber"
          label="Phone Number"
          value={location.phoneNumber}
          onChange={handleInputChange}
          required
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          value={location.email}
          onChange={handleInputChange}
          required
        />
        <TextField
          name="latitude"
          label="Latitude"
          type="number"
          value={location.latitude}
          onChange={handleInputChange}
          required
        />
        <TextField
          name="longitude"
          label="Longitude"
          type="number"
          value={location.longitude}
          onChange={handleInputChange}
          required
        />
        <TextField
          name="taxRate"
          label="Tax Rate"
          type="number"
          value={location.taxRate}
          onChange={handleInputChange}
          required
        />
        <TextField
          name="timezone"
          label="Timezone"
          value={location.timezone}
          onChange={handleInputChange}
          required
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Location
        </Button>
      </Box>
    </Box>
  );
};

export default LocationBuilder;
