import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  fetchLocations,
  setSelectedLocation,
} from '../redux/slices/locationSlice';
import { fetchClients } from '../redux/slices/clientSlice';
import { Location } from '../types/locationTypes';
import { Client } from '../types/clientTypes';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
} from '@mui/material';
import { createLocation, updateLocation, deleteLocation } from '../api/locationApi';

const AdminLocationManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const locations = useSelector((state: RootState) => state.location.locations);
  const clients = useSelector((state: RootState) => state.clients.clients);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  useEffect(() => {
    if (selectedClientId) {
      dispatch(fetchLocations(selectedClientId));
    }
  }, [dispatch, selectedClientId]);

  const handleOpen = (location: Location | null = null) => {
    setCurrentLocation(location);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentLocation(null);
    setOpen(false);
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const locationData = {
      id: currentLocation?.id || '',
      name: formData.get('name') as string,
      address: formData.get('address') as string,
      clientId: formData.get('clientId') as string,
      // Add other relevant fields based on your Location type
    };

    try {
      if (currentLocation) {
        await updateLocation(locationData as Location);
        setSnackbar({ open: true, message: 'Location updated successfully', severity: 'success' });
      } else {
        await createLocation(locationData as Location);
        setSnackbar({ open: true, message: 'Location created successfully', severity: 'success' });
      }
      if (selectedClientId) {
        dispatch(fetchLocations(selectedClientId));
      }
      handleClose();
    } catch (error) {
      console.error('Error saving location:', error);
      setSnackbar({ open: true, message: 'Error saving location', severity: 'error' });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      try {
        await deleteLocation(id);
        if (selectedClientId) {
          dispatch(fetchLocations(selectedClientId));
        }
        setSnackbar({ open: true, message: 'Location deleted successfully', severity: 'success' });
      } catch (error) {
        console.error('Error deleting location:', error);
        setSnackbar({ open: true, message: 'Error deleting location', severity: 'error' });
      }
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Location Management</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Select Client</InputLabel>
        <Select
          value={selectedClientId || ''}
          onChange={(e) => setSelectedClientId(e.target.value as string)}
        >
          {clients.map((client: Client) => (
            <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedClientId && (
        <>
          <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ mb: 2 }}>
            Add New Location
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {locations.map((location: Location) => (
                  <TableRow key={location.id}>
                    <TableCell>{location.name}</TableCell>
                    <TableCell>{location.address}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleOpen(location)}>Edit</Button>
                      <Button onClick={() => handleDelete(location.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

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
            <input type="hidden" name="clientId" value={selectedClientId || ''} />
            {/* Add other relevant fields based on your Location type */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  );
};

export default AdminLocationManagement;
