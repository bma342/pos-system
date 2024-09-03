import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  fetchClients,
  createClient,
  updateClient,
  deleteClient,
} from '../redux/slices/clientSlice';
import { Client } from '../types/clientTypes';
import {
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Typography,
  Box,
  Switch,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const GlobalAdminPanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clients, status, error } = useSelector(
    (state: RootState) => state.client
  );
  const [newClient, setNewClient] = useState<Partial<Client>>({
    name: '',
    subdomain: '',
    active: true,
  });

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const handleCreateClient = () => {
    dispatch(createClient(newClient));
    setNewClient({ name: '', subdomain: '', active: true });
  };

  const handleUpdateClient = (client: Client) => {
    dispatch(updateClient(client));
  };

  const handleDeleteClient = (id: string) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      dispatch(deleteClient(id));
    }
  };

  if (status === 'loading') return <Typography>Loading...</Typography>;
  if (status === 'failed') return <Typography>Error: {error}</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Global Admin Panel
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Client Name"
          value={newClient.name}
          onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
          sx={{ marginRight: 1 }}
        />
        <TextField
          label="Subdomain"
          value={newClient.subdomain}
          onChange={(e) =>
            setNewClient({ ...newClient, subdomain: e.target.value })
          }
          sx={{ marginRight: 1 }}
        />
        <Switch
          checked={newClient.active}
          onChange={(e) =>
            setNewClient({ ...newClient, active: e.target.checked })
          }
        />
        <Button onClick={handleCreateClient} variant="contained">
          Add Client
        </Button>
      </Box>

      <List>
        {clients.map((client) => (
          <ListItem key={client.id}>
            <TextField
              value={client.name}
              onChange={(e) =>
                handleUpdateClient({ ...client, name: e.target.value })
              }
              sx={{ marginRight: 1 }}
            />
            <TextField
              value={client.subdomain}
              onChange={(e) =>
                handleUpdateClient({ ...client, subdomain: e.target.value })
              }
              sx={{ marginRight: 1 }}
            />
            <Switch
              checked={client.active}
              onChange={(e) =>
                handleUpdateClient({ ...client, active: e.target.checked })
              }
              sx={{ marginRight: 1 }}
            />
            <IconButton onClick={() => handleDeleteClient(client.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GlobalAdminPanel;
