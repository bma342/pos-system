import React, { useState, useEffect, useCallback } from 'react';
import { Button, Typography, CircularProgress, Paper, Box } from '@mui/material';
import { POSIntegrationService } from '../services/POSIntegrationService';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../types/userTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { syncDiscounts, fetchLastSyncTime } from '../redux/slices/posDiscountSlice';
import { syncPOSDiscounts } from 'frontend/src/api/discountApi';

const POSDiscountSync: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isSyncing, lastSyncTime, error } = useSelector((state: RootState) => state.posDiscount);
  const { user } = useAuth();

  const posIntegrationService = React.useMemo(
    () => new POSIntegrationService(),
    []
  );

  const fetchLastSync = useCallback(() => {
    if (user && (user as User).clientId) {
      dispatch(fetchLastSyncTime((user as User).clientId));
    }
  }, [user, dispatch]);

  useEffect(() => {
    fetchLastSync();
  }, [fetchLastSync]);

  const handleSync = async () => {
    if (user && (user as User).clientId) {
      dispatch(syncDiscounts((user as User).clientId));
    }
  };

  return (
    <Paper elevation={3}>
      <Box p={2}>
        <Typography variant="h6" gutterBottom>POS Discount Sync</Typography>
        <Typography variant="body1" gutterBottom>
          Last sync: {lastSyncTime ? new Date(lastSyncTime).toLocaleString() : 'Never'}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSync}
          disabled={isSyncing}
          startIcon={isSyncing ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isSyncing ? 'Syncing...' : 'Sync Discounts'}
        </Button>
        {error && <Typography color="error" mt={2}>{error}</Typography>}
      </Box>
    </Paper>
  );
};

export default POSDiscountSync;
