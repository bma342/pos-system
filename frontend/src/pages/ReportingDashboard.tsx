import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchDashboardStats } from '../redux/slices/dashboardSlice';
import { CircularProgress, Grid, Paper, Typography, Button } from '@mui/material';
import DateRangePicker from '../components/DateRangePicker';

const LazyBarChart = lazy(() => import('../components/LazyBarChart'));
const LazyLineChart = lazy(() => import('../components/LazyLineChart'));

const ReportingDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stats, status, error } = useSelector((state: RootState) => state.reportingDashboard);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      dispatch(fetchDashboardStats(dateRange));
    }
  }, [dispatch, dateRange]);

  const handleDateRangeChange = (newDateRange: { startDate: Date | null; endDate: Date | null }) => {
    setDateRange(newDateRange as { startDate: null; endDate: null });
  };

  const handleRefresh = () => {
    if (dateRange.startDate && dateRange.endDate) {
      dispatch(fetchDashboardStats(dateRange));
    }
  };

  if (status === 'loading') return <CircularProgress />;
  if (status === 'failed') return <Typography color="error">{error}</Typography>;

  return (
    <div className="reporting-dashboard">
      <Typography variant="h4" gutterBottom>Reporting Dashboard</Typography>
      <DateRangePicker onChange={handleDateRangeChange} />
      <Button onClick={handleRefresh} variant="contained" color="primary">Refresh Data</Button>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '1rem' }}>
            <Typography variant="h6">Revenue</Typography>
            <Typography variant="h4">${stats.revenue.toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '1rem' }}>
            <Typography variant="h6">Orders</Typography>
            <Typography variant="h4">{stats.orders}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '1rem' }}>
            <Typography variant="h6">Average Order Value</Typography>
            <Typography variant="h4">${stats.averageOrderValue.toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '1rem' }}>
            <Typography variant="h6">Customers</Typography>
            <Typography variant="h4">{stats.customers}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '1rem' }}>
            <Typography variant="h6">Revenue Over Time</Typography>
            <Suspense fallback={<CircularProgress />}>
              <LazyLineChart data={stats.revenueOverTime} />
            </Suspense>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '1rem' }}>
            <Typography variant="h6">Top Selling Products</Typography>
            <Suspense fallback={<CircularProgress />}>
              <LazyBarChart data={stats.topSellingProducts} />
            </Suspense>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReportingDashboard;