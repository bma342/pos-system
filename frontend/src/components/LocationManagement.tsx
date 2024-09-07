import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { fetchLocations, addLocation, updateLocation, deleteLocation, selectAllLocations } from '../redux/slices/locationSlice';
import { fetchClients, selectAllClients } from '../redux/slices/clientSlice';
import { Location, Client } from '../types';

const LocationManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const locations = useAppSelector(selectAllLocations);
  const clients = useAppSelector(selectAllClients);
  const [open, setOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

  useEffect(() => {
    dispatch(fetchLocations());
    dispatch(fetchClients());
  }, [dispatch]);

  const handleOpen = (location: Location | null = null) => {
    setCurrentLocation(location);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentLocation(null);
    setOpen(false);
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const locationData = {
      id: currentLocation?.id || '',
      name: formData.get('name') as string,
      address: formData.get('address') as string,
      clientId: formData.get('clientId') as string,
      posProfile: formData.get('posProfile') as string,
      // Add other relevant fields
    };

    if (currentLocation) {
      dispatch(updateLocation(locationData));
    } else {
      dispatch(addLocation(locationData));
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      dispatch(deleteLocation(id));
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Location Management</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ mb: 2 }}>
        Add New Location
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>POS Profile</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map((location) => (
              <TableRow key={location.id}>
                <TableCell>{location.name}</TableCell>
                <TableCell>{location.address}</TableCell>
                <TableCell>{clients.find(c => c.id === location.clientId)?.name}</TableCell>
                <TableCell>{location.posProfile}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(location)}>Edit</Button>
                  <Button onClick={() => handleDelete(location.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentLocation ? 'Edit Location' : 'Add New Location'}</DialogTitle>
        <form onSubmit={handleSave}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Location Name"
              type="text"
              fullWidth
              defaultValue={currentLocation?.name || ''}
            />
            <TextField
              margin="dense"
              name="address"
              label="Address"
              type="text"
              fullWidth
              defaultValue={currentLocation?.address || ''}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Client</InputLabel>
              <Select
                name="clientId"
                defaultValue={currentLocation?.clientId || ''}
              >
                {clients.map((client) => (
                  <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="posProfile"
              label="POS Profile"
              type="text"
              fullWidth
              defaultValue={currentLocation?.posProfile || ''}
            />
            {/* Add other relevant fields */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default LocationManagement;