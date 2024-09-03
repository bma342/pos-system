import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Grid,
  TextField,
  Container,
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { RootState, AppDispatch } from '../redux/store';
import { fetchLocations } from '../redux/slices/locationSlice';
import { Location } from '../types/locationTypes';
import LocationCard from '../components/LocationCard';
import Button from '@mui/material/Button';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector(
    (state: RootState) => state.location.locations
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const filteredLocations = locations.filter(
    (location: Location) =>
      (location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.city.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (tabValue === 0 || (tabValue === 1 && location.isDropoffSite))
  );

  const mapCenter =
    locations.length > 0
      ? [locations[0].latitude, locations[0].longitude]
      : [0, 0];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleViewMenu = () => {
    navigate('/menu');
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Our Online Ordering Hub
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search locations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        style={{ marginBottom: '1rem' }}
      >
        <Tab label="All Locations" />
        <Tab label="Dropoff Sites" />
      </Tabs>
      <Box sx={{ height: '400px', marginBottom: '2rem' }}>
        <MapContainer
          center={mapCenter as L.LatLngExpression}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MarkerClusterGroup>
            {filteredLocations.map((location) => (
              <Marker
                key={location.id}
                position={[location.latitude, location.longitude]}
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
          </MarkerClusterGroup>
        </MapContainer>
      </Box>
      <Grid container spacing={4}>
        {filteredLocations.map((location: Location) => (
          <Grid item xs={12} sm={6} md={4} key={location.id}>
            <LocationCard location={location} />
          </Grid>
        ))}
      </Grid>
      <Button onClick={handleViewMenu}>View Menu</Button>
    </Container>
  );
};

export default HomePage;
