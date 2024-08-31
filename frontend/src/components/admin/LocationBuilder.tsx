import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createLocation,
  fetchLocations,
  fetchLocationProfiles,
} from '../../redux/slices/locationSlice';
import { fetchPOSIntegrations } from '../../redux/slices/posIntegrationSlice';
import { RootState, AppDispatch } from '../../redux/store';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
} from '@mui/material';
import MenuBuilder from './MenuBuilder';
import LocationExceptions from './LocationExceptions';

const LocationBuilder: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector((state: RootState) => state.location.locations);
  const locationProfiles = useSelector(
    (state: RootState) => state.location.locationProfiles
  );
  const posIntegrations = useSelector(
    (state: RootState) => state.posIntegration.integrations
  );

  const [newLocation, setNewLocation] = useState({
    name: '',
    address: '',
    posIntegrationId: '',
    copyFromLocationId: '',
    locationProfileId: '',
    customSettings: {
      hasDelivery: false,
      hasDineIn: false,
      hasPickup: false,
    },
    defaultPrepTime: 15,
    outOfStockBehavior: 'grey',
    inventoryResetTime: '',
  });

  const [showMenuBuilder, setShowMenuBuilder] = useState(false);

  useEffect(() => {
    dispatch(fetchLocations());
    dispatch(fetchLocationProfiles());
    dispatch(fetchPOSIntegrations());
  }, [dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setNewLocation((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNewLocation((prev) => ({
      ...prev,
      customSettings: { ...prev.customSettings, [name]: checked },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createLocation(newLocation));
    setShowMenuBuilder(true);
  };

  const handleCopyFromLocation = (locationId: string) => {
    const selectedLocation = locations.find((loc) => loc.id === locationId);
    if (selectedLocation) {
      setNewLocation((prev) => ({
        ...prev,
        posIntegrationId: selectedLocation.posIntegrationId,
        customSettings: { ...selectedLocation.customSettings },
      }));
    }
  };

  const handleApplyLocationProfile = (profileId: string) => {
    const selectedProfile = locationProfiles.find(
      (profile) => profile.id === profileId
    );
    if (selectedProfile) {
      setNewLocation((prev) => ({
        ...prev,
        customSettings: { ...selectedProfile.settings },
      }));
    }
  };

  return (
    <Box>
      <Typography variant="h4">Location Builder</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Location Name"
          value={newLocation.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="address"
          label="Address"
          value={newLocation.address}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>POS Integration</InputLabel>
          <Select
            name="posIntegrationId"
            value={newLocation.posIntegrationId}
            onChange={handleInputChange}
          >
            {posIntegrations.map((integration) => (
              <MenuItem key={integration.id} value={integration.id}>
                {integration.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Copy Settings from Location</InputLabel>
          <Select
            name="copyFromLocationId"
            value={newLocation.copyFromLocationId}
            onChange={(e) => {
              handleInputChange(e);
              handleCopyFromLocation(e.target.value as string);
            }}
          >
            <MenuItem value="">None</MenuItem>
            {locations.map((location) => (
              <MenuItem key={location.id} value={location.id}>
                {location.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Apply Location Profile</InputLabel>
          <Select
            name="locationProfileId"
            value={newLocation.locationProfileId}
            onChange={(e) => {
              handleInputChange(e);
              handleApplyLocationProfile(e.target.value as string);
            }}
          >
            <MenuItem value="">None</MenuItem>
            {locationProfiles.map((profile) => (
              <MenuItem key={profile.id} value={profile.id}>
                {profile.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Out of Stock Behavior</InputLabel>
          <Select
            name="outOfStockBehavior"
            value={newLocation.outOfStockBehavior}
            onChange={handleInputChange}
          >
            <MenuItem value="grey">Grey Out</MenuItem>
            <MenuItem value="hide">Hide</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="inventoryResetTime"
          label="Inventory Reset Time (HH:MM)"
          value={newLocation.inventoryResetTime}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newLocation.customSettings.hasDelivery}
              onChange={handleCheckboxChange}
              name="hasDelivery"
            />
          }
          label="Has Delivery"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newLocation.customSettings.hasDineIn}
              onChange={handleCheckboxChange}
              name="hasDineIn"
            />
          }
          label="Has Dine-In"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newLocation.customSettings.hasPickup}
              onChange={handleCheckboxChange}
              name="hasPickup"
            />
          }
          label="Has Pickup"
        />
        <TextField
          name="defaultPrepTime"
          label="Default Prep Time (minutes)"
          type="number"
          value={newLocation.defaultPrepTime}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Create Location
        </Button>
      </form>
      {showMenuBuilder && (
        <MenuBuilder
          locationId={newLocation.id}
          providers={['First Party', 'Third Party', 'Catering']}
        />
      )}
      <LocationExceptions locationId={newLocation.id} />
    </Box>
  );
};

export default LocationBuilder;
