import React, { useState, useEffect, useMemo } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { SettingsService } from '../../services/SettingsService';
import { useAuth } from '../../contexts/AuthContext';
import { Settings } from '../../types/settingsTypes';

const SettingsManager: React.FC = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const settingsService = useMemo(() => new SettingsService(), []);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const fetchedSettings = await settingsService.getSettings(
          user.clientId
        );
        setSettings(fetchedSettings);
        setError(null);
      } catch (err) {
        setError('Failed to fetch settings');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [settingsService, user.clientId]);

  const handleSettingChange = (
    key: keyof Settings,
    value: string | number | boolean
  ) => {
    if (settings) {
      setSettings({ ...settings, [key]: value });
    }
  };

  const handleSaveSettings = async () => {
    if (settings) {
      try {
        await settingsService.updateSettings(user.clientId, settings);
        setError(null);
      } catch (err) {
        setError('Failed to save settings');
        console.error(err);
      }
    }
  };

  if (isLoading) return <Typography>Loading settings...</Typography>;
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
      <Button variant="contained" color="primary" onClick={handleSaveSettings}>
        Save Settings
      </Button>
    </Box>
  );
};

export default SettingsManager;
