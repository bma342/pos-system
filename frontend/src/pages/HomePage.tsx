import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchLocations } from '../redux/slices/locationSlice';
import { Location } from '../types/locationTypes';
import { Typography, TextField, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { selectCurrentUser } from '../redux/slices/authSlice';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector((state: RootState) => state.location.locations);
  const loading = useSelector((state: RootState) => state.location.status === 'loading');
  const error = useSelector((state: RootState) => state.location.error);
  const currentUser = useSelector(selectCurrentUser);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (currentUser?.clientId) {
      dispatch(fetchLocations(currentUser.clientId));
    }
  }, [dispatch, currentUser]);

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (location.city && location.city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const mapCenter = locations.length > 0 && locations[0].latitude && locations[0].longitude
    ? [locations[0].latitude, locations[0].longitude]
    : [0, 0];

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>Our Locations</Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search locations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {filteredLocations.map((location: Location) => (
            <Card key={location.id} style={{ marginBottom: '1rem' }}>
              <CardContent>
                <Typography variant="h6">{location.name}</Typography>
                <Typography variant="body2">{location.address}</Typography>
                {location.city && (
                  <Typography variant="body2">
                    {location.city}, {location.state} {location.zipCode}
                  </Typography>
                )}
                {location.isDropoffSite && (
                  <Typography variant="body2" color="primary">
                    Dropoff Site Available
                  </Typography>
                )}
                <Button variant="contained" color="primary" style={{ marginTop: '0.5rem' }}>
                  Order Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          <MapContainer center={mapCenter as [number, number]} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredLocations.map((location: Location) => (
              <Marker
                key={location.id}
                position={[location.latitude || 0, location.longitude || 0]}
              >
                <Popup>
                  <Typography variant="h6">{location.name}</Typography>
                  <Typography variant="body2">{location.address}</Typography>
                  {location.isDropoffSite && (
                    <Typography variant="body2" color="primary">
                      Dropoff Site Available
                    </Typography>
                  )}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
