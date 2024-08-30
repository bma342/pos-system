import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
} from '@mui/material';
import {
  fetchLocations,
  selectLocations,
  selectLocationStatus,
  selectLocationError,
} from '../redux/slices/locationSlice'; // Corrected relative import path
import { Location, RootState, AppDispatch } from '../types';

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
    <List>
      {locations.map((location: Location) => (
        <ListItem key={location.id}>
          <ListItemText
            primary={location.name}
            secondary={`${location.address}, ${location.city}, ${location.state}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default LocationList;
