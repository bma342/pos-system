import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchLocationPOSProfiles } from '../redux/slices/posProfileSlice';
import { useSelectedLocation } from '../hooks/useSelectedLocation';
import { Typography, CircularProgress, Box, List, ListItem, ListItemText, Button } from '@mui/material';

const PosProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedLocation } = useSelectedLocation();
  const posProfileState = useSelector((state: RootState) => state.posProfile);
  const loading = posProfileState.status === 'loading';
  const error = posProfileState.error;

  useEffect(() => {
    if (selectedLocation) {
      dispatch(fetchLocationPOSProfiles(selectedLocation.id));
    }
  }, [dispatch, selectedLocation]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h2" gutterBottom>POS Profiles for {selectedLocation?.name}</Typography>
      {posProfileState.profiles.length === 0 ? (
        <Typography>No POS profiles found for this location.</Typography>
      ) : (
        <List>
          {posProfileState.profiles.map((profile) => (
            <ListItem key={profile.id}>
              <ListItemText 
                primary={profile.name} 
                secondary={`Type: ${profile.posType}, Active: ${profile.active ? 'Yes' : 'No'}`} 
              />
              <Button variant="outlined" onClick={() => {/* Handle edit */}}>Edit</Button>
            </ListItem>
          ))}
        </List>
      )}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => {/* Handle add new profile */}}
        style={{ marginTop: '20px' }}
      >
        Add New POS Profile
      </Button>
    </Box>
  );
};

export default PosProfilePage;