import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { DropOffLocationService } from '../services/DropOffLocationService';
import { DropOffLocation } from '../types/locationTypes';
import { fetchDropOffLocations } from 'frontend/src/api/locationApi';

const DropOffLocationManager: React.FC = () => {
  const [locations, setLocations] = useState<DropOffLocation[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingLocation, setEditingLocation] = useState<DropOffLocation | null>(null);
  const [newLocation, setNewLocation] = useState<Partial<DropOffLocation>>({
    name: '',
    address: '',
    latitude: 0,
    longitude: 0,
  });

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
    setEditingLocation(location);
    setNewLocation(location);
    setOpenDialog(true);
  };

  const handleDelete = async (locationId: string) => {
    try {
      await dropOffLocationService.deleteDropOffLocation(locationId);
      fetchLocations();
    } catch (error) {
      console.error('Failed to delete drop-off location:', error);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditingLocation(null);
    setNewLocation({
      name: '',
      address: '',
      latitude: 0,
      longitude: 0,
    });
  };

  const handleSave = async () => {
    try {
      if (editingLocation) {
        await dropOffLocationService.updateDropOffLocation(editingLocation.id, newLocation as DropOffLocation);
      } else {
        await dropOffLocationService.createDropOffLocation(newLocation as DropOffLocation);
      }
      fetchLocations();
      handleDialogClose();
    } catch (error) {
      console.error('Failed to save drop-off location:', error);
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
      <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
        Add New Location
      </Button>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{editingLocation ? 'Edit Location' : 'Add New Location'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={newLocation.name}
            onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Address"
            fullWidth
            value={newLocation.address}
            onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Latitude"
            fullWidth
            type="number"
            value={newLocation.latitude}
            onChange={(e) => setNewLocation({ ...newLocation, latitude: parseFloat(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Longitude"
            fullWidth
            type="number"
            value={newLocation.longitude}
            onChange={(e) => setNewLocation({ ...newLocation, longitude: parseFloat(e.target.value) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DropOffLocationManager;
