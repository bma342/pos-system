import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { updatePOSSettings, POSSettings } from '../redux/slices/posSettingsSlice';
import { FormControl, InputLabel, Select, MenuItem, Box, Button } from '@mui/material';

interface POSSettingsFormProps {
  locationId: string;
  initialSettings: POSSettings;
}

const POSSettingsForm: React.FC<POSSettingsFormProps> = ({ locationId, initialSettings }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [modifierSendMethod, setModifierSendMethod] = useState(initialSettings.modifierSendMethod);

  useEffect(() => {
    setModifierSendMethod(initialSettings.modifierSendMethod);
  }, [initialSettings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updatePOSSettings({ locationId, settings: { modifierSendMethod } }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="modifier-send-method-label">Modifier Send Method</InputLabel>
        <Select
          labelId="modifier-send-method-label"
          value={modifierSendMethod}
          onChange={(e) => setModifierSendMethod(e.target.value as string)}
        >
          <MenuItem value="individual">Individual</MenuItem>
          <MenuItem value="grouped">Grouped</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Save Settings
      </Button>
    </Box>
  );
};

export default POSSettingsForm;
