import React, { useEffect, Suspense, lazy } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { fetchClientConfig, selectClientConfig, selectClientConfigStatus, selectClientConfigError } from '../redux/slices/clientConfigSlice';
import { Box, Typography, Paper, CircularProgress, Alert, Tabs, Tab } from '@mui/material';
import { selectUserRole } from '../redux/slices/authSlice';
import { UserRole } from '../types/userTypes'; // Import UserRole from types

const ClientManagement = lazy(() => import('../components/ClientManagement'));
const LocationManagement = lazy(() => import('../components/LocationManagement'));
const ReportingDashboard = lazy(() => import('../components/ReportingDashboard'));

const AdminPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const clientConfig = useAppSelector(selectClientConfig);
  const status = useAppSelector(selectClientConfigStatus);
  const error = useAppSelector(selectClientConfigError);
  const userRole = useAppSelector(selectUserRole);
  const [tabValue, setTabValue] = React.useState(0);

  const isGlobalAdmin = userRole === UserRole.GLOBAL_ADMIN;

  useEffect(() => {
    if (isGlobalAdmin) {
      dispatch(fetchClientConfig('global'));
    }
  }, [dispatch, isGlobalAdmin]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box component={Paper} elevation={3} sx={{ p: 3, m: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {isGlobalAdmin ? 'Global Admin Panel' : 'Admin Panel'}
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Client Config" />
        <Tab label="Client Management" />
        <Tab label="Location Management" />
        <Tab label="Reporting" />
      </Tabs>
      {tabValue === 0 && (
        <>
          {status === 'loading' && <CircularProgress />}
          {status === 'failed' && <Alert severity="error">Error: {error}</Alert>}
          {status === 'succeeded' && clientConfig && (
            <Box>
              <Typography variant="h6" gutterBottom>Client Configuration</Typography>
              <Box component="pre" sx={{ 
                backgroundColor: 'grey.100', 
                p: 2, 
                borderRadius: 1,
                overflow: 'auto',
                maxHeight: '400px'
              }}>
                {JSON.stringify(clientConfig, null, 2)}
              </Box>
            </Box>
          )}
        </>
      )}
      <Suspense fallback={<CircularProgress />}>
        {tabValue === 1 && <ClientManagement />}
        {tabValue === 2 && <LocationManagement />}
        {tabValue === 3 && <ReportingDashboard />}
      </Suspense>
    </Box>
  );
};

export default AdminPanel;
