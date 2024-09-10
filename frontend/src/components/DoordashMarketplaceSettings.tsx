import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { updateOrderProvider } from '../redux/slices/orderProviderSlice';
import { TextField, Button, Switch, FormControlLabel, Box } from '@mui/material';

interface DoordashMarketplaceSettingsProps {
  providerId: string;
}

const DoordashMarketplaceSettings: React.FC<DoordashMarketplaceSettingsProps> = ({ providerId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const provider = useSelector((state: RootState) =>
    state.orderProviders.providers.find((p) => p.id === providerId)
  );

  const [storeId, setStoreId] = useState(provider?.settings.storeId || '');
  const [apiKey, setApiKey] = useState(provider?.settings.apiKey || '');
  const [autoAcceptOrders, setAutoAcceptOrders] = useState(provider?.settings.autoAcceptOrders || false);

  const handleSave = () => {
    dispatch(updateOrderProvider({
      providerId,
      settings: {
        ...provider?.settings,
        storeId,
        apiKey,
        autoAcceptOrders,
      },
    }));
  };

  return (
    <Box>
      <TextField
        fullWidth
        margin="normal"
        label="Doordash Store ID"
        value={storeId}
        onChange={(e) => setStoreId(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Doordash API Key"
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <FormControlLabel
        control={
          <Switch
            checked={autoAcceptOrders}
            onChange={(e) => setAutoAcceptOrders(e.target.checked)}
          />
        }
        label="Auto-accept Orders"
      />
      <Button onClick={handleSave} variant="contained" color="primary">
        Save Doordash Settings
      </Button>
    </Box>
  );
};

export default DoordashMarketplaceSettings;
