import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  fetchABTests,
  createABTest,
  updateABTest,
  deleteABTest,
} from '../redux/slices/abTestSlice';
import { ABTest, Client, Location } from '../types';
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
  const clients = useSelector((state: RootState) => state.clients.clients);
  const locations = useSelector(
    (state: RootState) => state.locations.locations
  );
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
    dispatch(fetchABTests());
  }, [dispatch]);

  const handleCreateTest = () => {
    dispatch(createABTest(newTest));
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
    dispatch(updateABTest(test));
  };

  const handleDeleteTest = (id: number) => {
    if (window.confirm('Are you sure you want to delete this AB test?')) {
      dispatch(deleteABTest(id));
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
          onChange={(e) =>
            setNewTest({ ...newTest, description: e.target.value })
          }
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
        <Switch
          checked={newTest.isActive}
          onChange={(e) =>
            setNewTest({ ...newTest, isActive: e.target.checked })
          }
        />
        <Select
          value={newTest.clientId}
          onChange={(e) =>
            setNewTest({ ...newTest, clientId: e.target.value as number })
          }
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
          onChange={(e) =>
            setNewTest({ ...newTest, locationId: e.target.value as number })
          }
          sx={{ marginRight: 1 }}
        >
          {locations.map((location: Location) => (
            <MenuItem key={location.id} value={location.id}>
              {location.name}
            </MenuItem>
          ))}
        </Select>
        <Button onClick={handleCreateTest} variant="contained">
          Add AB Test
        </Button>
      </Box>

      <List>
        {tests.map((test) => (
          <ListItem key={test.id}>
            <TextField
              value={test.name}
              onChange={(e) =>
                handleUpdateTest({ ...test, name: e.target.value })
              }
              sx={{ marginRight: 1 }}
            />
            <TextField
              value={test.description}
              onChange={(e) =>
                handleUpdateTest({ ...test, description: e.target.value })
              }
              sx={{ marginRight: 1 }}
            />
            <TextField
              value={test.variantA}
              onChange={(e) =>
                handleUpdateTest({ ...test, variantA: e.target.value })
              }
              sx={{ marginRight: 1 }}
            />
            <TextField
              value={test.variantB}
              onChange={(e) =>
                handleUpdateTest({ ...test, variantB: e.target.value })
              }
              sx={{ marginRight: 1 }}
            />
            <Switch
              checked={test.isActive}
              onChange={(e) =>
                handleUpdateTest({ ...test, isActive: e.target.checked })
              }
            />
            <Select
              value={test.clientId}
              onChange={(e) =>
                handleUpdateTest({
                  ...test,
                  clientId: e.target.value as number,
                })
              }
              sx={{ marginRight: 1 }}
            >
              {clients.map((client: Client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.name}
                </MenuItem>
              ))}
            </Select>
            <Select
              value={test.locationId}
              onChange={(e) =>
                handleUpdateTest({
                  ...test,
                  locationId: e.target.value as number,
                })
              }
              sx={{ marginRight: 1 }}
            >
              {locations.map((location: Location) => (
                <MenuItem key={location.id} value={location.id}>
                  {location.name}
                </MenuItem>
              ))}
            </Select>
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
