import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { updateOrderProvider } from '../redux/slices/orderProviderSlice';
import {
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Box,
} from '@mui/material';
import { useSelectedLocation } from '../hooks/useSelectedLocation';
import { OrderProvider } from '../types/orderProviderTypes';

interface UberEatsSettingsProps {
  provider: OrderProvider;
}

const UberEatsSettings: React.FC<UberEatsSettingsProps> = ({ provider }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedLocation } = useSelectedLocation();

  const [apiKey, setApiKey] = useState(provider.settings.apiKey || '');
  const [apiSecret, setApiSecret] = useState(provider.settings.apiSecret || '');
  const [isActive, setIsActive] = useState(provider.isActive);

  const handleSave = () => {
    if (selectedLocation) {
      dispatch(
        updateOrderProvider({
          locationId: selectedLocation.id,
          providerId: provider.id,
          isActive,
          settings: {
            ...provider.settings,
            apiKey,
            apiSecret,
          },
        })
      );
    }
  };

  return (
    <Box>
      <FormControlLabel
        control={
          <Switch
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        }
        label="Active"
      />
      <TextField
        fullWidth
        margin="normal"
        label="API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="API Secret"
        type="password"
        value={apiSecret}
        onChange={(e) => setApiSecret(e.target.value)}
      />
      <Button onClick={handleSave} variant="contained" color="primary">
        Save Uber Eats Settings
      </Button>
    </Box>
  );
};

export default UberEatsSettings;