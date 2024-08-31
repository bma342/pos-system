import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { updateOrderProvider } from '../../redux/slices/orderProviderSlice';
import DoordashMarketplaceSettings from './DoordashMarketplaceSettings';
import {
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Typography,
  Box,
} from '@mui/material';

interface OrderProviderProps {
  providerId: number;
}

const OrderProvider: React.FC<OrderProviderProps> = ({ providerId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const provider = useSelector((state: RootState) =>
    state.orderProviders.providers.find((p) => p.id === providerId)
  );

  const [handleScheduledOrders, setHandleScheduledOrders] = useState(
    provider?.handleScheduledOrders || false
  );
  const [scheduledOrderLeadTime, setScheduledOrderLeadTime] = useState(
    provider?.scheduledOrderLeadTime || 30
  );

  if (!provider) {
    return <div>Provider not found</div>;
  }

  const handleSave = () => {
    dispatch(
      updateOrderProvider({
        id: providerId,
        handleScheduledOrders,
        scheduledOrderLeadTime,
      })
    );
  };

  return (
    <Box>
      <Typography variant="h5">{provider.name}</Typography>
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
        Save General Settings
      </Button>

      {/* Provider-specific settings */}
      {provider.type === 'doordash' && (
        <DoordashMarketplaceSettings providerId={providerId} />
      )}
      {/* Add other provider-specific settings components here */}
    </Box>
  );
};

export default OrderProvider;
