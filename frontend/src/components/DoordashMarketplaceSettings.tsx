import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { updateOrderProvider } from '../../redux/slices/orderProviderSlice';
import {
  TextField,
  Button,
  Typography,
  Box,
  Switch,
  FormControlLabel,
} from '@mui/material';

interface DoordashMarketplaceSettingsProps {
  providerId: number;
}

const DoordashMarketplaceSettings: React.FC<
  DoordashMarketplaceSettingsProps
> = ({ providerId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const orderProvider = useSelector((state: RootState) =>
    state.orderProviders.providers.find(
      (provider) => provider.id === providerId
    )
  );

  const [storeId, setStoreId] = useState(orderProvider?.doordashStoreId || '');
  const [merchantId, setMerchantId] = useState(
    orderProvider?.doordashMerchantId || ''
  );
  const [apiKey, setApiKey] = useState(orderProvider?.doordashApiKey || '');
  const [isMenuSyncEnabled, setIsMenuSyncEnabled] = useState(
    orderProvider?.isDoordashMenuSyncEnabled || false
  );
  const [isAutoAcceptEnabled, setIsAutoAcceptEnabled] = useState(
    orderProvider?.isDoordashAutoAcceptEnabled || false
  );
  const [handleScheduledOrders, setHandleScheduledOrders] = useState(
    orderProvider?.handleScheduledOrders || false
  );
  const [scheduledOrderLeadTime, setScheduledOrderLeadTime] = useState(
    orderProvider?.scheduledOrderLeadTime || 30
  );

  useEffect(() => {
    if (orderProvider) {
      setStoreId(orderProvider.doordashStoreId || '');
      setMerchantId(orderProvider.doordashMerchantId || '');
      setApiKey(orderProvider.doordashApiKey || '');
      setIsMenuSyncEnabled(orderProvider.isDoordashMenuSyncEnabled || false);
      setIsAutoAcceptEnabled(
        orderProvider.isDoordashAutoAcceptEnabled || false
      );
      setHandleScheduledOrders(orderProvider.handleScheduledOrders || false);
      setScheduledOrderLeadTime(orderProvider.scheduledOrderLeadTime || 30);
    }
  }, [orderProvider]);

  const handleSave = () => {
    dispatch(
      updateOrderProvider({
        id: providerId,
        doordashStoreId: storeId,
        doordashMerchantId: merchantId,
        doordashApiKey: apiKey,
        isDoordashMenuSyncEnabled: isMenuSyncEnabled,
        isDoordashAutoAcceptEnabled: isAutoAcceptEnabled,
        handleScheduledOrders,
        scheduledOrderLeadTime,
      })
    );
  };

  if (!orderProvider) {
    return <Typography>Order provider not found</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6">Doordash Marketplace Settings</Typography>
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
        label="Doordash Merchant ID"
        value={merchantId}
        onChange={(e) => setMerchantId(e.target.value)}
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
            checked={isMenuSyncEnabled}
            onChange={(e) => setIsMenuSyncEnabled(e.target.checked)}
          />
        }
        label="Enable Menu Sync"
      />
      <FormControlLabel
        control={
          <Switch
            checked={isAutoAcceptEnabled}
            onChange={(e) => setIsAutoAcceptEnabled(e.target.checked)}
          />
        }
        label="Enable Auto-Accept Orders"
      />
      <FormControlLabel
        control={
          <Switch
            checked={handleScheduledOrders}
            onChange={(e) => setHandleScheduledOrders(e.target.checked)}
          />
        }
        label="Handle Scheduled Orders"
      />
      <TextField
        fullWidth
        margin="normal"
        label="Scheduled Order Lead Time (minutes)"
        type="number"
        value={scheduledOrderLeadTime}
        onChange={(e) => setScheduledOrderLeadTime(parseInt(e.target.value))}
        disabled={!handleScheduledOrders}
      />
      <Button onClick={handleSave} variant="contained" color="primary">
        Save Doordash Marketplace Settings
      </Button>
    </Box>
  );
};

export default DoordashMarketplaceSettings;
