import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { Typography, Button, Grid } from '@mui/material';
import {
  fetchLocations,
  updateLocationStatus,
} from '../redux/slices/locationSlice';
import LocationCard from './LocationCard';
import { Location } from '../types/locationTypes';
import { LocationService } from '../services/LocationService';

const ClientAdminHub: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector((state: RootState) => state.location.locations);
  const loading = useSelector((state: RootState) => state.location.loading);
  const error = useSelector((state: RootState) => state.location.error);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const locationService = new LocationService();

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleStatusUpdate = async (locationId: string, newStatus: string) => {
    try {
      await locationService.updateLocation(locationId, { status: newStatus });
      dispatch(updateLocationStatus({ locationId, status: newStatus }));
    } catch (error) {
      console.error('Failed to update location status:', error);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <Typography variant="h4">Client Admin Hub</Typography>
      <Grid container spacing={2}>
        {locations.map((location) => (
          <Grid item xs={12} sm={6} md={4} key={location.id}>
            <LocationCard location={location} onSelect={handleLocationSelect} />
            <Button onClick={() => handleStatusUpdate(location.id, 'active')}>
              Activate
            </Button>
            <Button onClick={() => handleStatusUpdate(location.id, 'inactive')}>
              Deactivate
            </Button>
          </Grid>
        ))}
      </Grid>
      {selectedLocation && (
        <div>
          <Typography variant="h5">
            Selected Location: {selectedLocation.name}
          </Typography>
          {/* Add more details or actions for the selected location */}
        </div>
      )}
    </div>
  );
};

export default ClientAdminHub;
