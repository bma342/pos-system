import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, CircularProgress } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { AppDispatch, RootState } from '../redux/store';
import { syncDiscounts, fetchLastSyncTime } from '../redux/slices/posDiscountSlice';
import { discountApi } from '../api/discountApi';

const POSDiscountSync: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { isSyncing, lastSyncTime, error } = useSelector((state: RootState) => state.posDiscount);

  useEffect(() => {
    if (user?.clientId) {
      dispatch(fetchLastSyncTime(user.clientId));
    }
  }, [dispatch, user]);

  const handleSync = async () => {
    if (user?.clientId) {
      try {
        await dispatch(syncDiscounts(user.clientId)).unwrap();
        await discountApi.syncPOSDiscounts(user.clientId);
      } catch (error) {
        console.error('Error syncing discounts:', error);
      }
    }
  };

  return (
    <div>
      <Typography variant="h6">POS Discount Sync</Typography>
      <Button
        onClick={handleSync}
        disabled={isSyncing}
        variant="contained"
        color="primary"
      >
        {isSyncing ? <CircularProgress size={24} /> : 'Sync Discounts'}
      </Button>
      {lastSyncTime && (
        <Typography variant="body2">
          Last synced: {new Date(lastSyncTime).toLocaleString()}
        </Typography>
      )}
      {error && <Typography color="error">{error}</Typography>}
    </div>
  );
};

export default POSDiscountSync;
