import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchPOSAlerts, POSAlert } from '../redux/slices/posAlertsSlice';
import { useAuth } from '../hooks/useAuth';
import { Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

const POSAlerts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { alerts, status, error } = useSelector((state: RootState) => state.posAlerts);
  const posProfiles = useSelector((state: RootState) => state.posIntegration.profiles);

  useEffect(() => {
    if (user?.clientId) {
      dispatch(fetchPOSAlerts(user.clientId));
    }
  }, [dispatch, user]);

  const getProfileName = (posProfileId: string) => {
    const profile = posProfiles.find((p) => p.id === posProfileId);
    return profile ? profile.name : 'Unknown Profile';
  };

  if (status === 'loading') return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        POS Alerts
      </Typography>
      {alerts.length === 0 ? (
        <Typography>No alerts at this time.</Typography>
      ) : (
        <List>
          {alerts.map((alert: POSAlert) => (
            <ListItem key={alert.id}>
              <ListItemText
                primary={alert.message}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textPrimary">
                      Severity: {alert.severity}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="textPrimary">
                      POS Profile: {getProfileName(alert.posProfileId)}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="textSecondary">
                      Created: {new Date(alert.createdAt).toLocaleString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default POSAlerts;
