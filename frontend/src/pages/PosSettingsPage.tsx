import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchPOSSettings, updatePOSSettings } from '../redux/slices/posSettingsSlice';
import { useSelectedLocation } from '../hooks/useSelectedLocation';
import { Typography, CircularProgress, Box, Button, TextField } from '@mui/material';

const PosSettingsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedLocation } = useSelectedLocation();
  const posSettings = useSelector((state: RootState) => 
    selectedLocation ? state.posSettings.settings[selectedLocation.id] : null
  );
  const [localSettings, setLocalSettings] = useState(posSettings);

  useEffect(() => {
    if (selectedLocation) {
      dispatch(fetchPOSSettings(selectedLocation.id));
    }
  }, [dispatch, selectedLocation]);

  useEffect(() => {
    setLocalSettings(posSettings);
  }, [posSettings]);

  const handleSave = () => {
    if (selectedLocation && localSettings) {
      dispatch(updatePOSSettings({ locationId: selectedLocation.id, settings: localSettings }));
    }
  };

  if (!selectedLocation) return <Typography>No location selected</Typography>;
  if (!posSettings) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h1">POS Settings for {selectedLocation.name}</Typography>
      {/* Render form fields for POS settings here */}
      <Button onClick={handleSave}>Save Settings</Button>
    </Box>
  );
};

export default PosSettingsPage;