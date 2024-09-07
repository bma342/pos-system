import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { fetchClients, addClient, updateClient, deleteClient, selectAllClients } from '../redux/slices/clientSlice';
import { Client } from '../types';

const ClientManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const clients = useAppSelector(selectAllClients);
  const [open, setOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const handleOpen = (client: Client | null = null) => {
    setCurrentClient(client);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentClient(null);
    setOpen(false);
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const clientData = {
      id: currentClient?.id || '',
      name: formData.get('name') as string,
      subdomain: formData.get('subdomain') as string,
      // Add other relevant fields
    };

    if (currentClient) {
      dispatch(updateClient(clientData));
    } else {
      dispatch(addClient(clientData));
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      dispatch(deleteClient(id));
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Client Management</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ mb: 2 }}>
        Add New Client
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Subdomain</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.subdomain}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(client)}>Edit</Button>
                  <Button onClick={() => handleDelete(client.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentClient ? 'Edit Client' : 'Add New Client'}</DialogTitle>
        <form onSubmit={handleSave}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Client Name"
              type="text"
              fullWidth
              defaultValue={currentClient?.name || ''}
            />
            <TextField
              margin="dense"
              name="subdomain"
              label="Subdomain"
              type="text"
              fullWidth
              defaultValue={currentClient?.subdomain || ''}
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

export default ClientManagement;