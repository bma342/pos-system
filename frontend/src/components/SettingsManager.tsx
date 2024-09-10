import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { Settings } from '../types/settingsTypes';
import { fetchSettings, updateSettings } from '../redux/slices/settingsSlice';
import { RootState, AppDispatch } from '../redux/store';

const SettingsManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: settings, loading, error } = useSelector((state: RootState) => state.settings);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.clientId) {
      dispatch(fetchSettings(user.clientId));
    }
  }, [dispatch, user]);

  const handleSettingChange = (
    key: keyof Settings,
    value: string | number | boolean
  ) => {
    if (settings && user?.clientId) {
      dispatch(updateSettings({ 
        clientId: user.clientId, 
        settings: { ...settings, [key]: value } 
      }));
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!settings) return <Typography>No settings found</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings Manager
      </Typography>
      {Object.entries(settings).map(([key, value]) => (
        <TextField
          key={key}
          label={key}
          value={value}
          onChange={(e) =>
            handleSettingChange(key as keyof Settings, e.target.value)
          }
          fullWidth
          margin="normal"
        />
      ))}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => {
          if (user?.clientId && settings) {
            dispatch(updateSettings({ clientId: user.clientId, settings }));
          }
        }}
      >
        Save Settings
      </Button>
    </Box>
  );
};

export default SettingsManager;
