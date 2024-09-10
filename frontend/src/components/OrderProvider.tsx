import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchOrderProvider, updateOrderProvider } from '../redux/slices/orderProviderSlice';
import DoordashMarketplaceSettings from './DoordashMarketplaceSettings';
import UberEatsSettings from './UberEatsSettings';
import CateringSettings from './CateringSettings';
import {
  Typography,
  Box,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelectedLocation } from '../hooks/useSelectedLocation';
import { OrderProvider as OrderProviderType } from '../types/orderProviderTypes';

interface OrderProviderProps {
  providerId: string;
}

const OrderProvider: React.FC<OrderProviderProps> = ({ providerId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedLocation } = useSelectedLocation();
  const provider = useSelector((state: RootState) => 
    state.orderProvider.providers.find(p => p.id === providerId)
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedLocation) {
      dispatch(fetchOrderProvider({ locationId: selectedLocation.id, providerId }))
        .then(() => setLoading(false))
        .catch((error: Error) => {
          console.error('Error fetching order provider:', error);
          setLoading(false);
        });
    }
  }, [dispatch, selectedLocation, providerId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!provider) {
    return <Typography color="error">Order provider not found</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5">Order Provider: {provider.name}</Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{provider.name} Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {provider.type === 'doordash' && (
            <DoordashMarketplaceSettings providerId={provider.id} />
          )}
          {provider.type === 'ubereats' && (
            <UberEatsSettings provider={provider} />
          )}
          {provider.type === 'catering' && (
            <CateringSettings provider={provider} />
          )}
          {/* Add other provider-specific settings components here */}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default OrderProvider;
