import React, { useEffect, useState } from 'react';
import { Typography, Grid, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchClients } from '../../redux/slices/clientSlice';
import {
  dashboardService,
  DashboardData,
} from '../../services/dashboardService';
import 'jspdf-autotable';

const ExecutiveDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedClientId, setSelectedClientId] = useState<string | 'all'>(
    'all'
  );
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isGlobalAdmin) {
      dispatch(fetchClients());
    }
    if (authToken) {
      dashboardService.setAuthToken(authToken);
    }
  }, [dispatch, isGlobalAdmin, authToken]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const data = await dashboardService.getDashboardData(selectedClientId);
        if (selectedClientId !== 'all') {
          const locationData =
            await dashboardService.getLocationData(selectedClientId);
          data.totalLocations = locationData.totalLocations;
        }
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [selectedClientId]);

  const handleRefresh = () => {
    fetchDashboardData();
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!dashboardData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div role="main" aria-label="Executive Dashboard">
      <h1 tabIndex={0}>Executive Dashboard</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          {/* Dashboard item */}
        </Grid>
        {/* ... more grid items ... */}
      </Grid>
      <button aria-label="Refresh dashboard data" onClick={handleRefresh}>
        Refresh
      </button>
    </div>
  );
};

export default ExecutiveDashboard;
