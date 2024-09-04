import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { POSAlert } from '../types';
import { fetchPOSAlerts } from '../redux/slices/posAlertsSlice';
import { Typography, List, ListItem, ListItemText, Paper, Box } from '@mui/material';

const POSAlerts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { alerts, status, error } = useSelector((state: RootState) => state.posAlerts);
  const posProfiles = useSelector((state: RootState) => state.posProfiles.profiles);

  useEffect(() => {
    dispatch(fetchPOSAlerts());
  }, [dispatch]);

  const getAlertSeverity = (errorCode: string, posProfileId: number) => {
    const profile = posProfiles.find((p) => p.id === posProfileId);
    if (!profile) return 'unknown';

    switch (profile.provider) {
      case 'Toast':
        return errorCode.startsWith('E') ? 'high' : 'medium';
      case 'Revel':
        return errorCode.startsWith('ERR') ? 'high' : 'low';
      default:
        return 'unknown';
    }
  };

  if (status === 'loading') {
    return <Typography>Loading POS alerts...</Typography>;
  }

  if (status === 'failed') {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Paper elevation={3}>
      <Box p={2}>
        <Typography variant="h5" gutterBottom>POS Alerts</Typography>
        {alerts.length === 0 ? (
          <Typography>No active alerts</Typography>
        ) : (
          <List>
            {alerts.map((alert) => (
              <ListItem
                key={alert.id}
                sx={{
                  bgcolor: getAlertSeverity(alert.errorCode, alert.posProfileId) === 'high' ? 'error.light' :
                    getAlertSeverity(alert.errorCode, alert.posProfileId) === 'medium' ? 'warning.light' : 'info.light',
                  mb: 1,
                  borderRadius: 1,
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">
                      <strong>{alert.errorCode}</strong>: {alert.message}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" component="span">
                        POS Profile: {posProfiles.find((p) => p.id === alert.posProfileId)?.name}
                      </Typography>
                      <br />
                      <Typography variant="body2" component="span">
                        Time: {new Date(alert.timestamp).toLocaleString()}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Paper>
  );
};

export default POSAlerts;
