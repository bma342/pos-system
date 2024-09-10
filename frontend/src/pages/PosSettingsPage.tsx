import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Typography, Box } from '@mui/material';
import POSSettingsForm from '../components/POSSettingsForm';

const PosSettingsPage: React.FC = () => {
  const selectedLocationId = useSelector((state: RootState) => state.location.selectedLocation);
  const locations = useSelector((state: RootState) => state.location.locations);
  const selectedLocation = locations.find(loc => loc.id === selectedLocationId);
  const posSettings = useSelector((state: RootState) => 
    selectedLocationId ? state.posSettings.settings[selectedLocationId] : null
  );

  if (!selectedLocationId) {
    return <Typography>Please select a location</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        POS Settings for {selectedLocation ? selectedLocation.name : `Location ID: ${selectedLocationId}`}
      </Typography>
      {posSettings ? (
        <POSSettingsForm locationId={selectedLocationId} initialSettings={posSettings} />
      ) : (
        <Typography>Loading POS settings...</Typography>
      )}
    </Box>
  );
};

export default PosSettingsPage;