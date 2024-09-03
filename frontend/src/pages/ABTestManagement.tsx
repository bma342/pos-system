import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  fetchABTestsAsync,
  createABTestAsync,
  updateABTestAsync,
  deleteABTestAsync,
} from '../redux/slices/abTestSlice';
import { fetchClientsAsync } from '../redux/slices/clientSlice';
import { fetchLocationsAsync } from '../redux/slices/locationSlice';
import { ABTest } from '../types/abTestTypes';
import { Client } from '../types/clientTypes';
import { Location } from '../types/locationTypes';
import {
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Typography,
  Box,
  Switch,
  Select,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ABTestManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tests, status, error } = useSelector(
    (state: RootState) => state.abTest
  );
  const clients = useSelector((state: RootState) => state.client.clients);
  const locations = useSelector((state: RootState) => state.location.locations);
  const [newTest, setNewTest] = useState<Partial<ABTest>>({
    name: '',
    description: '',
    variantA: '',
    variantB: '',
    isActive: false,
    clientId: 0,
    locationId: 0,
  });

  useEffect(() => {
    dispatch(fetchABTestsAsync());
    dispatch(fetchClientsAsync());
    dispatch(fetchLocationsAsync());
  }, [dispatch]);

  const handleCreateTest = () => {
    dispatch(createABTestAsync(newTest as ABTest));
    setNewTest({
      name: '',
      description: '',
      variantA: '',
      variantB: '',
      isActive: false,
      clientId: 0,
      locationId: 0,
    });
  };

  const handleUpdateTest = (test: ABTest) => {
    dispatch(updateABTestAsync(test));
  };

  const handleDeleteTest = (id: number) => {
    if (window.confirm('Are you sure you want to delete this AB test?')) {
      dispatch(deleteABTestAsync(id));
    }
  };

  if (status === 'loading') return <Typography>Loading...</Typography>;
  if (status === 'failed') return <Typography>Error: {error}</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        AB Test Management
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Test Name"
          value={newTest.name}
          onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
          sx={{ marginRight: 1 }}
        />
        <TextField
          label="Description"
          value={newTest.description}
          onChange={(e) => setNewTest({ ...newTest, description: e.target.value })}
          sx={{ marginRight: 1 }}
        />
        <TextField
          label="Variant A"
          value={newTest.variantA}
          onChange={(e) => setNewTest({ ...newTest, variantA: e.target.value })}
          sx={{ marginRight: 1 }}
        />
        <TextField
          label="Variant B"
          value={newTest.variantB}
          onChange={(e) => setNewTest({ ...newTest, variantB: e.target.value })}
          sx={{ marginRight: 1 }}
        />
        <Select
          value={newTest.clientId}
          onChange={(e) => setNewTest({ ...newTest, clientId: e.target.value as number })}
          sx={{ marginRight: 1 }}
        >
          {clients.map((client: Client) => (
            <MenuItem key={client.id} value={client.id}>
              {client.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={newTest.locationId}
          onChange={(e) => setNewTest({ ...newTest, locationId: e.target.value as number })}
          sx={{ marginRight: 1 }}
        >
          {locations.map((location: Location) => (
            <MenuItem key={location.id} value={location.id}>
              {location.name}
            </MenuItem>
          ))}
        </Select>
        <Switch
          checked={newTest.isActive}
          onChange={(e) => setNewTest({ ...newTest, isActive: e.target.checked })}
        />
        <Button variant="contained" onClick={handleCreateTest}>
          Create Test
        </Button>
      </Box>
      <List>
        {tests.map((test: ABTest) => (
          <ListItem key={test.id}>
            <TextField
              value={test.name}
              onChange={(e) => handleUpdateTest({ ...test, name: e.target.value })}
            />
            <TextField
              value={test.description}
              onChange={(e) => handleUpdateTest({ ...test, description: e.target.value })}
            />
            <TextField
              value={test.variantA}
              onChange={(e) => handleUpdateTest({ ...test, variantA: e.target.value })}
            />
            <TextField
              value={test.variantB}
              onChange={(e) => handleUpdateTest({ ...test, variantB: e.target.value })}
            />
            <Switch
              checked={test.isActive}
              onChange={(e) => handleUpdateTest({ ...test, isActive: e.target.checked })}
            />
            <IconButton onClick={() => handleDeleteTest(test.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ABTestManagement;
