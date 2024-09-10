import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchLocations } from '../redux/slices/locationSlice';
import { Location } from '../types/locationTypes';
import { Card, TextField, CircularProgress, Typography, Grid } from '@mui/material';
import { Map, Marker } from 'react-map-gl';
import { useAuth } from '../hooks/useAuth';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const locations = useSelector((state: RootState) => state.location.locations);
  const loading = useSelector((state: RootState) => state.location.loading);
  const error = useSelector((state: RootState) => state.location.error);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user?.clientId) {
      dispatch(fetchLocations(user.clientId));
    }
  }, [dispatch, user]);

  const filteredLocations = locations.filter((location: Location) =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (location.city && location.city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const mapCenter = locations.length > 0 && locations[0].latitude && locations[0].longitude
    ? [locations[0].longitude, locations[0].latitude]
    : [-98.5795, 39.8283]; // Center of USA

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Search locations"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          margin="normal"
          aria-label="Search locations"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        {filteredLocations.map((location: Location) => (
          <LazyLoadComponent key={location.id}>
            <Card style={{ marginBottom: 'var(--spacing-md)' }}>
              <Typography variant="h6">{location.name}</Typography>
              <Typography>{location.address}</Typography>
              <Typography>{`${location.city}, ${location.state} ${location.zipCode}`}</Typography>
            </Card>
          </LazyLoadComponent>
        ))}
      </Grid>
      <Grid item xs={12} md={6}>
        <Map
          initialViewState={{
            longitude: mapCenter[0],
            latitude: mapCenter[1],
            zoom: 3
          }}
          style={{width: '100%', height: 400}}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          {filteredLocations.map((location: Location) => (
            <Marker
              key={location.id}
              longitude={location.longitude}
              latitude={location.latitude}
              anchor="bottom"
            >
              <img src="/marker.png" alt={location.name} />
            </Marker>
          ))}
        </Map>
      </Grid>
    </Grid>
  );
};

export default HomePage;
