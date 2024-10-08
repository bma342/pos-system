import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Container,
} from '@mui/material';
import { RootState, AppDispatch } from '../redux/store';
import { fetchLocations } from '../redux/slices/locationSlice';
import { Location } from '../types/locationTypes'; // Ensure correct import
import { getClientIdFromSubdomain } from '../utils/clientIdUtil';

const GuestLandingPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector((state: RootState) => state.location.locations);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const clientId = getClientIdFromSubdomain();
    dispatch(fetchLocations(clientId)); // Pass the derived clientId as a string
  }, [dispatch]);

  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (location.city && location.city.toLowerCase().includes(searchTerm.toLowerCase())) // Check if city is defined
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" gutterBottom>
        Order from our locations
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search locations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '2rem' }}
      />
      <Grid container spacing={4}>
        {filteredLocations.map((location: Location) => (
          <Grid item xs={12} sm={6} md={4} key={location.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={location.imageUrl || 'https://via.placeholder.com/300x140'}
                alt={location.name}
              />
              <CardContent>
                <Typography variant="h6">{location.name}</Typography>
                <Typography>{location.address}</Typography>
                <Typography>{`${location.city}, ${location.state} ${location.zipCode}`}</Typography>
                <Button
                  component={Link}
                  to={`/order/${location.id}`}
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '1rem' }}
                >
                  Order Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GuestLandingPage;
