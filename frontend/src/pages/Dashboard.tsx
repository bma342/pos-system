import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchDashboardData } from '../redux/slices/dashboardSlice';
import { selectCurrentUser, selectSelectedLocation } from '../redux/slices/userSlice';
import { 
  Typography, 
  Grid, 
  Paper, 
  CircularProgress, 
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { DashboardData, DateRange } from '../types/dashboardTypes';

const LazyChart = lazy(() => import('../components/LazyChart'));

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data, loading, error } = useSelector((state: RootState) => state.dashboard);
  const user = useSelector(selectCurrentUser);
  const selectedLocation = useSelector(selectSelectedLocation);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)), // Last 30 days
    endDate: new Date()
  });

  useEffect(() => {
    if (user?.clientId && selectedLocation) {
      dispatch(fetchDashboardData({ 
        clientId: user.clientId, 
        locationId: selectedLocation,
        dateRange: dateRange
      }));
    }
  }, [dispatch, user, selectedLocation, dateRange]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Typography>No data available</Typography>;

  return (
    <Box 
      className="dashboard" 
      sx={{ 
        padding: isMobile ? 2 : 4,
        backgroundColor: 'var(--background-color)',
        color: 'var(--text-color)'
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, backgroundColor: 'var(--card-background)' }}>
            <Typography variant="h6">Total Orders</Typography>
            <Typography variant="h4">{data.totalOrders}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, backgroundColor: 'var(--card-background)' }}>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h4">${data.totalRevenue.toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, backgroundColor: 'var(--card-background)' }}>
            <Typography variant="h6">Average Order Value</Typography>
            <Typography variant="h4">${data.averageOrderValue.toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, backgroundColor: 'var(--card-background)' }}>
            <Typography variant="h6">New Customers</Typography>
            <Typography variant="h4">{data.newCustomers}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>Popular Items</Typography>
        <Suspense fallback={<CircularProgress />}>
          <LazyChart data={data.popularItems} />
        </Suspense>
      </Box>

      {/* Add more sections for other dashboard data */}
    </Box>
  );
};

export default Dashboard;
