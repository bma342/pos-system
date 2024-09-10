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

interface CateringSettingsProps {
  provider: OrderProvider;
}

const CateringSettings: React.FC<CateringSettingsProps> = ({ provider }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedLocation } = useSelectedLocation();

  const [minimumOrderAmount, setMinimumOrderAmount] = useState(provider.settings.minimumOrderAmount || 0);
  const [leadTimeHours, setLeadTimeHours] = useState(provider.settings.leadTimeHours || 24);
  const [maxOrderDaysInAdvance, setMaxOrderDaysInAdvance] = useState(provider.settings.maxOrderDaysInAdvance || 30);
  const [deliveryFee, setDeliveryFee] = useState(provider.settings.deliveryFee || 0);
  const [serviceFeePercentage, setServiceFeePercentage] = useState(provider.settings.serviceFeePercentage || 0);
  const [allowPickup, setAllowPickup] = useState(provider.settings.allowPickup !== false);
  const [allowDelivery, setAllowDelivery] = useState(provider.settings.allowDelivery !== false);
  const [isActive, setIsActive] = useState(provider.isActive);

  const handleSave = () => {
    if (selectedLocation) {
      dispatch(
        updateOrderProvider({
          locationId: selectedLocation.id,
          providerId: provider.id,
          isActive,
          settings: {
            minimumOrderAmount,
            leadTimeHours,
            maxOrderDaysInAdvance,
            deliveryFee,
            serviceFeePercentage,
            allowPickup,
            allowDelivery,
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
        label="Minimum Order Amount"
        type="number"
        value={minimumOrderAmount}
        onChange={(e) => setMinimumOrderAmount(Number(e.target.value))}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Lead Time (hours)"
        type="number"
        value={leadTimeHours}
        onChange={(e) => setLeadTimeHours(Number(e.target.value))}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Max Order Days in Advance"
        type="number"
        value={maxOrderDaysInAdvance}
        onChange={(e) => setMaxOrderDaysInAdvance(Number(e.target.value))}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Delivery Fee"
        type="number"
        value={deliveryFee}
        onChange={(e) => setDeliveryFee(Number(e.target.value))}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Service Fee Percentage"
        type="number"
        value={serviceFeePercentage}
        onChange={(e) => setServiceFeePercentage(Number(e.target.value))}
      />
      <FormControlLabel
        control={
          <Switch
            checked={allowPickup}
            onChange={(e) => setAllowPickup(e.target.checked)}
          />
        }
        label="Allow Pickup"
      />
      <FormControlLabel
        control={
          <Switch
            checked={allowDelivery}
            onChange={(e) => setAllowDelivery(e.target.checked)}
          />
        }
        label="Allow Delivery"
      />
      <Button onClick={handleSave} variant="contained" color="primary">
        Save Catering Settings
      </Button>
    </Box>
  );
};

export default CateringSettings;