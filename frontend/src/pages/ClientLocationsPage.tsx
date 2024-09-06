import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchLocations } from '../redux/slices/locationSlice';
import LocationCard from '../components/LocationCard';
import { Location } from '../types/locationTypes';
import { Grid, Typography, Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

const ClientLocationsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clientId } = useParams<{ clientId: string }>();
  const { locations, status, error } = useSelector((state: RootState) => state.location);

  useEffect(() => {
    if (clientId) {
      dispatch(fetchLocations(clientId));
    }
  }, [dispatch, clientId]);

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'failed') {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Client Locations
      </Typography>
      <Grid container spacing={3}>
        {locations.map((location: Location) => (
          <Grid item xs={12} sm={6} md={4} key={location.id}>
            <LocationCard location={location} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ClientLocationsPage;
