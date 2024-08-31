import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { updateOrderProvider } from '../../redux/slices/orderProviderSlice';
import { TextField, Button, Typography, Box } from '@mui/material';

interface DoordashSSIOSettingsProps {
  providerId: number;
}

const DoordashSSIOSettings: React.FC<DoordashSSIOSettingsProps> = ({
  providerId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const orderProvider = useSelector((state: RootState) =>
    state.orderProviders.providers.find(
      (provider) => provider.id === providerId
    )
  );

  const [storeId, setStoreId] = useState(orderProvider?.doordashStoreId || '');
  const [menuId, setMenuId] = useState(orderProvider?.doordashMenuId || '');
  const [externalReferenceId, setExternalReferenceId] = useState(
    orderProvider?.doordashExternalReferenceId || ''
  );

  useEffect(() => {
    if (orderProvider) {
      setStoreId(orderProvider.doordashStoreId || '');
      setMenuId(orderProvider.doordashMenuId || '');
      setExternalReferenceId(orderProvider.doordashExternalReferenceId || '');
    }
  }, [orderProvider]);

  const handleSave = () => {
    dispatch(
      updateOrderProvider({
        id: providerId,
        doordashStoreId: storeId,
        doordashMenuId: menuId,
        doordashExternalReferenceId: externalReferenceId,
      })
    );
  };

  if (!orderProvider) {
    return <Typography>Order provider not found</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6">Doordash SSIO Settings</Typography>
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
        label="Doordash Menu ID"
        value={menuId}
        onChange={(e) => setMenuId(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="External Reference ID"
        value={externalReferenceId}
        onChange={(e) => setExternalReferenceId(e.target.value)}
      />
      <Button onClick={handleSave} variant="contained" color="primary">
        Save Doordash SSIO Settings
      </Button>
    </Box>
  );
};

export default DoordashSSIOSettings;
