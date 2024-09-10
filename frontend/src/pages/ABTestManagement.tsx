import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  fetchABTests,
  createABTest,
  updateABTest,
} from '../redux/slices/abTestSlice';
import { fetchClients } from '../redux/slices/clientSlice';
import { fetchLocations } from '../redux/slices/locationSlice';
import { ABTest } from '../types/abTestTypes';
import { Client } from '../types/clientTypes';
import { Location } from '../types/locationTypes';
import { useAuth } from '../hooks/useAuth';
import {
  Typography, 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Grid, 
  Paper, 
  Box,
  useMediaQuery,
  useTheme,
  List,
} from '@mui/material';
import { abTestApi } from '../api/abTestApi'; // Import abTestApi object

const LazyABTestItem = lazy(() => import('../components/ABTestItem'));

const ABTestManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tests, status, error } = useSelector(
    (state: RootState) => state.abTest
  );
  const clients = useSelector((state: RootState) => state.clients.clients);
  const locations = useSelector((state: RootState) => state.location.locations);
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [newTest, setNewTest] = useState<Partial<ABTest>>({
    name: '',
    description: '',
    variantA: '',
    variantB: '',
    isActive: false,
    clientId: user?.clientId || '',
    locationId: '',
  });

  useEffect(() => {
    if (user?.clientId) {
      dispatch(fetchABTests({ clientId: user.clientId }));
      dispatch(fetchClients());
      dispatch(fetchLocations(user.clientId));
    }
  }, [dispatch, user]);

  const handleCreateTest = () => {
    if (user?.clientId) {
      dispatch(createABTest({ 
        clientId: user.clientId, 
        locationId: newTest.locationId || '', 
        abTest: newTest as Omit<ABTest, 'id'> 
      }));
      setNewTest({
        name: '',
        description: '',
        variantA: '',
        variantB: '',
        isActive: false,
        clientId: user.clientId,
        locationId: '',
      });
    }
  };

  const handleUpdateTest = (test: ABTest) => {
    if (user?.clientId) {
      dispatch(updateABTest({ 
        clientId: user.clientId, 
        locationId: test.locationId || '', 
        abTestId: test.id, 
        abTest: test 
      }));
    }
  };

  const handleDeleteTest = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this AB test?')) {
      try {
        await abTestApi.deleteABTest(id);
        if (user?.clientId) {
          dispatch(fetchABTests({ clientId: user.clientId }));
        }
      } catch (error) {
        console.error('Error deleting AB test:', error);
      }
    }
  };

  if (status === 'loading') return <Typography>Loading...</Typography>;
  if (status === 'failed') return <Typography>Error: {error}</Typography>;

  return (
    <Box sx={{ padding: isMobile ? 2 : 3 }}>
      <Typography variant="h4" gutterBottom>
        AB Test Management
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2}>
          {/* ... (keep the form fields as they were) ... */}
        </Grid>
        <Button variant="contained" onClick={handleCreateTest} sx={{ marginTop: 2 }}>
          Create Test
        </Button>
      </Paper>
      <List>
        <Suspense fallback={<div>Loading tests...</div>}>
          {tests.map((test: ABTest) => (
            <LazyABTestItem
              key={test.id}
              test={test}
              onUpdate={handleUpdateTest}
              onDelete={handleDeleteTest}
            />
          ))}
        </Suspense>
      </List>
    </Box>
  );
};

export default ABTestManagement;
