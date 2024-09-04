import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Box,
  Button,
} from '@mui/material';
import {
  fetchLocations,
  selectLocations,
  selectLocationStatus,
  selectLocationError,
} from '../redux/slices/locationSlice';
import { Location, RootState, AppDispatch } from '../types';
import { Link } from 'react-router-dom';

const LocationList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector((state: RootState) => selectLocations(state));
  const status = useSelector((state: RootState) => selectLocationStatus(state));
  const error = useSelector((state: RootState) => selectLocationError(state));

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLocations());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'failed') {
    return (
      <Typography color="error">Failed to load locations: {error}</Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h2">Locations</Typography>
      <List>
        {locations.map((location: Location) => (
          <ListItem key={location.id}>
            <ListItemText
              primary={location.name}
              secondary={`${location.address}, ${location.city}, ${location.state} ${location.zipCode}`}
            />
            <Button component={Link} to={`/locations/${location.id}`} variant="outlined">
              View Details
            </Button>
          </ListItem>
        ))}
      </List>
      <Button component={Link} to="/locations/new" variant="contained" color="primary">
        Add New Location
      </Button>
    </Box>
  );
};

export default LocationList;
