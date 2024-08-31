import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { DropOffLocationService } from '../services/DropOffLocationService';
import { DropOffLocation } from '../types/locationTypes';

const DropOffLocationManager: React.FC = () => {
  const [locations, setLocations] = useState<DropOffLocation[]>([]);
  const dropOffLocationService = useMemo(
    () => new DropOffLocationService(),
    []
  );

  const fetchLocations = useCallback(async () => {
    try {
      const fetchedLocations =
        await dropOffLocationService.getDropOffLocations();
      setLocations(fetchedLocations);
    } catch (error) {
      console.error('Failed to fetch drop-off locations:', error);
    }
  }, [dropOffLocationService]);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const handleEdit = (location: DropOffLocation) => {
    // Implement edit functionality
    console.log('Editing location:', location);
  };

  const handleDelete = async (locationId: string) => {
    try {
      await dropOffLocationService.deleteDropOffLocation(locationId);
      fetchLocations();
    } catch (error) {
      console.error('Failed to delete drop-off location:', error);
    }
  };

  return (
    <div>
      <Typography variant="h6">Drop-off Locations</Typography>
      <List>
        {locations.map((location) => (
          <ListItem key={location.id}>
            <ListItemText
              primary={location.name}
              secondary={location.address}
            />
            <IconButton onClick={() => handleEdit(location)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(location.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary">
        Add New Location
      </Button>
    </div>
  );
};

export default DropOffLocationManager;
