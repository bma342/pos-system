import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchLocations } from '../redux/slices/locationSlice';
import { Location } from '../types/locationTypes';
import { Grid, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

const ClientLocationsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { locations, loading, error } = useSelector((state: RootState) => state.location);

  useEffect(() => {
    if (user?.clientId) {
      dispatch(fetchLocations(user.clientId));
    }
  }, [dispatch, user]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Grid container spacing={2}>
      {locations.map((location: Location) => (
        <Grid item xs={12} sm={6} md={4} key={location.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{location.name}</Typography>
              <Typography>{location.address}</Typography>
              <Typography>{`${location.city}, ${location.state} ${location.zipCode}`}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ClientLocationsPage;
