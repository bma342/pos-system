import React, { useState, useEffect, useCallback } from 'react';
import { Button, Typography, CircularProgress } from '@mui/material';
import { POSIntegrationService } from '../services/POSIntegrationService';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../types/userTypes';

const POSDiscountSync: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const posIntegrationService = React.useMemo(
    () => new POSIntegrationService(),
    []
  );

  const fetchLastSyncTime = useCallback(async () => {
    if (user && (user as User).clientId) {
      try {
        const time = await posIntegrationService.getLastDiscountSyncTime(
          (user as User).clientId
        );
        setLastSyncTime(new Date(time));
      } catch (err) {
        console.error('Failed to fetch last sync time:', err);
        setError('Failed to fetch last sync time. Please try again.');
      }
    }
  }, [user, posIntegrationService]);

  useEffect(() => {
    fetchLastSyncTime();
  }, [fetchLastSyncTime]);

  const handleSync = async () => {
    setIsSyncing(true);
    setError(null);
    try {
      if (user && (user as User).clientId) {
        await posIntegrationService.syncDiscounts((user as User).clientId);
        setLastSyncTime(new Date());
      }
    } catch (err) {
      setError('Failed to sync discounts. Please try again.');
      console.error('Discount sync failed:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div>
      <Typography variant="h6">POS Discount Sync</Typography>
      <Typography>
        Last sync: {lastSyncTime ? lastSyncTime.toLocaleString() : 'Never'}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSync}
        disabled={isSyncing}
      >
        {isSyncing ? <CircularProgress size={24} /> : 'Sync Discounts'}
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </div>
  );
};

export default POSDiscountSync;
